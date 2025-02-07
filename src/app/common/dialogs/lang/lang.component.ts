import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { UiDialogComponent } from '../ui-dialog.component';
import { GlobalService } from '../../services/global.service';
interface LangItem {
  lang: string;
  name: string;
}
@Component({
  selector: 'nm-lang',
  imports: [CommonModule, TranslateModule, UiDialogComponent],
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss'],
})
export class LangComponent implements OnInit {
  public myData: { message: string } = { message: '' };
  constructor(
    private g: GlobalService,
    private languageService: LanguageService
  ) {}

  public readonly langs: LangItem[] = [
    { lang: 'en', name: 'English' },
    { lang: 'zh-hans', name: '简体中文' },
    { lang: 'zh-hant', name: '繁體中文' },
  ];

  currentLang = this.langs[0];

  ngOnInit() {
    console.log(this.languageService.currentLanguage);

    this.currentLang =
      this.langs.find(
        (langItem) => langItem.lang === this.languageService.currentLanguage
      ) || this.langs[0];
  }

  selectLanguage(langItem: LangItem) {
    this.currentLang = langItem;
  }

  applyLanguage() {
    this.languageService.useLanguage(this.currentLang.lang);
    this.languageService.saveLanguage(this.currentLang.lang);
    this.close();
  }

  close() {
    this.g.show.pop.lang = false;
    this.g.show.pop.langInApp = false;
  }
}
