const fs = require('fs');
const path = require('path');

const guiRoot = path.resolve(__dirname, '..');
const settings = JSON.parse(fs.readFileSync(path.resolve(guiRoot, '..', 'data', 'generated', 'settings_list.json'), 'utf8'));
const locale = JSON.parse(fs.readFileSync(path.resolve(guiRoot, 'src', 'assets', 'i18n', 'ja.json'), 'utf8'));

const failures = [];
const knownTabs = new Set();
const knownSections = new Set();
const knownSettings = new Map();

for (const tab of settings.settingsArray) {
  knownTabs.add(tab.name);
  for (const section of tab.sections || []) {
    knownSections.add(section.name);
    for (const setting of section.settings || []) {
      knownSettings.set(setting.name, setting);
    }
  }
}

for (const key of Object.keys(locale.tabs)) {
  if (!knownTabs.has(key)) failures.push(`Unknown tab key: ${key}`);
}
for (const key of Object.keys(locale.sections)) {
  if (!knownSections.has(key)) failures.push(`Unknown section key: ${key}`);
}
for (const [settingKey, translation] of Object.entries(locale.settings)) {
  const setting = knownSettings.get(settingKey);
  if (!setting) {
    failures.push(`Unknown setting key: ${settingKey}`);
    continue;
  }
  const knownOptions = new Set((setting.options || []).map(option => String(option.name)));
  for (const optionKey of Object.keys(translation.options || {})) {
    if (!knownOptions.has(optionKey)) {
      failures.push(`Unknown option key: ${settingKey}.${optionKey}`);
    }
  }
}

const untranslatedSettings = [...knownSettings.keys()].filter(key => !locale.settings[key]?.text);
if (untranslatedSettings.length > 0) {
  failures.push(`Untranslated settings: ${untranslatedSettings.join(', ')}`);
}

const untranslatedSections = [...knownSections].filter(key => {
  const section = settings.settingsArray
    .flatMap(tab => tab.sections || [])
    .find(candidate => candidate.name === key);
  return section?.text && !locale.sections[key];
});
if (untranslatedSections.length > 0) {
  failures.push(`Untranslated sections: ${untranslatedSections.join(', ')}`);
}

const untranslatedNormalOptions = [];
for (const [settingKey, setting] of knownSettings) {
  if (settingKey === 'disabled_locations' || settingKey.startsWith('sfx_')) {
    continue;
  }
  for (const option of setting.options || []) {
    if (!locale.settings[settingKey]?.options?.[String(option.name)]) {
      untranslatedNormalOptions.push(`${settingKey}.${String(option.name)}`);
    }
  }
}
if (untranslatedNormalOptions.length > 0) {
  failures.push(`Untranslated normal options: ${untranslatedNormalOptions.join(', ')}`);
}

if (JSON.stringify(locale).includes('英:')) {
  failures.push('Japanese locale contains inline English-reference labels (英:).');
}

for (const key of ['add', 'remove', 'all', 'none', 'selected']) {
  if (!locale.fixed[key]) failures.push(`Missing fixed UI translation: ${key}`);
}

for (const key of ['multiworld_section', 'preset_section']) {
  if (!locale.sectionSubheaders?.[key]) failures.push(`Missing section subheader translation: ${key}`);
}

const logicTranslations = ['allowed_tricks', 'advanced_allowed_tricks']
  .flatMap(key => Object.entries(locale.settings[key]?.options || {}));
const forbiddenLogicFragments = ['ボムチュウウ', '御堂', 'ロストウッズ', ' with ', ' without ', 'PoH', '何もない大人', 'の子として', 'なし・'];
for (const [key, value] of logicTranslations) {
  for (const fragment of forbiddenLogicFragments) {
    if (value.includes(fragment)) failures.push(`Unnatural logic translation (${fragment}): ${key} = ${value}`);
  }
  let withoutAcceptedTerms = value;
  for (const term of ['ISG', 'WESS', 'HESS', 'GDV', 'OI', 'MQ', 'Odie']) {
    withoutAcceptedTerms = withoutAcceptedTerms.split(term).join('');
  }
  if (/[A-Za-z]{3,}/.test(withoutAcceptedTerms)) {
    failures.push(`English remains in logic translation: ${key} = ${value}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(failure);
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({
    tabs: knownTabs.size,
    sections: knownSections.size,
    settings: knownSettings.size,
    translatedOptions: Object.values(locale.settings)
      .reduce((total, setting) => total + Object.keys(setting.options || {}).length, 0),
    fallbackPolicy: 'English source data',
  }, null, 2));
}
