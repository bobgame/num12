import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core'
import { UiHeaderComponent } from 'src/app/common/ui/ui-header/ui-header.component'
import { NumGuessService } from '../num-guess.service'
import { GlobalService } from 'src/app/common/services/global.service'
import { TranslateModule } from '@ngx-translate/core'
import { UiStatusBarComponent } from 'src/app/common/ui/ui-status-bar/ui-status-bar.component'
import { NumGuessGameoverComponent } from '../num-guess-gameover/num-guess-gameover.component'

@Component({
  selector: 'nm-num-guess-play',
  templateUrl: './num-guess-play.component.html',
  styleUrls: ['./num-guess-play.component.scss'],
  imports: [CommonModule, TranslateModule, UiHeaderComponent, UiStatusBarComponent, NumGuessGameoverComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NumGuessPlayComponent implements OnInit {

  constructor(
    public g: GlobalService,
    public numGuessService: NumGuessService,
  ) { }
  guess = [-1, -1, -1, -1]
  isShowMore = false

  ngOnInit() {
    this.init()
    // this.openGameoverDialog()
  }

  init() {
    this.numGuessService.newGame()
  }
  showMore() {
    this.isShowMore = true
  }

  hideMore() {
    this.isShowMore = false
  }

  isDisabled(num: number) {
    return this.guess.includes(num)
  }

  isMustNotIn(num: number) {
    return this.numGuessService.numGuessData.a0b0.includes(num)
  }

  deleteClick() {
    const index = this.guess.findIndex((n) => n === -1)
    if (index > 0) {
      this.guess[index - 1] = -1
    }
  }

  submitClick() {
    this.numGuessService.submit(this.guess)
    this.guess = [-1, -1, -1, -1]
    if (this.numGuessService.gameResult.isOver) {
      this.openGameoverDialog()
    }
  }

  numClick(num: number) {
    if (this.isDisabled(num) || this.isMustNotIn(num)) {
      return
    }
    const index = this.guess.findIndex((n) => n === -1)
    if (index === -1) {
      return
    } else {
      this.guess[index] = num
    }
  }

  async openGameoverDialog() {
    this.numGuessService.gameResult.isOver = true
  }

}
