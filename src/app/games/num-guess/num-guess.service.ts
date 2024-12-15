import { Injectable } from '@angular/core'
import { clone, sample } from 'src/app/units/Base'
import { NumGuessData } from './num-guess'
import { GlobalService } from 'src/app/common/services/global.service'

@Injectable(
  { providedIn: 'root' },
)

export class NumGuessService {
  constructor(private g: GlobalService) {
    console.log('SliderService constructor')
  }

  numBase = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  gameResult = {
    isOver: false,
    isWin: false,
    cup: 0,
    steps: 0,
    htmlMessage: '',
  }

  numGuessDataBase: NumGuessData = {
    steps: 0,
    cup: 0,
    count: 0,
    histories: [],
    a0b0: [],
    length: 4,
    result: [0, 1, 2, 3],
  }

  numGuessData = clone(this.numGuessDataBase)

  newGame() {
    this.numGuessData = clone(this.numGuessDataBase)
    this.numGuessData.result = []
    let numBaseCopy = clone(this.numBase)
    for (let i = 0; i < this.numGuessData.length; i++) {
      const num = sample(numBaseCopy)
      this.numGuessData.result.push(num)
      // delete num from numBaseCopy
      numBaseCopy = numBaseCopy.filter((n) => n !== num)
    }
    console.log('this.numGuessData.result', this.numGuessData.result)

  }

  submit(guess: number[]) {
    this.numGuessData.steps++
    let a = 0
    let b = 0
    for (let i = 0; i < this.numGuessData.length; i++) {
      if (guess[i] === this.numGuessData.result[i]) {
        a++
      } else if (this.numGuessData.result.includes(guess[i])) {
        b++
      }
    }
    this.numGuessData.histories.push({
      guess: guess.join(''),
      a: a,
      b: b,
    })
    if (a === 0 && b === 0) {
      this.numGuessData.a0b0.push(...guess)
    }
    if (this.numGuessData.steps < this.numGuessData.length * 1.3) {
      this.numGuessData.cup = 2
    } else {
      this.numGuessData.cup = 1
    }
    if (a === this.numGuessData.length) {
      this.gameResult.isOver = true
      this.gameResult.isWin = true
      this.gameResult.steps = this.numGuessData.steps

      this.g.gameData.gameList.find((g) => g.pageName === this.g.show.pageName)!.cup += this.numGuessData.cup

      this.gameResult.htmlMessage = `
      <h4 class="color-green">${this.g.instant('guess.gameover.youWin')}</h4>
      <p>${this.g.instant('guess.gameover.useStep')}${this.numGuessData.steps}</p>
      <p>${this.g.instant('guess.gameover.answerIs')}<span class="color-blue">${this.numGuessData.result.join('')}</span></p>
      <p>${this.g.instant('guess.gameover.gotCup')}<span class="color-green">${this.numGuessData.cup}</p>
      <p>${this.g.instant('guess.gameover.keepTry')}</p>
      `
    } else if (this.numGuessData.steps >= this.numGuessData.length * 2) {
      this.gameResult.isOver = true
      this.gameResult.isWin = false
      this.gameResult.steps = this.numGuessData.steps
      this.gameResult.htmlMessage = `
      <h4 class="color-orange">${this.g.instant('guess.gameover.youLose')}</h4>
      <p>${this.g.instant('guess.gameover.correctAnswerIs')}<span class="color-blue">${this.numGuessData.result.join('')}</span></p>
      <p>${this.g.instant('guess.gameover.keepTry')}</p>
      `
    }
  }



}
