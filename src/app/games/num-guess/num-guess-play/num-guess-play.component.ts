import { CommonModule } from '@angular/common'
import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { UiHeaderComponent } from 'src/app/common/ui/ui-header/ui-header.component'
import { NumGuessService } from '../num-guess.service'
import { GlobalService } from 'src/app/common/services/global.service'
import { LazyDialogConfig, LazyDialogService } from 'ngx-lazy-dialog'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'nm-num-guess-play',
  templateUrl: './num-guess-play.component.html',
  styleUrls: ['./num-guess-play.component.scss'],
  imports: [CommonModule, UiHeaderComponent, TranslateModule],
})
export class NumGuessPlayComponent implements OnInit {

  constructor(
    private viewContainerRef: ViewContainerRef,
    public g: GlobalService,
    public numGuessService: NumGuessService,
    private lazyDialogService: LazyDialogService,
  ) { }
  guess = [-1, -1, -1, -1]

  ngOnInit() {
    this.init()
    // this.openGameoverDialog()
  }

  init() {
    this.numGuessService.newGame()
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
    const component = await import('../num-guess-gameover/num-guess-gameover.component').then(m => m.NumGuessGameoverComponent)
    const data = { message: this.numGuessService.gameResult.htmlMessage }

    const config: LazyDialogConfig = {
      closeOnBackdropClick: true,
      closeButton: true,
      customClasses: 'my-custom-class',
    }

    const dialog = await this.lazyDialogService.create({component, data, config})
    dialog.onClose().then((output) => {
      console.log(output)
    })
  }

}
