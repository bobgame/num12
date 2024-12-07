import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { PageName } from 'src/app/common/enums/base.enum'
import { GlobalService } from 'src/app/common/services/global.service'

@Component({
  selector: 'nm-num-games',
  imports: [CommonModule, TranslateModule],
  templateUrl: './num-games.component.html',
  styleUrl: './num-games.component.scss',
})
export class NumGamesComponent {
  constructor(
    public g: GlobalService,
  ) {
  }

  gotoGame(pageName: PageName) {
    this.g.navigate(pageName)
  }

}
