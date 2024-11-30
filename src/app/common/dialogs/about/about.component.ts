import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LazyDialogRef } from 'ngx-lazy-dialog'
import { TranslateModule } from '@ngx-translate/core'
import { appConfig } from 'src/app/app.config'

@Component({
    selector: 'nm-about',
    imports: [CommonModule, TranslateModule],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  public myData: {message: string} = {message: ''}
  appConfig = appConfig
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
