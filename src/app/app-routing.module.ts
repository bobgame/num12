import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RouteName } from './common/enums/base.enum'
const routers: Routes = [
  {
    path: RouteName.dashboard,
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: RouteName.introduce,
    loadComponent: () => import('./pages/num-introduce/num-introduce.component').then((m) => m.NumIntroduceComponent),
  },
  {
    path: RouteName.history,
    loadComponent: () => import('./pages/num-history/num-history.component').then((m) => m.NumHistoryComponent),
  },
  {
    path: RouteName.world,
    loadComponent: () => import('./pages/num-world/num-world.component').then((m) => m.NumWorldComponent),
  },
  {
    path: RouteName.games,
    loadComponent: () => import('./pages/num-games/num-games.component').then((m) => m.NumGamesComponent),
  },
  {
    path: '',
    redirectTo: RouteName.dashboard,
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routers, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
