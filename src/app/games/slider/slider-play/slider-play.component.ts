import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { UiHeaderComponent } from 'src/app/common/ui/ui-header/ui-header.component'
import { SliderService } from '../slider.service'
import { SliderItem } from '../slider'
import { clone } from 'src/app/units/Base'
import { GlobalService } from 'src/app/common/services/global.service'
import { BaseDirection } from 'src/app/common/types/base'
import { SliderScoreScale, baseScore } from '../slider.const'
import { cloneDeep, flatten, intersectionWith, isEqual } from 'lodash-es'
import { TranslateModule } from '@ngx-translate/core'
import { UiControlComponent } from 'src/app/common/ui/ui-control/ui-control.component'

@Component({
  selector: 'nm-slider-play',
  templateUrl: './slider-play.component.html',
  styleUrls: ['./slider-play.component.scss'],
  imports: [CommonModule, UiHeaderComponent, UiControlComponent, TranslateModule],
})
export class SliderPlayComponent implements OnInit {
  constructor(public sliderService: SliderService, public g: GlobalService) {}

  moveOneTime = 300
  isSliding = false

  ngOnInit() {
    console.log('SliderPlayComponent ngOnInit')
  }

  test() {
    this.startSlide()
  }

  onSwipeLeft(e: Event) {
    console.log('onSwipeLeft', e)
    this.startSlide('left')
  }

  onSwipeRight(e: Event) {
    console.log('onSwipeRight', e)
    this.startSlide('right')
  }

  onSwipeUp(e: Event) {
    console.log('onSwipeUp', e)
    this.startSlide('up')
  }

  onSwipeDown(e: Event) {
    console.log('onSwipeDown', e)
    this.startSlide('down')
  }

  startSlide(direction: BaseDirection = 'right') {
    if (this.isSliding) {
      return
    }
    this.isSliding = true
    console.log('slideGetScore', direction)
    this.moveAll(direction)
    setTimeout(() => {
      this.checkScore()
      this.moveItems(direction)
      this.addNewItem()
      this.removeOutItem()
      setTimeout(() => {
        this.isSliding = false
        this.addAnimationToItems()
        if (this.sliderService.sliderData.steps <= 0) {
          this.gameover()
        }
      }, this.moveOneTime * 2)
    }, this.moveOneTime * 1)
  }

  moveAll(direction: BaseDirection) {
    switch (direction) {
      case 'left':
        this.sliderService.sliderItems.forEach((item) => {
          if (item.y > 3 && item.y < 8) {
            item.x--
            console.log(1)

          }
        })
        break
      case 'right':
        this.sliderService.sliderItems.forEach((item) => {
          if (item.y > 3 && item.y < 8) {
            item.x++
          }
        })
        break
      case 'up':
        this.sliderService.sliderItems.forEach((item) => {
          if (item.x > 3 && item.x < 8) {
            item.y--
          }
        })
        break
      case 'down':
        this.sliderService.sliderItems.forEach((item) => {
          if (item.x > 3 && item.x < 8) {
            item.y++
          }
        })
        break
    }
  }

