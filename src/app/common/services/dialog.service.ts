import { Injectable } from '@angular/core'
import { LazyDialogConfig, LazyDialogService } from 'ngx-lazy-dialog'
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
    private lazyDialogService: LazyDialogService,
  ) { }

  bottomIcons: BottomIcon[] = [
    {id: 1, nwIcon: 'settings', popup: 'settings'},
    {id: 2, nwIcon: 'language-sharp', popup: 'lang'},
    {id: 3, nwIcon: 'help', popup: 'about'},
  ]


  openDialog(popup: PopupItem) {
    switch (popup) {
      case 'settings':
        this.openSettingsDialog()
        break
      case 'lang':
        this.openLangDialog()
        break
      case 'about':
        this.openAboutDialog()
        break
      default:
        break
    }
    // this.g.toast(popup)
  }

  async openSettingsDialog() {
    const component = await import('../dialogs/settings/settings.component').then(m => m.SettingsComponent)
    const data = { message: '' }

    const config: LazyDialogConfig = {
      closeOnBackdropClick: true,
      closeButton: true,
      customClasses: 'my-custom-class',
    }

    const dialog = await this.lazyDialogService.create({component, data, config})
    dialog.onClose().then((output) => {
      console.log(output)
    })
  }

  async openLangDialog() {
    const component = await import('../dialogs/lang/lang.component').then(m => m.LangComponent)
    const data = { message: '' }

    const config: LazyDialogConfig = {
      closeOnBackdropClick: true,
      closeButton: true,
      customClasses: 'my-custom-class',
    }

    const dialog = await this.lazyDialogService.create({component, data, config})
    dialog.onClose().then((output) => {
      console.log(output)
    })
  }

  async openAboutDialog() {
    const component = await import('../dialogs/about/about.component').then(m => m.AboutComponent)
    const data = { message: '' }

    const config: LazyDialogConfig = {
      closeOnBackdropClick: true,
      closeButton: true,
      customClasses: 'my-custom-class',
    }

    const dialog = await this.lazyDialogService.create({component, data, config})
    dialog.onClose().then((output) => {
      console.log(output)
    })
  }
}
