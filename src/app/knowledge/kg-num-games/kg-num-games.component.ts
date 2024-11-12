import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GlobalService } from 'src/app/common/services/global.service'
import { PageName } from 'src/app/common/enums/base.enum'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'nm-kg-num-games',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './kg-num-games.component.html',
  styleUrls: ['./kg-num-games.component.scss'],
})
export class KgNumGamesComponent {
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
