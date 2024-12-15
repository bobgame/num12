import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'nm-ui-status-bar',
  imports: [],
  templateUrl: './ui-status-bar.component.html',
  styleUrl: './ui-status-bar.component.scss',
})
export class UiStatusBarComponent {
  @Output() clickMore = new EventEmitter<void>()

  more() {
    this.clickMore.emit()
  }
}
