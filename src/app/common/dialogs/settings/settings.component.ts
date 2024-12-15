import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { NgToggleModule } from 'ng-toggle-button'
import { GlobalService } from '../../services/global.service'
import { SettingsEnum } from '../../data/settings'
import { UiDialogComponent } from '../ui-dialog.component'

@Component({
  selector: 'nm-settings',
  imports: [CommonModule, TranslateModule, NgToggleModule, UiDialogComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public myData: {message: string} = {message: ''}
  constructor(
    private g: GlobalService,
  ) {
  }

  settings = {
    onlyGame: false,
  }

  ngOnInit() {
    this.settings.onlyGame = this.g.getSetting(SettingsEnum.OnlyGame).value === true
  }

  setOnlyGame() {
    this.settings.onlyGame = !this.settings.onlyGame
  }

  save() {
    console.log('saved')
    this.close()
  }

  close() {
    this.g.show.pop.settings = false
    this.g.show.pop.settingsInApp = false
  }
}