  checkScore() {
    const scoreItemsGroup: SliderItem[][] = []
    for (let i = 4; i < 8; i++) {
      for (let j = 4; j < 8; j++) {
        const item = this.sliderService.sliderItems.find(
          (s) => s.x === i && s.y === j,
        )
        const tempItems: SliderItem[] = []
        if (item) {
          const itemLeft = this.sliderService.sliderItems.find(
            (s) => s.x === i - 1 && s.y === j,
          )
          const itemRight = this.sliderService.sliderItems.find(
            (s) => s.x === i + 1 && s.y === j,
          )
          const itemUp = this.sliderService.sliderItems.find(
            (s) => s.x === i && s.y === j - 1,
          )
          const itemDown = this.sliderService.sliderItems.find(
            (s) => s.x === i && s.y === j + 1,
          )

          if (
            itemLeft &&
            itemLeft.num === item.num &&
            this.isInContent(itemLeft)
          ) {
            tempItems.push(clone(itemLeft))
          }
          if (
            itemRight &&
            itemRight.num === item.num &&
            this.isInContent(itemRight)
          ) {
            tempItems.push(clone(itemRight))
          }
          if (itemUp && itemUp.num === item.num && this.isInContent(itemUp)) {
            tempItems.push(clone(itemUp))
          }
          if (
            itemDown &&
            itemDown.num === item.num &&
            this.isInContent(itemDown)
          ) {
            tempItems.push(clone(itemDown))
          }
          if (tempItems.length >= 2) {
            tempItems.push(clone(item))
            scoreItemsGroup.push(tempItems)
          }
        }
      }
    }
    if (scoreItemsGroup.length > 0) {
      const scoreItemsFlatten = flatten(scoreItemsGroup)
      for (let i = this.sliderService.sliderItems.length - 1; i >= 0; i--) {
        const tempItem = this.sliderService.sliderItems[i]
        if (
          scoreItemsFlatten.find(
            (s) => s.x === tempItem.x && s.y === tempItem.y,
          )
        ) {
          this.sliderService.sliderItems.splice(i, 1)
        }
      }
      this.addScore(scoreItemsGroup)
    } else {
      this.isSliding = false
    }
    this.sliderService.sliderData.steps--
  }

  getFinalItems(
    scoreItemsGroup: SliderItem[][],
    finalItems: SliderItem[][] = [],
  ): SliderItem[][] {
    let arr1 = scoreItemsGroup[0]
    if (scoreItemsGroup.length > 1) {
      const otherScoreItemsGroup = cloneDeep(scoreItemsGroup)
      otherScoreItemsGroup.shift()
      for (let i = otherScoreItemsGroup.length - 1; i >= 0; i--) {
        const arr2 = otherScoreItemsGroup[i]
        const repeat = intersectionWith(arr1, arr2, isEqual)
        if (repeat && repeat.length > 0) {
          const tempArr = [...arr1, ...arr2]
          arr1 = tempArr.filter(
            (item, index) =>
              tempArr.findIndex(
                (i) => i.num === item.num && i.x === item.x && i.y === item.y,
              ) === index,
          )

          otherScoreItemsGroup.splice(i, 1)
        }
      }
      finalItems.push(arr1)
      if (otherScoreItemsGroup.length > 1) {
        return this.getFinalItems(otherScoreItemsGroup, finalItems)
      } else if (otherScoreItemsGroup.length > 0) {
        finalItems.push(otherScoreItemsGroup[0])
      }
      return finalItems
    } else {
      finalItems.push(arr1)
      return finalItems
    }
  }

  addScore(scoreItemsGroup: SliderItem[][]) {
    const finalItems = this.getFinalItems(scoreItemsGroup)

    const numCounts: { num: number; count: number }[] = []
    finalItems.forEach((item) => {
      numCounts.push({ num: item[0].num, count: item.length })
      const tempInData = this.sliderService.sliderData.numCounts.find(
        (n) => n.num === item[0].num,
      )
      if (tempInData) {
        tempInData.count += item.length
      } else {
        this.sliderService.sliderData.numCounts.push({
          num: item[0].num,
          count: item.length,
        })
      }
    })
    let score = 0
    let addStep = 0
    numCounts.forEach((n) => {
      score += baseScore * SliderScoreScale.get(n.count)!
      if (n.count > 4) {
        addStep++
      }
      // console.log(n.num, n.count, SliderScoreScale.get(n.count)!, baseScore * SliderScoreScale.get(n.count)!)
    })
    if (score > 30) {
      addStep++
    }
    this.sliderService.sliderData.steps += addStep
    this.sliderService.sliderData.score += score
    const star = this.checkStar(this.sliderService.sliderData.score)
    if (star > this.sliderService.sliderData.star) {
      this.sliderService.sliderData.star = star
    }
  }

