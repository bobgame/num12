import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GlobalService } from 'src/app/common/services/global.service'
import { TranslateModule } from '@ngx-translate/core'
import { LanguageService } from 'src/app/common/services/language.service'

@Component({
  selector: 'nm-kg-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './kg-home.component.html',
  styleUrls: ['./kg-home.component.scss'],
})
export class KgHomeComponent {

  constructor(
    public g: GlobalService,
    public languageService: LanguageService,
  ) { }

}
