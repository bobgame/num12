import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LazyDialogRef } from 'ngx-lazy-dialog'
import { TranslateModule } from '@ngx-translate/core'
import { LanguageService } from '../../services/language.service'
interface LangItem {
  lang: string
  name: string
}
@Component({
    selector: 'nm-lang',
    imports: [CommonModule, TranslateModule],
    templateUrl: './lang.component.html',
    styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {
  public myData: {message: string} = {message: ''}
  constructor(
    private _dialogRef: LazyDialogRef,
    private languageService: LanguageService,
  ) {
  }

  public readonly langs: LangItem[] = [
    { lang: 'en', name: 'English' },
    { lang: 'zh-hans', name: '简体中文' },
    { lang: 'zh-hant', name: '繁體中文' },
  ]

  currentLang = this.langs[0]

  ngOnInit() {
    // getting data
    this.myData = this._dialogRef.data
    console.log(this.languageService.currentLanguage)

    this.currentLang = this.langs.find(langItem => langItem.lang === this.languageService.currentLanguage) || this.langs[0]
  }

  selectLanguage(langItem: LangItem) {
    this.currentLang = langItem
  }

  applyLanguage() {
    this.languageService.useLanguage(this.currentLang.lang)
  }

  close(data?: any) {
    // closing dialog
    this._dialogRef.close(data)
  }
}
