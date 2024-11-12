import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule } from '@angular/core'
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule} from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import * as Hammer from 'hammerjs'

import { TranslateModule, TranslateLoader } from '@ngx-translate/core'

import { AppRoutingModule } from './app-routing.module'
import { LazyDialogModule } from 'ngx-lazy-dialog'
import { AppComponent } from './app.component'
import { provideHotToastConfig } from '@ngneat/hot-toast'
import { NgCircleProgressModule } from 'ng-circle-progress'
import { StarComponent } from './common/pop/star/star.component'
import { KnowledgeComponent } from './knowledge/knowledge.component'
import { HttpLoaderFactory } from './common/modules/translation.module'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgToggleModule } from 'ng-toggle-button'
import { ngToggleConfig } from './app.config'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

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
    StarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
    LazyDialogModule.forRoot({
      closeOnBackdropClick: false,
      closeButton: true,
    }),
    KnowledgeComponent,
  ],
  exports: [NgCircleProgressModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHotToastConfig(), // @ngneat/hot-toast providers
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
