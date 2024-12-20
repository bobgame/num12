import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule } from '@angular/core'
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import * as Hammer from 'hammerjs'

import { TranslateModule, TranslateLoader } from '@ngx-translate/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgCircleProgressModule } from 'ng-circle-progress'
import { CupComponent } from './common/pop/cup/cup.component'
import { HttpLoaderFactory } from './common/modules/translation.module'
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { NgToggleModule } from 'ng-toggle-button'
import { ngToggleConfig } from './app.config'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { N2048Component } from './games/n-2048/n-2048.component'
import { NPuzzleComponent } from './games/n-puzzle/n-puzzle.component'
import { NumGuessComponent } from './games/num-guess/num-guess.component'
import { SliderComponent } from './games/slider/slider.component'
import { SudokuComponent } from './games/sudoku/sudoku.component'
import { HomeComponent } from './games/home/home.page'
import { UiNavComponent } from './common/ui/ui-nav/ui-nav.component'
import { LoadingComponent } from './games/loading/loading.component'
import { LangComponent } from './common/dialogs/lang/lang.component'
import { AboutComponent } from './common/dialogs/about/about.component'
import { SettingsComponent } from './common/dialogs/settings/settings.component'

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
    pan: { direction: Hammer.DIRECTION_ALL },
  }
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  exports: [
    NgCircleProgressModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HammerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    NgToggleModule.forRoot(ngToggleConfig),
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot(),
    SliderComponent,
    NPuzzleComponent,
    N2048Component,
    NumGuessComponent,
    SudokuComponent,
    AboutComponent,
    SettingsComponent,
    LangComponent,
    HomeComponent,
    LoadingComponent,
    UiNavComponent,
    CupComponent,
    LangComponent,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule { }
