import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'nm-ui-control',
  imports: [],
  templateUrl: './ui-control.component.html',
  styleUrl: './ui-control.component.scss',
})
export class UiControlComponent {
  @Output() left = new EventEmitter<void>()
  @Output() right = new EventEmitter<void>()
  @Output() up = new EventEmitter<void>()
  @Output() down = new EventEmitter<void>()

  leftClick() {
    this.left.emit()
  }

  rightClick() {
    this.right.emit()
  }

  upClick() {
    this.up.emit()
  }

  downClick() {
    this.down.emit()
  }

}
