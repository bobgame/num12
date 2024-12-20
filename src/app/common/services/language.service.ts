import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public isLanguageLoaded = false
  private readonly defaultLanguage = 'en'
  private readonly supportedLanguages: Array<string> = [
    'en',
    'zh-hans',
    'zh-hant',
  ]
  currentLanguage = this.defaultLanguage
  shortLanguage = this.defaultLanguage.split('-')[0]

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(this.supportedLanguages)
    this.useLanguage(this.defaultLanguage)
  }

  getBrowserLanguage(): string {
    const browserLang = this.translate.getBrowserLang()
    return browserLang && this.supportedLanguages.includes(browserLang) ? browserLang : this.defaultLanguage
  }

  setDefaultLanguage() {
    const browserLang = this.getBrowserLanguage()
    this.useLanguage(browserLang)
  }

  useLanguage(lang: string) {
    // this.translate.setDefaultLang(this.defaultLanguage)
    // this.isLanguageLoaded = true
    this.translate.use(lang)
      .subscribe(() => {
        // console.log(111)
        this.currentLanguage = lang
        this.shortLanguage = lang.split('-')[0]
      })
  }

  isLanSupported(lang: string): boolean {
    if (lang) {
      return this.supportedLanguages.includes(lang.toLowerCase())
    }
    return false
  }
}
