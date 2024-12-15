import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'nm-ui-dialog',
  imports: [],
  templateUrl: './ui-dialog.component.html',
  styleUrl: './ui-dialog.component.scss',
})
export class UiDialogComponent {
  constructor() {}

  @Input() title = ''
  @Input() maskClickable = true
  @Output() clickClose = new EventEmitter<void>()

  close() {
    this.clickClose.emit()
  }

  maskClick() {
    if (this.maskClickable) {
      this.clickClose.emit()
    }
  }

}
