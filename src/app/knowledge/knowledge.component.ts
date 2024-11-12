import { Component, OnInit } from '@angular/core'
import { NavNum } from './knowledge.enum'
import { KnowledgeNavItem } from './knowledge'
import { CommonModule } from '@angular/common'
import { KgHomeComponent } from './kg-home/kg-home.component'
import { GlobalService } from '../common/services/global.service'
import { clone } from 'lodash-es'
import { KgSingleNumComponent } from './kg-single-num/kg-single-num.component'
import { KgNumGamesComponent } from './kg-num-games/kg-num-games.component'
import { TranslateModule } from '@ngx-translate/core'
import { LazyDialogConfig, LazyDialogService } from 'ngx-lazy-dialog'

type PopupItem = 'settings' | 'favorite' | 'about' | 'lang'
interface BottomIcon {
  id: number
  nwIcon: string
  popup: PopupItem
}

@Component({
  selector: 'nm-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
  standalone: true,
  imports: [CommonModule, KgHomeComponent, KgSingleNumComponent, KgNumGamesComponent, TranslateModule],
})
export class KnowledgeComponent implements OnInit {
  constructor(
    public g: GlobalService,
    public lazyDialogService: LazyDialogService,
  ) { }
  NavNum = NavNum
  navItems: KnowledgeNavItem[] = [
    { name: 'k.nav.introduce', nav: NavNum.Introduce },
    { name: 'k.nav.singleNum', nav: NavNum.SingleNum },
  ]

  currentNav = clone(this.navItems[1])


  bottomIcons: BottomIcon[] = [
    {id: 1, nwIcon: 'settings', popup: 'settings'},
    {id: 2, nwIcon: 'language-sharp', popup: 'lang'},
    {id: 3, nwIcon: 'help', popup: 'about'},
  ]

  ngOnInit() {
    if (!this.g.show.onlyWeb) {
      this.navItems.push({ name: 'k.nav.numGames', nav: NavNum.NumGames })

      this.currentNav = clone(this.navItems[2])
    }
  }

  switchNav(navItem: KnowledgeNavItem) {
    this.currentNav = clone(navItem)
  }

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
    const component = await import('../common/dialogs/settings/settings.component').then(m => m.SettingsComponent)
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
    const component = await import('../common/dialogs/lang/lang.component').then(m => m.LangComponent)
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
    const component = await import('../common/dialogs/about/about.component').then(m => m.AboutComponent)
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
