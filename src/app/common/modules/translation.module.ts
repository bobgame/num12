import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  exports: [TranslateModule, TranslatePipe],
})
export class TranslationModule {
  static forChild(): ModuleWithProviders<TranslationModule> {
    return {
      ngModule: TranslationModule,
    };
  }
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