  checkStar(score: number) {
    let star = 0
    if (score >= 20000) {
      star = 5
    } else if (score >= 10000) {
      star = 4
    } else if (score >= 5000) {
      star = 3
    } else if (score >= 3000) {
      star = 2
    } else if (score >= 1000) {
      star = 1
    }
    return star
  }

  gameover() {
    const msg = `游戏结束，得分：${this.sliderService.sliderData.score}`
    alert(msg)
  }

  moveItems(direction: BaseDirection) {
    switch (direction) {
      case 'left':
        for (let i = 5; i < 12; i++) {
          for (let j = 4; j < 8; j++) {
            const item = this.sliderService.sliderItems.find(
              (s) => s.x === i && s.y === j,
            )
            if (item) {
              this.checkEmptyItemAndMove(direction, i, j, item)
            }
          }
        }
        break
      case 'right':
        for (let i = 6; i >= 0; i--) {
          for (let j = 4; j < 8; j++) {
            const item = this.sliderService.sliderItems.find(
              (s) => s.x === i && s.y === j,
            )
            if (item) {
              this.checkEmptyItemAndMove(direction, i, j, item)
            }
          }
        }
        break
      case 'up':
        for (let i = 4; i < 8; i++) {
          for (let j = 5; j < 12; j++) {
            const item = this.sliderService.sliderItems.find(
              (s) => s.x === i && s.y === j,
            )
            if (item) {
              this.checkEmptyItemAndMove(direction, i, j, item)
            }
          }
        }
        break
      case 'down':
        for (let i = 4; i < 8; i++) {
          for (let j = 6; j >= 0; j--) {
            const item = this.sliderService.sliderItems.find(
              (s) => s.x === i && s.y === j,
            )
            if (item) {
              this.checkEmptyItemAndMove(direction, i, j, item)
            }
          }
        }
        break
    }
  }

  addNewItem() {
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        const item = this.sliderService.sliderItems.find(
          (s) => s.x === i && s.y === j,
        )
        if (!item) {
          const newItem = this.sliderService.createNewSliderItem(i, j)
          this.sliderService.sliderItems.push(newItem)
        }
      }
    }
  }

  removeOutItem() {
    for (let i = this.sliderService.sliderItems.length - 1; i >= 0; i--) {
      const item = this.sliderService.sliderItems[i]
      if (item.x < 0 || item.x > 11 || item.y < 0 || item.y > 11) {
        this.sliderService.sliderItems.splice(i, 1)
      }
    }
  }

  addAnimationToItems() {
    this.sliderService.sliderItems.forEach((item) => {
      item.animation = true
    })
  }

  checkEmptyItemAndMove(
    direction: BaseDirection,
    i: number,
    j: number,
    item: SliderItem,
  ) {
    switch (direction) {
      case 'left':
        if (
          !this.sliderService.sliderItems.find(
            (s) => s.x === i - 1 && s.y === j,
          )
        ) {
          item.x = i - 1
          this.checkEmptyItemAndMove(direction, i - 1, j, item)
        }
        break
      case 'right':
        if (
          !this.sliderService.sliderItems.find(
            (s) => s.x === i + 1 && s.y === j,
          )
        ) {
          item.x = i + 1
          this.checkEmptyItemAndMove(direction, i + 1, j, item)
        }
        break
      case 'up':
        if (
          !this.sliderService.sliderItems.find(
            (s) => s.x === i && s.y === j - 1,
          )
        ) {
          item.y = j - 1
          this.checkEmptyItemAndMove(direction, i, j - 1, item)
        }
        break
      case 'down':
        if (
          !this.sliderService.sliderItems.find(
            (s) => s.x === i && s.y === j + 1,
          )
        ) {
          item.y = j + 1
          this.checkEmptyItemAndMove(direction, i, j + 1, item)
        }
        break
    }
  }

  isInContent(item: SliderItem) {
    return item.x > 3 && item.x < 8 && item.y > 3 && item.y < 8
  }
}
