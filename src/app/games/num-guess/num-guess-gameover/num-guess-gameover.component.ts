import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { UiDialogComponent } from 'src/app/common/dialogs/ui-dialog.component'
import { NumGuessService } from '../num-guess.service'

@Component({
  selector: 'nm-num-guess-gameover',
  imports: [CommonModule, TranslateModule, UiDialogComponent],
  templateUrl: './num-guess-gameover.component.html',
  styleUrls: ['./num-guess-gameover.component.scss'],
})
export class NumGuessGameoverComponent {

  constructor(public numGuessService: NumGuessService) {
  }

  close() {
    this.numGuessService.newGame()
    this.numGuessService.gameResult.isOver = false
  }
}
