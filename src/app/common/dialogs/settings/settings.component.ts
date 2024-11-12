import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LazyDialogRef } from 'ngx-lazy-dialog'
import { TranslateModule } from '@ngx-translate/core'
import { NgToggleModule } from 'ng-toggle-button'
import { GlobalService } from '../../services/global.service'
import { SettingsEnum } from '../../data/settings'

@Component({
  selector: 'nm-settings',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgToggleModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public myData: {message: string} = {message: ''}
  constructor(
    private _dialogRef: LazyDialogRef,
    private g: GlobalService,
  ) {
  }

  settings = {
    onlyGame: false,
  }

  ngOnInit() {
    // getting data
    this.myData = this._dialogRef.data
    this.settings.onlyGame = this.g.getSetting(SettingsEnum.OnlyGame) === true
  }

  setOnlyGame() {
    this.settings.onlyGame = !this.settings.onlyGame
  }

  save() {
    this._dialogRef.close('saved')
  }

  close(data?: any) {
    // closing dialog
    this._dialogRef.close(data)
  }
}
