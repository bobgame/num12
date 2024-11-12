export interface SliderItem {
  id: number
  num: number
  x: number
  y: number
  animation?: boolean
}

export interface SliderData {
  maxNum: number
  steps: number
  score: number
  star: number
  numCounts: {num: number, count: number}[]
}
