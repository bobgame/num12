import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { NumGuessPlayComponent } from './num-guess-play/num-guess-play.component'

@Component({
    selector: 'nm-num-guess',
    templateUrl: './num-guess.component.html',
    styleUrls: ['./num-guess.component.scss'],
    imports: [CommonModule, NumGuessPlayComponent]
})
export class NumGuessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('NumGuessComponent ngOnInit')

  }

}
