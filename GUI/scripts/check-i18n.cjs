const fs = require('fs');
const path = require('path');

const guiRoot = path.resolve(__dirname, '..');
const settings = JSON.parse(fs.readFileSync(path.resolve(guiRoot, '..', 'data', 'generated', 'settings_list.json'), 'utf8'));
const locale = JSON.parse(fs.readFileSync(path.resolve(guiRoot, 'src', 'assets', 'i18n', 'ja.json'), 'utf8'));

const failures = [];
const knownTabs = new Set();
const knownSections = new Set();
const knownSettings = new Map();
const optionText = value => typeof value === 'string' ? value : value?.text;

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

const untranslatedSettingTooltips = [...knownSettings.entries()]
  .filter(([, setting]) => setting.tooltip)
  .map(([key]) => key)
  .filter(key => !locale.settings[key]?.tooltip);
if (untranslatedSettingTooltips.length > 0) {
  failures.push(`Untranslated setting tooltips: ${untranslatedSettingTooltips.join(', ')}`);
}

const serializedLocale = JSON.stringify(locale);
for (const forbiddenTerm of ['苦痛の石', '振動石', 'Stone of Agony']) {
  if (serializedLocale.includes(forbiddenTerm)) {
    failures.push(`Non-canonical Stone of Agony translation remains: ${forbiddenTerm}`);
  }
}

const untranslatedNormalOptions = [];
for (const [settingKey, setting] of knownSettings) {
  if (settingKey.startsWith('sfx_')) {
    continue;
  }
  for (const option of setting.options || []) {
    if (!optionText(locale.settings[settingKey]?.options?.[String(option.name)])) {
      untranslatedNormalOptions.push(`${settingKey}.${String(option.name)}`);
    }
  }
}
if (untranslatedNormalOptions.length > 0) {
  failures.push(`Untranslated normal options: ${untranslatedNormalOptions.join(', ')}`);
}

if (serializedLocale.includes('英:')) {
  failures.push('Japanese locale contains inline English-reference labels (英:).');
}

for (const key of ['add', 'remove', 'all', 'none', 'selected']) {
  if (!locale.fixed[key]) failures.push(`Missing fixed UI translation: ${key}`);
}

for (const key of ['multiworld_section', 'preset_section']) {
  if (!locale.sectionSubheaders?.[key]) failures.push(`Missing section subheader translation: ${key}`);
}

const canonicalItemNames = {
  empty_dungeons_rewards: {
    'Kokiri Emerald': 'コキリのヒスイ',
    'Goron Ruby': 'ゴロンのルビー',
    'Zora Sapphire': 'ゾーラのサファイア',
    'Light Medallion': '光のメダル',
    'Forest Medallion': '森のメダル',
    'Fire Medallion': '炎のメダル',
    'Water Medallion': '水のメダル',
    'Shadow Medallion': '闇のメダル',
    'Spirit Medallion': '魂のメダル',
  },
  shuffle_child_trade: {
    'Weird Egg': 'ふしぎなタマゴ',
    Chicken: 'ニワトリ',
    'Zeldas Letter': 'ゼルダの手紙',
    'Keaton Mask': 'キータンのお面',
    'Skull Mask': 'ドクロのお面',
    'Spooky Mask': 'こわそなお面',
    'Bunny Hood': 'ウサギずきん',
    'Goron Mask': 'ゴロンのお面',
    'Zora Mask': 'ゾーラのお面',
    'Gerudo Mask': 'ゲルドのお面',
    'Mask of Truth': 'まことのお面',
  },
  adult_trade_start: {
    'Pocket Egg': 'ポケットタマゴ',
    'Pocket Cucco': 'ポケットコッコ',
    Cojiro: 'コジロー',
    'Odd Mushroom': 'あやしいキノコ',
    'Odd Potion': 'あやしいクスリ',
    'Poachers Saw': '密猟者のノコギリ',
    'Broken Sword': '折れたゴロン刀',
    Prescription: '処方せん',
    'Eyeball Frog': 'メダマガエル',
    Eyedrops: '特製本生目薬',
    'Claim Check': '引換券',
  },
};
for (const [settingKey, expectedOptions] of Object.entries(canonicalItemNames)) {
  for (const [optionKey, expected] of Object.entries(expectedOptions)) {
    const actual = optionText(locale.settings[settingKey]?.options?.[optionKey]);
    if (actual !== expected) {
      failures.push(`Non-canonical item name: ${settingKey}.${optionKey} = ${actual}; expected ${expected}`);
    }
  }
}

const logicTranslations = ['allowed_tricks', 'advanced_allowed_tricks']
  .flatMap(key => Object.entries(locale.settings[key]?.options || {}))
  .map(([key, value]) => [key, optionText(value)]);
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

for (const settingKey of ['allowed_tricks', 'advanced_allowed_tricks']) {
  const setting = knownSettings.get(settingKey);
  for (const option of setting.options || []) {
    const translation = locale.settings[settingKey]?.options?.[String(option.name)];
    if (option.tooltip && (typeof translation === 'string' || !translation?.tooltip)) {
      failures.push(`Missing logic tooltip translation: ${settingKey}.${String(option.name)}`);
    }
    if (typeof translation !== 'string' && translation?.tooltip) {
      let tooltip = translation.tooltip.replace(/<[^>]+>/g, ' ').replace(/https?:\/\/\S+/g, '');
      for (const term of ['ISG', 'WESS', 'HESS', 'GDV', 'OI', 'MQ', 'Odie', 'OHKO', 'QPA', 'GGJ', 'TSC', 'WotH', 'HP', 'N64']) {
        tooltip = tooltip.split(term).join('');
      }
      if (/[A-Za-z]{2,}/.test(tooltip)) {
        failures.push(`English remains in logic tooltip: ${settingKey}.${String(option.name)} = ${translation.tooltip}`);
      }
      for (const tag of translation.tags || []) {
        const normalizedTag = tag.replace(/QPA|ISG|HESS|GDV|OI/g, '');
        if (/[A-Za-z]{2,}/.test(normalizedTag)) {
          failures.push(`English remains in logic tag: ${settingKey}.${String(option.name)} = ${tag}`);
        }
      }
    }
  }
}

const locationTranslations = locale.settings.disabled_locations?.options || {};
for (const option of knownSettings.get('disabled_locations')?.options || []) {
  const translation = locationTranslations[String(option.name)];
  if (typeof translation === 'string' || !translation?.text) {
    failures.push(`Missing location translation: disabled_locations.${String(option.name)}`);
    continue;
  }
  if (/[A-Za-z]{2,}/.test(translation.text)) {
    failures.push(`English remains in location translation: ${String(option.name)} = ${translation.text}`);
  }
  if ((option.tags || []).length !== (translation.tags || []).length) {
    failures.push(`Missing location tags: disabled_locations.${String(option.name)}`);
  }
  for (const tag of translation.tags || []) {
    if (/[A-Za-z]{2,}/.test(tag.replace(/QPA/g, ''))) {
      failures.push(`English remains in location tag: disabled_locations.${String(option.name)} = ${tag}`);
    }
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
    translatedLocations: Object.keys(locationTranslations).length,
    translatedLogicTooltips: ['allowed_tricks', 'advanced_allowed_tricks']
      .flatMap(key => Object.values(locale.settings[key]?.options || {}))
      .filter(value => typeof value !== 'string' && value.tooltip).length,
    fallbackPolicy: 'English source data for SFX preview names only',
  }, null, 2));
}
