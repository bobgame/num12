import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { appConfig } from 'src/app/app.config'
import { UiDialogComponent } from '../ui-dialog.component'
import { GlobalService } from '../../services/global.service'

@Component({
  selector: 'nm-about',
  imports: [CommonModule, TranslateModule, UiDialogComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  appConfig = appConfig
  constructor(private g: GlobalService) {
  }

  close() {
    this.g.show.pop.about = false
    this.g.show.pop.aboutInApp = false
  }
}
