import { Component, OnInit } from '@angular/core'
import { GlobalService } from '../../services/global.service'

@Component({
  selector: 'nm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnInit {

  constructor(
    public g: GlobalService,
  ) { }

  ngOnInit() {
    console.log('gameData', this.g.gameData)
  }

  close() {
    this.g.show.pop.star = false
  }

}
