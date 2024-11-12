import { Injectable } from '@angular/core'
import { clone, sample } from 'src/app/units/Base'
import { NumGuessData } from './num-guess'

@Injectable(
  { providedIn: 'root' },
)

export class NumGuessService {
  constructor() {
    console.log('SliderService constructor')
  }

  numBase = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  gameResult = {
    isOver: false,
    isWin: false,
    star: 0,
    steps: 0,
    htmlMessage: '',
  }

  numGuessDataBase: NumGuessData = {
    steps: 0,
    star: 0,
    count: 0,
    histories: [],
    a0b0: [],
    length: 4,
    result: [0, 1, 2, 3],
  }

  numGuessData = clone(this.numGuessDataBase)

  newGame() {
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
      this.numGuessData.star = 2
    } else {
      this.numGuessData.star = 1
    }
    if (a === this.numGuessData.length) {
      this.gameResult.isOver = true
      this.gameResult.isWin = true
      this.gameResult.steps = this.numGuessData.steps
      this.gameResult.htmlMessage = `
      <h4 class="color-green">You Win!</h4>
      <p>Used guess steps: ${this.numGuessData.steps}</p>
      <p>The answer is: <span class="color-blue">${this.numGuessData.result.join('')}</span></p>
      <p>You got <span class="color-green">${this.numGuessData.star}</span> star!, Keep trying! Hope to see you again!</p>
      `
    } else if (this.numGuessData.steps >= this.numGuessData.length * 2) {
      this.gameResult.isOver = true
      this.gameResult.isWin = false
      this.gameResult.steps = this.numGuessData.steps
      this.gameResult.htmlMessage = `
      <h4 class="color-orange">You Lose!</h4>
      <p>The answer is: <span class="color-blue">${this.numGuessData.result.join('')}</span>, Keep trying! Hope you're right next time!</p>
      `
    }
  }



}
