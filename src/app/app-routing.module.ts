import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RouteName } from './common/enums/base.enum'
const routers: Routes = [
  {
    path: RouteName.dashboard,
    loadComponent: () => import('./knowledge/knowledge.component').then((m) => m.KnowledgeComponent),
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
