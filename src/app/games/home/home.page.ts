import { Component } from '@angular/core'
import { GlobalService } from '../../common/services/global.service'
import { PageName } from '../../common/enums/base.enum'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'nm-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class HomeComponent {
  constructor(
    public g: GlobalService,
  ) {
    console.log('HomePage constructor')
  }
  PageName = PageName

  gotoPage(pageName: PageName) {
    this.g.navigate(pageName)
  }
}
