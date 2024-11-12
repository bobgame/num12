import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PageName } from './common/enums/base.enum'
const routers: Routes = [
  {
    path: PageName.home,
    loadComponent: () => import('./home/home.page').then((m) => m.HomeComponent),
  },
  {
    path: PageName.slider,
    loadComponent: () => import('./games/slider/slider.component').then((m) => m.SliderComponent),
  },
  {
    path: PageName.nPuzzle,
    loadComponent: () => import('./games/n-puzzle/n-puzzle.component').then((m) => m.NPuzzleComponent),
  },
  {
    path: PageName.n2048,
    loadComponent: () => import('./games/n-2048/n-2048.component').then((m) => m.N2048Component),
  },
  {
    path: PageName.numGuess,
    loadComponent: () => import('./games/num-guess/num-guess.component').then((m) => m.NumGuessComponent),
  },
  {
    path: PageName.sudoku,
    loadComponent: () => import('./games/sudoku/sudoku.component').then((m) => m.SudokuComponent),
  },
  {
    path: PageName.about,
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '',
    redirectTo: PageName.home,
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routers, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
