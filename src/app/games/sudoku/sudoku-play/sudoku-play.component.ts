import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiHeaderComponent } from 'src/app/common/ui/ui-header/ui-header.component'
import { SudokuService } from '../sudoku.service'
import { SudoPageEnum } from '../enum/sudoku-page.enum'
import { SudoCell } from '../sudoku'
import { SudokuNumberComponent } from './sudoku-number/sudoku-number.component'
import { GlobalService } from 'src/app/common/services/global.service'
import { TranslateModule } from '@ngx-translate/core'
import { UiStatusBarComponent } from 'src/app/common/ui/ui-status-bar/ui-status-bar.component'

@Component({
  selector: 'nm-sudoku-play',
  templateUrl: './sudoku-play.component.html',
  styleUrls: ['./sudoku-play.component.scss'],
  imports: [CommonModule, TranslateModule, UiHeaderComponent, UiStatusBarComponent, SudokuNumberComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SudokuPlayComponent implements OnInit, OnDestroy {
  constructor(
    public g: GlobalService,
    public sudokuService: SudokuService,
  ) { }

  SudoPageEnum = SudoPageEnum
  numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  cellArr: SudoCell[] = []

  playBtnStatus = false
  goPageStatus = true
  continueButton = false
  toolsButtonShow = 1
  isShowMore = false


  ngOnInit() {
    this.initNumbers()
    this.initSudo()
    this.sudokuService.startShowTime()
  }
  ngOnDestroy() {
    this.sudokuService.pauseShowTime()
  }

  initNumbers() {
    this.cellArr = []
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        const num = i * 10 + j
        const cell: SudoCell = {
          number: num,
          bottomSmall: i % 3 !== 0,
          bottomMiddle: i % 3 === 0 && i !== 9,
          rightSmall: j % 3 !== 0,
          rightMiddle: j % 3 === 0 && j !== 9,
        }
        this.cellArr.push(cell)
      }
    }
  }

  showMore() {
    this.isShowMore = true
  }

  hideMore() {
    this.isShowMore = false
  }

  initSudo() {
    this.sudokuService.InitSudo().then(() => {
      if (this.sudokuService.sudokuShowData.sudoReady) { this.continueButton = true }
      console.log(this.sudokuService.sudokuData)
    })
  }

  continueSudo() {
    this.goPageStatus = false
    this.startShowTime()
  }

  createNewGame(index: number) {
    this.goPageStatus = false
    this.sudokuService.createNewGame(index)
    const continueButtonSetTimeout = setTimeout(() => {
      this.continueButton = true
      clearTimeout(continueButtonSetTimeout)
    }, 1000)
  }

  outPageButtonClicked() {
    this.pauseShowTime()
    const goPageStatusSetTimeout = setTimeout(() => {
      this.goPageStatus = true
      clearTimeout(goPageStatusSetTimeout)
    }, 300)
  }

  toolsButtonShowSwitch() {
    if (this.toolsButtonShow < 2) {
      this.toolsButtonShow++
    } else {
      this.toolsButtonShow = 1
    }
  }

  newGame(): void {
    this.sudokuService.newGame()
  }

  nextLevelGame(): void {
    this.sudokuService.createNewGame(this.sudokuService.sudokuData.nowMode)
  }

  setThisEditBoardStatus() {
    return this.sudokuService.setThisEditBoardStatus()
  }

  clearPlayNumber(): void {
    this.sudokuService.clearPlayNumber()
  }

  clickPlayNumber(num: number): void {
    this.sudokuService.clickPlayNumber(num)
  }


  clickPlayOrPauseBtn() {
    this.sudokuService.pauseShowTime()
    this.sudokuService.sudokuShowData.pop.pause = true
  }

  startShowTime() {
    this.sudokuService.startShowTime()
  }

  pauseShowTime() {
    this.sudokuService.pauseShowTime()
  }

  gotoPage(pageName: string) {
    this.sudokuService.sudokuShowData.page = pageName
  }
}
