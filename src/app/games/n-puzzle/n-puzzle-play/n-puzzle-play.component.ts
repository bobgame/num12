import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { NPuzzleService } from '../n-puzzle.service'
import { UiHeaderComponent } from 'src/app/common/ui/ui-header/ui-header.component'
import { NPuzzleItem } from '../n-puzzle'
import { GlobalService } from 'src/app/common/services/global.service'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'nm-n-puzzle-play',
  templateUrl: './n-puzzle-play.component.html',
  styleUrls: ['./n-puzzle-play.component.scss'],
  standalone: true,
  imports: [CommonModule, UiHeaderComponent, TranslateModule],
})
export class NPuzzlePlayComponent implements OnInit {

  constructor(
    public nPuzzleService: NPuzzleService,
    public g: GlobalService,
  ) {
    console.log('NPuzzlePlayComponent constructor called')
  }

  ngOnInit() {
    this.nPuzzleService.initNPuzzle()
    console.log('NPuzzlePlayComponent ngOnInit called')
  }

  nPuzzleItemClicked(item: NPuzzleItem) {
    this.nPuzzleService.nPuzzleItemClicked(item)
  }

}
