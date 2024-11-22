import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { appConfig } from 'src/app/app.config'
import { GlobalService } from 'src/app/common/services/global.service'
import { UiHeaderComponent } from 'src/app/common/ui/ui-header/ui-header.component'

@Component({
  selector: 'nm-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule, UiHeaderComponent],
})
export class AboutComponent {

  constructor(
    public g: GlobalService,
  ) { }

  version = appConfig.version


}
