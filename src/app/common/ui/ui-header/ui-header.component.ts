import { CommonModule } from '@angular/common'
import { Component, Input, Output, EventEmitter } from '@angular/core'
import { GlobalService } from '../../services/global.service'

@Component({
  selector: 'nm-ui-header',
  templateUrl: './ui-header.component.html',
  styleUrls: ['./ui-header.component.scss'],
  imports: [CommonModule],
})
export class UiHeaderComponent {

  @Input() title = ''
  @Input() backText = ''
  @Input() backEnabled = false
  @Output() back: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    private g: GlobalService,
  ) {}

  backClick() {
    this.g.show.pop.loading = true
    setTimeout(() => {
      this.back.emit()
    }, 100)
  }

  openCupPop() {
    this.g.show.pop.cup = true
  }

}
