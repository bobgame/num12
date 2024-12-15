import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import { enableProdMode } from '@angular/core'

// production console not print
if (environment.production) {
  window.console.log = () => {}
  window.console.error = () => {}
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))
