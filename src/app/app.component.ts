import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GlobalService } from './common/services/global.service';
import { LanguageService } from './common/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { PageName } from './common/enums/base.enum';

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
  selector: 'nm-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    public g: GlobalService,
    public languageService: LanguageService,
    private translate: TranslateService
  ) {
    // this.languageService.useLanguage('zh-hans')
    // console.log(this.translate.currentLang)
    // console.log('AppComponent constructor')
  }
  PageName = PageName;
  environment = this.g.environment;

  isHP = false;
  isWeb = this.environment.deploy === 'web';

  ngOnInit() {
    this.setScreenStyle();
    window.onresize = () => {
      this.setScreenStyle();
    };
  }

  ngAfterViewInit() {
    setTimeout(() => {
      document.getElementById('start-loading-container')?.remove();
      // if (this.environment.production) {
      //   try {
      //     fetch('http://gamenumjgkesjakfg.num12.com/numdb/upv')
      //   } catch (error) {
      //     console.log('fetch init error')
      //   }
      // }
    }, 0);
  }

  setScreenStyle() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    this.isWeb = viewportWidth / viewportHeight > 0.7;

    if (viewportWidth > viewportHeight) {
      this.isHP = true;
      this.g.show.isHP = true;
    } else {
      this.isHP = false;
      this.g.show.isHP = false;
    }
  }
}
