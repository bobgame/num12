import { GameName, PageName, RouteName } from '../enums/base.enum'

export interface GameListItem {
  id: number,
  name: GameName,
  pageName: PageName,
  cup: number,
  highScore: number,
}

export interface GameData {
  allCup: number,
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
    cup: boolean,
    loading: boolean,
    settings: boolean,
    lang: boolean,
    about: boolean,
    settingsInApp: boolean,
    langInApp: boolean,
    aboutInApp: boolean,
    [key: string]: boolean,
  }
}

export interface NavItem {
  name: string
  nav: RouteName
  routerLink: string
}