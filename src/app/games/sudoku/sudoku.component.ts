import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SudokuPlayComponent } from './sudoku-play/sudoku-play.component'

@Component({
  selector: 'nm-sudoku',
  standalone: true,
  imports: [CommonModule, SudokuPlayComponent],
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss'],
})
export class SudokuComponent {

}
