import { Injectable } from '@angular/core'
import { GlobalService } from './global.service'
type PopupItem = 'settings' | 'favorite' | 'about' | 'lang'
interface BottomIcon {
  id: number
  nwIcon: string
  popup: PopupItem
}
@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(
    private g: GlobalService,
  ) { }

  bottomIcons: BottomIcon[] = [
    {id: 1, nwIcon: 'settings', popup: 'settings'},
    {id: 2, nwIcon: 'language-sharp', popup: 'lang'},
    {id: 3, nwIcon: 'help', popup: 'about'},
  ]


  openDialog(popup: PopupItem) {
    switch (popup) {
      case 'settings':
        this.g.show.pop.settings = true
        break
      case 'lang':
        this.g.show.pop.lang = true
        break
      case 'about':
        this.g.show.pop.about = true
        break
      default:
        break
    }
  }

  openInAppDialog(popup: PopupItem) {
    switch (popup) {
      case 'settings':
        this.g.show.pop.settingsInApp = true
        break
      case 'lang':
        this.g.show.pop.langInApp = true
        break
      case 'about':
        this.g.show.pop.aboutInApp = true
        break
      default:
        break
    }
  }

}
