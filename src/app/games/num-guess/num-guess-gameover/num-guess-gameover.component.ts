import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LazyDialogRef } from 'ngx-lazy-dialog'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'nm-num-guess-gameover',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './num-guess-gameover.component.html',
  styleUrls: ['./num-guess-gameover.component.scss'],
})
export class NumGuessGameoverComponent implements OnInit {
  public myData: {message: string} = {message: ''}
  constructor(private _dialogRef: LazyDialogRef) {
  }

  ngOnInit() {
    // getting data
    this.myData = this._dialogRef.data
  }

  close(data?: any) {
    // closing dialog
    this._dialogRef.close(data)
  }
}
