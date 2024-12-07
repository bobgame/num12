import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'nm-num-history',
  imports: [CommonModule, TranslateModule],
  templateUrl: './num-history.component.html',
  styleUrl: './num-history.component.scss',
})
export class NumHistoryComponent {
  descriptions: string[] = []
  constructor(private translate: TranslateService) {
    this.translate.stream('k.history.descriptions').subscribe((res: string[]) => {
      this.descriptions = res
    })
  }

}
