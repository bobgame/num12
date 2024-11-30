import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { SudokuService } from '../../sudoku.service'
import { SudoItem } from '../../sudoku.d'

@Component({
    selector: 'nm-sudoku-number',
    imports: [CommonModule],
    templateUrl: './sudoku-number.component.html',
    styleUrls: ['./sudoku-number.component.scss']
})
export class SudokuNumberComponent {

  numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  starArr: Array<number> = []

  @Input() sudoItem: SudoItem = {
    id: 0,
    isBlank: false,
    isEdit: false,
    isTip: false,
    editBoard: [],
    backupNum: 0,
    playNum: 0,
    isError: false,
  }

  constructor(
    public sudokuService: SudokuService,
  ) { }


  checkSameNumbers(num: number) {
    this.sudokuService.checkSameNumbers(num)
  }

  setShowPlayNumber(index: number): void {
    // console.log(this.d.sudokuData.sudoArr[index])
    this.sudokuService.setShowPlayNumber(index)
  }

  setThisEditBoardStatus() {
    return this.sudokuService.setThisEditBoardStatus()
  }

  numEmptyPress(index: number): void {
    this.setShowPlayNumber(index)
    this.setThisEditBoardStatus()
  }

}
