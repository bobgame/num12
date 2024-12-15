import { SudoPageEnum } from './enum/sudoku-page.enum'
import { SudokuShowData } from './sudoku'

export const SUDOKU_SHOW_DATA: SudokuShowData = {
  page: SudoPageEnum.Home,
  gameOverText: '',
  pop: {
    gameover: false,
    hardChoose: false,
    pause: false,
  },
  isHomeToPlay: false,
  isEdit: false,
  sudoReady: false,
  playNumber: 0,
  showTime: '00:00',
  pauseTime: false,
  nowGameWin: false,
  winCup: 0,
}
