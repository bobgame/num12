import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { RouteName } from 'src/app/common/enums/base.enum'

interface DashboardItem {
    title: string
    route: RouteName
}
@Component({
  selector: 'nm-dashboard',
  imports: [CommonModule, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  dashboardList: DashboardItem[] = [
    { title: 'k.nav.introduce', route: RouteName.introduce },
    { title: 'k.nav.history', route: RouteName.history },
    // { title: 'k.nav.world', route: RouteName.world },
    { title: 'k.nav.games', route: RouteName.games },
  ]

  constructor(
    private router: Router,
  ) {}

  go(route: RouteName) {
    this.router.navigate([route])
  }

}
