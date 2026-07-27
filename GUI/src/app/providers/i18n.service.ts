import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type SupportedLanguage = 'en' | 'ja';

interface SettingTranslation {
  text?: string;
  tooltip?: string;
  options?: { [key: string]: string };
}

interface LocaleResource {
  locale: SupportedLanguage;
  name: string;
  tabs: { [key: string]: string };
  sections: { [key: string]: string };
  sectionSubheaders: { [key: string]: string };
  settings: { [key: string]: SettingTranslation };
  fixed: { [key: string]: string };
}

interface OriginalText {
  text?: string;
  tooltip?: string;
  subheader?: string;
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly languageChanged = new EventEmitter<SupportedLanguage>();
  readonly supportedLanguages: Array<{ value: SupportedLanguage; label: string }> = [
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' },
  ];

  private readonly originalText = new WeakMap<object, OriginalText>();
  private readonly resources = new Map<SupportedLanguage, LocaleResource>();
  private loading: Promise<void> | null = null;

  currentLanguage: SupportedLanguage = this.detectInitialLanguage();

  constructor(private http: HttpClient) {
    document.documentElement.lang = this.currentLanguage;
  }

  async ensureLoaded(): Promise<void> {
    if (this.resources.has(this.currentLanguage)) {
      return;
    }
    if (!this.loading) {
      this.loading = this.http
        .get<LocaleResource>(`assets/i18n/${this.currentLanguage}.json`)
        .toPromise()
        .then(resource => {
          if (resource) {
            this.resources.set(this.currentLanguage, resource);
          }
        })
        .finally(() => {
          this.loading = null;
        });
    }
    await this.loading;
  }

  async setLanguage(language: SupportedLanguage): Promise<void> {
    if (!this.supportedLanguages.some(item => item.value === language)) {
      language = 'en';
    }
    this.currentLanguage = language;
    document.documentElement.lang = language;
    try {
      localStorage.setItem('ootrGuiLanguage', language);
    } catch {
      // Local storage may be unavailable in hardened browser environments.
    }
    await this.ensureLoaded();
    this.languageChanged.emit(language);
  }

  fixed(key: string, englishFallback: string = key): string {
    return this.resources.get(this.currentLanguage)?.fixed?.[key] ?? englishFallback;
  }

  applyToSettingsDocument(documentData: any): void {
    if (!documentData || typeof documentData !== 'object') {
      return;
    }

    const resource = this.resources.get(this.currentLanguage);
    for (const [tabId, tab] of this.entries(documentData)) {
      if (!tab || typeof tab !== 'object') {
        continue;
      }
      this.restore(tab);
      const stableTabId = tab.name ?? tabId;
      if (resource?.tabs?.[stableTabId] !== undefined) {
        tab.text = resource.tabs[stableTabId];
      }

      for (const [sectionId, section] of this.entries(tab.sections)) {
        if (!section || typeof section !== 'object') {
          continue;
        }
        this.restore(section);
        const stableSectionId = section.name ?? sectionId;
        if (resource?.sections?.[stableSectionId] !== undefined) {
          section.text = resource.sections[stableSectionId];
        }
        if (resource?.sectionSubheaders?.[stableSectionId] !== undefined) {
          section.subheader = resource.sectionSubheaders[stableSectionId];
        }

        for (const [settingId, setting] of this.entries(section.settings)) {
          if (!setting || typeof setting !== 'object') {
            continue;
          }
          this.restore(setting);
          const stableSettingId = setting.name ?? settingId;
          const translation = resource?.settings?.[stableSettingId];
          if (translation?.text !== undefined) {
            setting.text = translation.text;
          }
          if (translation?.tooltip !== undefined) {
            setting.tooltip = translation.tooltip;
          }

          for (const [optionId, option] of this.entries(setting.options)) {
            if (!option || typeof option !== 'object') {
              continue;
            }
            this.restore(option);
            const stableOptionId = String(option.name ?? optionId);
            if (translation?.options?.[stableOptionId] !== undefined) {
              option.text = translation.options[stableOptionId];
            }
          }
        }
      }
    }
  }

  private entries(value: any): Array<[string, any]> {
    if (Array.isArray(value)) {
      return value.map((item, index) => [String(index), item]);
    }
    if (value && typeof value === 'object') {
      return Object.entries(value);
    }
    return [];
  }

  private restore(value: any): void {
    let original = this.originalText.get(value);
    if (!original) {
      original = {};
      if (typeof value.text === 'string') {
        original.text = value.text;
      }
      if (typeof value.tooltip === 'string') {
        original.tooltip = value.tooltip;
      }
      if (typeof value.subheader === 'string') {
        original.subheader = value.subheader;
      }
      this.originalText.set(value, original);
    }
    if (original.text !== undefined) {
      value.text = original.text;
    }
    if (original.tooltip !== undefined) {
      value.tooltip = original.tooltip;
    }
    if (original.subheader !== undefined) {
      value.subheader = original.subheader;
    }
  }

  private detectInitialLanguage(): SupportedLanguage {
    try {
      const saved = localStorage.getItem('ootrGuiLanguage');
      if (saved === 'en' || saved === 'ja') {
        return saved;
      }
    } catch {
      // Fall through to OS/browser language detection.
    }
    return navigator.language?.toLowerCase().startsWith('ja') ? 'ja' : 'en';
  }
}
