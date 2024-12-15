export class SudokuShowData {
  /** home play help settings */
  page: string
  gameOverText: string
  pop: {
    gameover: boolean
    hardChoose: boolean
    pause: boolean
  }
  isHomeToPlay: boolean
  isEdit: boolean
  sudoReady: boolean
  playNumber: number
  showTime: string
  pauseTime: boolean
  nowGameWin: boolean
  winCup: number
}
export class SudoCell {
  number: number
  rightSmall: boolean
  rightMiddle: boolean
  bottomSmall: boolean
  bottomMiddle: boolean
}
export class SudoItem {
  id: number
  isBlank: boolean
  isEdit: boolean
  isTip: boolean
  editBoard: boolean[]
  backupNum: number
  playNum: number
  isError: boolean
}
export class SudokuData {
  sudo: SudoItem[]
  sudoArr: number[]
  continue: boolean
  blankArr: number[]
  blankEditBoard: boolean[][]
  sudoPlayArr: number[]
  errorArr: number[]
  nowHardModeName: string
  time: number
  cup: number
  nowMode: number
  nowLv: number
  mode: number[]
  allCups: AllCup[]
}
export class AllCup {
  mode: number
  cupNum: number
  totalTime: number
  levelCups: LevelCup[]
}
export class LevelCup {
  lv: number
  cupNum: number
  isActive?: boolean
  isHideCup?: boolean
}
export class HardAndCup {
  modeName: string
  lvText: string
  cupNum: number
  totalTime: string
}
