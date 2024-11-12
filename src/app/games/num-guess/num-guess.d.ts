export interface NumGuessData {
  steps: number
  star: number
  count: number
  histories: {
    guess: string
    a: number
    b: number
  }[]
  a0b0: number[]
  length: number
  result: number[]
}