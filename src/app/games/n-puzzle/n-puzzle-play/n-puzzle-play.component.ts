import { CommonModule } from '@angular/common'
import { Component, HostListener, OnInit } from '@angular/core'
import { NPuzzleService } from '../n-puzzle.service'
import { UiHeaderComponent } from 'src/app/common/ui/ui-header/ui-header.component'
import { NPuzzleItem } from '../n-puzzle'
import { GlobalService } from 'src/app/common/services/global.service'
import { TranslateModule } from '@ngx-translate/core'
import { UiControlComponent } from 'src/app/common/ui/ui-control/ui-control.component'
import { BaseDirection } from 'src/app/common/types/base'

@Component({
  selector: 'nm-n-puzzle-play',
  templateUrl: './n-puzzle-play.component.html',
  styleUrls: ['./n-puzzle-play.component.scss'],
  imports: [CommonModule, UiHeaderComponent, UiControlComponent, TranslateModule],
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

  move(direction: BaseDirection) {
    this.nPuzzleService.move(direction)
  }

  @HostListener('window:keydown.ArrowLeft', ['$event'])
  handleKeyLeft() {
    this.move('left')
  }

  @HostListener('window:keydown.ArrowRight', ['$event'])
  handleKeyRight() {
    this.move('right')
  }

  @HostListener('window:keydown.ArrowUp', ['$event'])
  handleKeyUp() {
    this.move('up')
  }

  @HostListener('window:keydown.ArrowDown', ['$event'])
  handleKeyDown() {
    this.move('down')
  }

}
