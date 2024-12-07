import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

interface CategoryItem {
  title: string
  texts: string[]
}

@Component({
  selector: 'nm-num-introduce',
  imports: [CommonModule, TranslateModule],
  templateUrl: './num-introduce.component.html',
  styleUrl: './num-introduce.component.scss',
})
export class NumIntroduceComponent {
  descriptions: string[] = []
  categories: CategoryItem[] = []
  constructor(private translate: TranslateService) {
    this.translate.stream('k.introduce.descriptions').subscribe((res: string[]) => {
      this.descriptions = res
    })
    this.translate.stream('k.introduce.categories').subscribe((res: CategoryItem[]) => {
      console.log(res)
      this.categories = res
    })
  }

}
