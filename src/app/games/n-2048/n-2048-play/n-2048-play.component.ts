import { CommonModule } from '@angular/common'
import { Component, HostListener, OnInit } from '@angular/core'
import { GlobalService } from 'src/app/common/services/global.service'
import { UiHeaderComponent } from 'src/app/common/ui/ui-header/ui-header.component'
import { N2048Service } from '../n-2048.service'
import { BaseDirection } from 'src/app/common/types/base'
import { N2048Item } from '../n-2048'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'nm-n-2048-play',
  templateUrl: './n-2048-play.component.html',
  styleUrls: ['./n-2048-play.component.scss'],
  standalone: true,
  imports: [CommonModule, UiHeaderComponent, TranslateModule],
})
export class N2048PlayComponent implements OnInit {

  constructor(
    public g: GlobalService,
    public n2048Service: N2048Service,
  ) { }

  isSliding = false
  moveOneTime = 100

  ngOnInit() {
    this.n2048Service.initBgItems()
    console.log('N2048PlayComponent.ngOnInit')
    this.n2048Service.init2048()
    setTimeout(() => {
      this.addAnimation()
    }, 300)
  }


  onSwipeLeft() {
    this.startSlide('left')
  }

  onSwipeRight() {
    this.startSlide('right')
  }

  onSwipeUp() {
    this.startSlide('up')
  }

  onSwipeDown() {
    this.startSlide('down')
  }

  startSlide(direction: BaseDirection = 'right') {
    if (this.isSliding) {
      return
    }
    this.isSliding = true
    this.moveAll(direction)
    setTimeout(() => {
      this.mergeItems(direction)
    }, this.moveOneTime * 0.8)
    setTimeout(() => {
      this.checkScore()
      setTimeout(() => {
        this.addNewItem()
      }, this.moveOneTime * 0.5)
      setTimeout(() => {
        this.isSliding = false
        this.addAnimation()
      }, this.moveOneTime * 0.6)
    }, this.moveOneTime * 1)
  }

  moveAll(direction: BaseDirection) {
    switch (direction) {
      case 'left':
        for (let i = 1; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const item = this.n2048Service.n2048Items.find(item => item.x === i && item.y === j)
            if (item) {
              this.checkEmptyItemAndMove(direction, i, j, item)
            }
          }
        }
        break
      case 'right':
        for (let i = 2; i >= 0; i--) {
          for (let j = 0; j < 4; j++) {
            const item = this.n2048Service.n2048Items.find(item => item.x === i && item.y === j)
            if (item) {
              this.checkEmptyItemAndMove(direction, i, j, item)
            }
          }
        }
        break
      case 'up':
        for (let i = 0; i < 4; i++) {
          for (let j = 1; j < 4; j++) {
            const item = this.n2048Service.n2048Items.find(item => item.x === i && item.y === j)
            if (item) {
              this.checkEmptyItemAndMove(direction, i, j, item)
            }
          }
        }
        break
      case 'down':
        for (let i = 0; i < 4; i++) {
          for (let j = 2; j >= 0; j--) {
            const item = this.n2048Service.n2048Items.find(item => item.x === i && item.y === j)
            if (item) {
              this.checkEmptyItemAndMove(direction, i, j, item)
            }
          }
        }
        break
      default:
        break
    }
  }

  checkEmptyItemAndMove(direction: BaseDirection, i: number, j: number, item: N2048Item) {
    switch (direction) {
      case 'left': {
        const nextItem = this.n2048Service.n2048Items.find((n) => n.x === i - 1 && n.y === j)
        if (i > 0 && (!nextItem || nextItem.num === item.num) && !item?.preMerge && !nextItem?.preMerge) {
          item.x = i - 1
          if (nextItem) {
            this.setPreParams(item, nextItem)
          } else {
            this.checkEmptyItemAndMove(direction, i - 1, j, item)
          }
        }
        break
      }
      case 'right': {
        const nextItem = this.n2048Service.n2048Items.find((n) => n.x === i + 1 && n.y === j)
        if (i < 3 && (!nextItem || nextItem.num === item.num) && !item?.preMerge && !nextItem?.preMerge) {
          item.x = i + 1
          if (nextItem) {
            this.setPreParams(item, nextItem)
          } else {
            this.checkEmptyItemAndMove(direction, i + 1, j, item)
          }
        }
        break
      }
      case 'up': {
        const nextItem = this.n2048Service.n2048Items.find((n) => n.x === i && n.y === j - 1)
        if (j > 0 && (!nextItem || nextItem.num === item.num) && !item?.preMerge && !nextItem?.preMerge) {
          item.y = j - 1
          if (nextItem) {
            this.setPreParams(item, nextItem)
          } else {
            this.checkEmptyItemAndMove(direction, i, j - 1, item)
          }
        }
        break
      }
      case 'down': {
        const nextItem = this.n2048Service.n2048Items.find((n) => n.x === i && n.y === j + 1)
        if (j < 3 && (!nextItem || nextItem.num === item.num) && !item?.preMerge && !nextItem?.preMerge) {
          item.y = j + 1
          if (nextItem) {
            this.setPreParams(item, nextItem)
          } else {
            this.checkEmptyItemAndMove(direction, i, j + 1, item)
          }
        }
        break
      }
    }

  }

  setPreParams(item: N2048Item, nextItem: N2048Item) {
    nextItem.preMerge = true
    item.preMerge = true
    item.preDelete = true
  }

  checkScore() {

    console.log('checkScore')
  }

  mergeItems(direction: BaseDirection) {
    this.n2048Service.n2048Items.forEach(item => {
      if (item.preMerge && !item.preDelete) {
        item.num *= 2
      }
    })
    for (let i = this.n2048Service.n2048Items.length - 1; i >= 0; i--) {
      const item = this.n2048Service.n2048Items[i]
      if (item.preDelete) {
        this.n2048Service.n2048Items.splice(i, 1)
      }
    }
    console.log('mergeItems', direction)
  }

  addNewItem() {
    this.n2048Service.addNewItem()
  }

  addAnimation() {
    this.n2048Service.n2048Items.forEach(item => {
      item.animation = true
      item.preMerge = false
    })
  }

  @HostListener('window:keydown.ArrowLeft', ['$event'])
  handleKeyDown() {
    this.onSwipeLeft()
  }

  @HostListener('window:keydown.ArrowRight', ['$event'])
  handleKeyUp() {
    this.onSwipeRight()
  }

  @HostListener('window:keydown.ArrowUp', ['$event'])
  handleKeyLeft() {
    this.onSwipeUp()
  }

  @HostListener('window:keydown.ArrowDown', ['$event'])
  handleKeyRight() {
    this.onSwipeDown()
  }

}
