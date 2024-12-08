import { Injectable } from '@angular/core'
import { NPuzzleItem } from './n-puzzle'
import { BaseDirection } from 'src/app/common/types/base'

@Injectable(
  { providedIn: 'root' },
)

export class NPuzzleService {
  constructor() {
    console.log('NPuzzleService constructor called')
  }

  nPuzzleData = {
    maxNum: 56,
    maxX: 3,
    maxY: 3,
    steps: 0,
    star: 0,
  }

  nPuzzleItems: NPuzzleItem[] = [
    { id: 1, num: 1, x: 0, y: 0 },
  ]


  initNPuzzle() {
    this.nPuzzleItems = []
    this.nPuzzleData.maxNum = this.nPuzzleData.maxX * this.nPuzzleData.maxY
    let randomNumbers = [...new Array(this.nPuzzleData.maxNum - 1).keys()]
    randomNumbers = randomNumbers.sort(() => Math.random() - 0.5)
    console.log(randomNumbers)

    for (let i = 0; i < randomNumbers.length; i++) {
      const num = randomNumbers[i]
      this.nPuzzleItems.push({
        id: i + 1,
        num: num + 1,
        x: i % this.nPuzzleData.maxX,
        y: Math.floor(i / this.nPuzzleData.maxX),
      })
    }
  }

  nPuzzleItemClicked(item: NPuzzleItem) {
    const emptyItem = this.checkEmptyItem(item)
    if (emptyItem) {
      item.x = emptyItem.x
      item.y = emptyItem.y
      this.nPuzzleData.steps++
      // TODO: check get star

      this.checkIfWin()
    }
  }

  move(direction: BaseDirection) {
    let emptyItem = { x: -1, y: -1 }
    for (let i = 0; i < this.nPuzzleItems.length + 1; i++) {
      const empty = this.nPuzzleItems.find(item => item.x === i % this.nPuzzleData.maxX && item.y === Math.floor(i / this.nPuzzleData.maxX))
      if (!empty) {
        emptyItem = { x: i % this.nPuzzleData.maxX, y: Math.floor(i / this.nPuzzleData.maxX) }
        break
      }
    }
    if (emptyItem.x === -1) { return }

    let item: NPuzzleItem | undefined
    switch (direction) {
      case 'left':
        item = this.nPuzzleItems.find(i => i.x === emptyItem.x + 1 && i.y === emptyItem.y)
        break
      case 'right':
        item = this.nPuzzleItems.find(i => i.x === emptyItem.x - 1 && i.y === emptyItem.y)
        break
      case 'up':
        item = this.nPuzzleItems.find(i => i.x === emptyItem.x && i.y === emptyItem.y + 1)
        break
      case 'down':
        item = this.nPuzzleItems.find(i => i.x === emptyItem.x && i.y === emptyItem.y - 1)
        break
    }

    if (item) {
      item.x = emptyItem.x
      item.y = emptyItem.y
      this.nPuzzleData.steps++
    }
  }

  checkEmptyItem(item: NPuzzleItem): {x: number, y: number} | undefined {
    const leftItem = this.nPuzzleItems.find(i => i.x === item.x - 1 && i.y === item.y)
    if (item.x > 0 && !leftItem) { return { x: item.x - 1, y: item.y } }

    const rightItem = this.nPuzzleItems.find(i => i.x === item.x + 1 && i.y === item.y)
    if (item.x < this.nPuzzleData.maxX - 1 && !rightItem) { return { x: item.x + 1, y: item.y } }

    const upItem = this.nPuzzleItems.find(i => i.x === item.x && i.y === item.y - 1)
    if (item.y > 0 && !upItem) { return { x: item.x, y: item.y - 1 } }

    const downItem = this.nPuzzleItems.find(i => i.x === item.x && i.y === item.y + 1)
    if (item.y < this.nPuzzleData.maxY - 1 && !downItem) { return { x: item.x, y: item.y + 1 } }

    return undefined
  }

  checkIfWin() {
    for (let i = 0; i < this.nPuzzleData.maxNum - 1; i++) {
      const itemIndex = this.nPuzzleItems[i].num - 1
      if (itemIndex % this.nPuzzleData.maxX !== this.nPuzzleItems[i].x || Math.floor(itemIndex / this.nPuzzleData.maxX) !== this.nPuzzleItems[i].y) {
        console.log('Not win with: ', itemIndex + 1)
        return false
      }
    }
    console.log('You win!')
    return true
  }

  checkIfError(item: NPuzzleItem) {
    const itemIndex = item.num - 1
    if (itemIndex % this.nPuzzleData.maxX !== item.x || Math.floor(itemIndex / this.nPuzzleData.maxX) !== item.y) {
      return true
    }
    return false
  }

}
