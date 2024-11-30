import { GameName, PageName, RouteName } from '../enums/base.enum'

export interface GameListItem {
  id: number,
  name: GameName,
  pageName: PageName,
  star?: number,
}

export interface GameData {
  allStar: number,
  gameList: GameListItem[],
  gameHistory: {
    slider: {
      numCounts: {num: number, count: number}[],
    }
  }
}

export interface GameShow {
  pageName: PageName,
  isHP: boolean,
  onlyWeb: boolean,
  pop: {
    star: boolean,
    loading: boolean,
    [key: string]: boolean,
  }
}

export interface NavItem {
  name: string
  nav: RouteName
  routerLink: string
}