import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { N2048PlayComponent } from './n-2048-play/n-2048-play.component'

@Component({
  selector: 'nm-n2048',
  templateUrl: './n-2048.component.html',
  styleUrls: ['./n-2048.component.scss'],
  standalone: true,
  imports: [CommonModule, N2048PlayComponent],
})
export class N2048Component implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('N2048Component.ngOnInit')
  }

}
