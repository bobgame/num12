import { Component, OnInit } from '@angular/core'
import { GlobalService } from '../../services/global.service'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'nm-cup',
  templateUrl: './cup.component.html',
  imports: [CommonModule, TranslateModule],
  styleUrls: ['./cup.component.scss'],
})
export class CupComponent implements OnInit {

  constructor(
    public g: GlobalService,
  ) { }

  ngOnInit() {
    console.log('gameData', this.g.gameData)
  }

  close() {
    this.g.show.pop.cup = false
  }

}
