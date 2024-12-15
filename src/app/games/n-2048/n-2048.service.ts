import { Injectable } from '@angular/core'
import { clone, sample } from 'src/app/units/Base'
import { N2048Item } from './n-2048'

@Injectable({
  providedIn: 'root',
})
export class N2048Service {

  constructor() { }

  n2048DataBase = {
    steps: 0,
    score: 0,
    cup: 0,
    bestScore: 0,
    maxPower: 4,
    gameOver: false,
    gameWon: false,
  }

  n2048Data = clone(this.n2048DataBase)

  n2048Items: N2048Item[] = []
  n2048BgItems: N2048Item[] = []

  baseNumbers = [2, 2, 2, 4]

  initBgItems() {
    this.n2048BgItems = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j ++) {
        this.n2048BgItems.push({ id: i * 4 + j + 1, num: 0, x: i, y: j })
      }
    }
  }

  init2048() {
    this.n2048Items = []
    this.n2048Data.score = 0
    this.addNewItem(2)
  }

  addNewItem(count = 1) {
    const maxCount = count
    const indexes = [0, 1, 2, 3]
    for (let i = 0; i < 9999; i++) {
      const x = sample(indexes)
      const y = sample(indexes)
      const num = sample(this.baseNumbers)
      if (this.n2048Items.filter(item => item.x === x && item.y === y).length === 0) {
        this.n2048Items.push({ id: i + 1, num, x, y })
        if (this.n2048Items.length >= maxCount) {
          break
        }
      }
    }
  }
}
