export interface NumGuessData {
  steps: number
  cup: number
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