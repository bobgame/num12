import { Component, OnInit } from '@angular/core'
import { NPuzzlePlayComponent } from './n-puzzle-play/n-puzzle-play.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'nm-n-puzzle',
  templateUrl: './n-puzzle.component.html',
  styleUrls: ['./n-puzzle.component.scss'],
  standalone: true,
  imports: [CommonModule, NPuzzlePlayComponent],
})
export class NPuzzleComponent implements OnInit {

  constructor() {
    console.log("NPuzzleComponent constructor called")
  }

  ngOnInit() {
    console.log("NPuzzleComponent ngOnInit called")
  }

}
