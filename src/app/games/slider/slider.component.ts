import { Component, OnInit } from '@angular/core'
import { SliderPlayComponent } from './slider-play/slider-play.component'
import { CommonModule } from '@angular/common'
import { SliderService } from './slider.service'

@Component({
  selector: 'nm-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  imports: [CommonModule, SliderPlayComponent],
})
export class SliderComponent implements OnInit {
  constructor(
    public sliderService: SliderService,
  ) {
    console.log('SliderComponent constructor')
  }

  ngOnInit() {
    this.sliderService.initSlider()
    console.log('SliderComponent ngOnInit')
  }
}
