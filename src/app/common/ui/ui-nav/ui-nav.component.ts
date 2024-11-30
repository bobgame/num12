import { Component, OnInit } from '@angular/core'
import { clone } from 'lodash-es'
import { NavNum } from 'src/app/knowledge/knowledge.enum'
import { GlobalService } from '../../services/global.service'
import { TranslateModule } from '@ngx-translate/core'
import { CommonModule } from '@angular/common'
import { RouteName } from '../../enums/base.enum'
import { NavItem } from '../../interfaces/base.interface'
import { Router } from '@angular/router'
import { DialogService } from '../../services/dialog.service'

@Component({
    selector: 'nm-ui-nav',
    imports: [CommonModule, TranslateModule],
    templateUrl: './ui-nav.component.html',
    styleUrl: './ui-nav.component.scss'
})
export class UiNavComponent implements OnInit {
  constructor(
    public g: GlobalService,
    public dialogService: DialogService,
    private router: Router,
  ) { }
  NavNum = NavNum
  navItems: NavItem[] = [
    { name: 'k.nav.dashboard', nav: RouteName.dashboard, routerLink: '/dashboard' },
    { name: 'k.nav.introduce', nav: RouteName.introduce, routerLink: '/introduce' },
    { name: 'k.nav.history', nav: RouteName.history, routerLink: '/history' },
    { name: 'k.nav.world', nav: RouteName.world, routerLink: '/world' },
    { name: 'k.nav.games', nav: RouteName.games, routerLink: '/games' },
  ]

  currentNav = clone(this.navItems[1])

  ngOnInit() {
    if (!this.g.show.onlyWeb) {
      // this.navItems.push({ name: 'k.nav.games', nav: RouteName.games })

      this.currentNav = clone(this.navItems[0])
    }
  }

  switchNav(navItem: NavItem) {
    this.currentNav = clone(navItem)
    this.router.navigate([navItem.routerLink])
  }

}
