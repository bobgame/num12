import { Injectable } from '@angular/core'
import { SliderData, SliderItem } from './slider'
import { GlobalService } from 'src/app/common/services/global.service'

@Injectable(
  { providedIn: 'root' },
)

export class SliderService {
  constructor(
    private g: GlobalService,
  ) { }

  sliderItems: SliderItem[] = []
  sliderData: SliderData = {
    maxNum: 4,
    steps: 20,
    score: 0,
    cup: 0,
    numCounts: [],
  }

  initSlider() {
    this.sliderItems = []
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        this.sliderItems.push({
          id: i * 12 + j,
          num: Math.floor(Math.random() * this.sliderData.maxNum + 1),
          x: i,
          y: j,
          animation: true,
        })
      }
    }
  }

  createNewSliderItem(i: number, j: number): SliderItem {
    return {
      id: i * 12 + j,
      num: Math.floor(Math.random() * this.sliderData.maxNum + 1),
      x: i,
      y: j,
    }
  }



}
