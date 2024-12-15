import { Injectable } from '@angular/core'
import { clone } from 'src/app/units/Base'
import { SudoPageEnum } from './enum/sudoku-page.enum'
// import { SUDOKU_SAVE } from './enum/sudoku-save.enum'
import { SudokuShowData, SudokuData, SudoItem } from './sudoku'
import { SUDOKU_SHOW_DATA } from './sudoku-data'
import { CelShowTime } from 'src/app/units/getTime'

@Injectable({
  providedIn: 'root',
})
export class SudokuService {

  constructor() { }

  sudokuShowData: SudokuShowData = clone(SUDOKU_SHOW_DATA)

  numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  cupArr = [1, 2, 3, 4, 5]
  hardModeName = ['common.starter', 'common.normal', 'common.master']
  editBoardTemplate = [false, false, false, false, false, false, false, false, false, false]
  STAR_MAX = this.cupArr.length
  sudokuData: SudokuData = {
    sudo: [],
    continue: false,
    sudoArr: [],
    blankArr: [],
    blankEditBoard: [],
    sudoPlayArr: [],
    errorArr: [],
    nowHardModeName: '',
    time: 0,
    cup: this.STAR_MAX,
    nowMode: 0,
    nowLv: 0,
    mode: [1, 1, 1],
    allCups: [
      {
        mode: 0,
        cupNum: 0,
        totalTime: 0,
        levelCups: [],
      },
      {
        mode: 1,
        cupNum: 0,
        totalTime: 0,
        levelCups: [],
      },
      {
        mode: 2,
        cupNum: 0,
        totalTime: 0,
        levelCups: [],
      },
    ],
  }
  sudokuShowTimeInterval: any

  gotoSudoHome() {
    this.sudokuShowData.page = SudoPageEnum.Home
  }

  getSudoItem(id: number) {
    return this.sudokuData.sudo.find(s => s.id === id)!
  }

  async InitSudo() {
    if (this.sudokuData.continue) { return }
    this.createNewGame(this.sudokuData.nowMode)
  }

  startShowTime() {
    // console.log('Start Show Time: ' + this.sudokuShowData.showTime)
    clearInterval(this.sudokuShowTimeInterval)
    this.sudokuShowData.showTime = this.celTime(this.sudokuData.time)
    this.sudokuShowTimeInterval = setInterval(() => {
      this.sudokuData.time++
      this.sudokuShowData.showTime = this.celTime(this.sudokuData.time)
      this.sudokuShowData.pauseTime = false
      this.saveData()
    }, 1000)
  }

  celTime(time: number) {
    return CelShowTime(time)
  }

  pauseShowTime() {
    // console.log('Pause Show Time: ' + this.sudokuShowData.showTime)
    this.sudokuShowData.pauseTime = true
    clearInterval(this.sudokuShowTimeInterval)
  }

  getModeNameWithIndex(index: number) {
    if (this.hardModeName) {
      const thisModeName = this.hardModeName[index]
      const thisModeLevel = this.sudokuData.mode[index]
      return [`${thisModeName}`, `Lv${thisModeLevel}`]
    }
    return ['', '']
  }

  // 生成数独
  createSudoArr() {
    try {
      this.sudokuData.sudoArr = []
      this.creatThird(2, 8, this.sudokuData.sudoArr)
      this.creatThird(5, 5, this.sudokuData.sudoArr)
      this.creatThird(8, 2, this.sudokuData.sudoArr)
      for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
          if (this.sudokuData.sudoArr[i * 10 + j]) {
            continue
          }
          const XArr = this.getXArr(i, this.sudokuData.sudoArr)
          const YArr = this.getYArr(j, this.sudokuData.sudoArr)
          const thArr = this.getThArr(i, j, this.sudokuData.sudoArr)
          const arr = this.getConnect(this.getConnect(XArr, YArr), thArr)
          const ableArr = this.arrMinus(this.numArr, arr)
          if (ableArr.length === 0) {
            this.createSudoArr()
            return
          }

          let item: number
          // 如果生成的重复了就重新生成，这里只是以防万一的做法。
          do {
            item = ableArr[this.getRandom(ableArr.length) - 1]
          } while ((arr.indexOf(item) > -1))
          this.sudokuData.sudoArr[i * 10 + j] = item
          this.sudokuShowData.sudoReady = true
        }
      }
      this.saveData()
    } catch (e) {
      // 如果因为超出浏览器的栈限制出错，就重新运行。
      this.createSudoArr()
    }
  }

  newGame() {
    this.sudokuShowData.page = SudoPageEnum.NewGame
  }

  createBlankArr(level: number, hardMode: number) {
    // 生成指定数量的空白格子的坐标。
    // level = 1
    let num = Math.floor(level / 30 * 10 + hardMode * 15 + 7)
    num = num < 65 ? num : 65
    // num = 1 // for test
    const arr = []
    let item: number
    for (let a = 0; a < num; a++) {
      do {
        item = this.numArr[this.getRandom(9) - 1] * 10 + this.numArr[this.getRandom(9) - 1]
      } while (arr.indexOf(item) > -1)
      arr.push(item)
    }
    this.sudokuData.blankArr = arr
  }

  createBlankEditBoard(): void {
    this.sudokuData.blankEditBoard = []
    for (let a = 0; a < 100; a++) {
      this.sudokuData.blankEditBoard[a] = [false, false, false, false, false, false, false, false, false, false]
    }
  }

  createSudoPlayArr() {
    const arr: number[] = []
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        const thisIndex = i * 10 + j
        const buckupNum = this.sudokuData.sudoArr[thisIndex]
        if (this.sudokuData.blankArr.indexOf(thisIndex) > -1) {
          arr[thisIndex] = 0
        } else {
          arr[thisIndex] = buckupNum
        }
      }
    }
    this.sudokuData.sudoPlayArr = arr
    this.saveData()
  }

  setShowPlayNumber(index: number): void {
    this.sudokuShowData.playNumber = index
    this.sudokuShowData.isEdit = this.getSudoItem(index).isEdit
    // console.log('playNumber: ' + this.sudokuShowData.playNumber)
    // 计算与此空格相关的格子
    this.getRelatedIndex(index)
  }
  clearPlayNumber() {
    const thisItem = this.getSudoItem(this.sudokuShowData.playNumber)
    thisItem.playNum = 0
    thisItem.isError = false
    thisItem.editBoard = clone(this.editBoardTemplate)
    this.saveData()
  }

  clickPlayNumber(num: number): void {
    const thisItem = this.getSudoItem(this.sudokuShowData.playNumber)
    if (thisItem.isEdit) {
      thisItem.editBoard[num] = !thisItem.editBoard[num]
    } else {
      thisItem.playNum = num
      const errorLengthBefore = this.sudokuData.errorArr.length
      this.checkErrors()
      const errorLengthAfter = this.sudokuData.errorArr.length
      if (errorLengthAfter > errorLengthBefore) {
        if (this.sudokuData.cup > 0) { this.sudokuData.cup-- }
      }
      this.checkIfNumbersFull()
    }
    this.saveData()
  }

  setThisEditBoardStatus() {
    const thisItem = this.getSudoItem(this.sudokuShowData.playNumber)
    thisItem.isEdit = !thisItem.isEdit
    this.sudokuShowData.isEdit = thisItem.isEdit
  }

  creatThird(i: number, j: number, sudoArr: Array<number>) {
    // 为对角线上的三个三宫格随机生成。
    const sortedNumArr = this.numArr.slice().sort(() => {
      return Math.random() > 0.5 ? -1 : 1
    })
    const centerNum = i * 10 + j
    /** *********
     * 11 12 13
     * 21 22 23
     * 31 32 33
     ***********/
    const thIndexArr = [
      centerNum - 11, centerNum - 10, centerNum - 9,
      centerNum - 1, centerNum, centerNum + 1,
      centerNum + 9, centerNum + 10, centerNum + 11,
    ]
    for (let a = 0; a < 9; a++) {
      sudoArr[thIndexArr[a]] = sortedNumArr[a]
    }
  }

  // 获取所在列的值。
  getYArr(j: number, dataArr: Array<number>) {
    const arr = []
    for (let a = 1; a <= 9; a++) {
      if (dataArr[a * 10 + j]) {
        arr.push(dataArr[a * 10 + j])
      }
    }
    return arr
  }

  // 获取所在行的值。
  getXArr(i: number, dataArr: Array<number>) {
    const arr = []
    for (let a = 1; a <= 9; a++) {
      if (dataArr[i * 10 + a]) {
        arr.push(dataArr[i * 10 + a])
      }
    }
    return arr
  }

  // 获取所在三宫格的值
  getThArr(i: number, j: number, dataArr: Array<number>) {
    const arr = []
    const centerNum = this.getTh(i, j)
    const thIndexArr = [
      centerNum - 11, centerNum - 10, centerNum - 9,
      centerNum - 1, centerNum, centerNum + 1,
      centerNum + 9, centerNum + 10, centerNum + 11,
    ]
    for (let a = 0; a < 9; a++) {
      if (dataArr[thIndexArr[a]]) {
        arr.push(dataArr[thIndexArr[a]])
      }
    }
    return arr
  }
  // 获取所在三宫格的中间位坐标。
  getTh(i: number, j: number) {
    const cenArr = [22, 25, 28, 52, 55, 58, 82, 85, 88]
    // i为0 1 2 j逢3进1 0-8
    const index = (Math.ceil(i / 3) - 1) * 3 + Math.ceil(j / 3) - 1
    const centerNum = cenArr[index]
    return centerNum
  }
  // 两个简单数组的并集
  getConnect(arr1: Array<number>, arr2: Array<number>) {
    const resArr = arr2.slice()
    for (const arr1Num of arr1) {
      if (arr2.indexOf(arr1Num) < 0) {
        resArr.push(arr1Num)
      }
    }
    return resArr
  }
  // 两个简单数组差集，arr1为大数组
  arrMinus(arr1: Array<number>, arr2: Array<number>) {
    const resArr: Array<number> = []
    for (const arr1Num of arr1) {
      if (arr2.indexOf(arr1Num) < 0) {
        resArr.push(arr1Num)
      }
    }
    return resArr
  }
  // 生成随机正整数
  getRandom(n: number): number {
    return Math.floor(Math.random() * n + 1)
  }
  // 获取空格相关空格
  getRelatedIndex(index: number) {
    const i = Math.floor(index / 10)
    const j = index % 10
    const xIndexArr = []
    for (let a = 1; a <= 9; a++) {
      xIndexArr.push(i * 10 + a)
    }
    const yIndexArr = []
    for (let b = 1; b <= 9; b++) {
      yIndexArr.push(b * 10 + j)
    }
    const centerNum = this.getTh(i, j)
    const thIndexArr = [
      centerNum - 11, centerNum - 10, centerNum - 9,
      centerNum - 1, centerNum, centerNum + 1,
      centerNum + 9, centerNum + 10, centerNum + 11,
    ]
    const arr = this.getConnect(this.getConnect(xIndexArr, yIndexArr), thIndexArr)
    this.sudokuData.sudo.forEach(s => {
      if (arr.includes(s.id)) {
        s.isTip = true
      } else {
        s.isTip = false
      }
    })
    // console.log(arr)
  }
  checkSameNumbers(num: number) {
    this.sudokuShowData.isEdit = false
    this.sudokuShowData.playNumber = 0
    const arr: number[] = []
    for (let a = 0; a < this.sudokuData.sudoPlayArr.length; a++) {
      if (this.sudokuData.sudoPlayArr[a] === num) {
        arr.push(a)
      }
    }
    this.sudokuData.sudo.forEach(s => {
      if (arr.includes(s.id)) {
        s.isTip = true
      } else {
        s.isTip = false
      }
    })
  }
  checkIfNumbersFull(): void {
    let isFull = true
    this.sudokuData.sudo.forEach(s => {
      if (!s.playNum) { isFull = false }
    })
    if (isFull) { this.checkResult() }
  }
  showErrors() {
    // console.log('errorArr: ' + this.sudokuData.errorArr)
  }
  checkErrors() {
    this.sudokuData.errorArr = []
    this.sudokuData.sudo.forEach(s => {
      if (s.playNum > 0) {
        this.checkCell(s.id)
      }
    })
    // console.log(this.sudokuData.errorArr)
    this.saveData()
  }
  // 检测每一个一个格子中输入的值，在横竖宫里是否已存在。
  checkCell(index: number) {
    const i = Math.floor(index / 10)
    const j = index % 10
    const XArr = []
    for (let a = 1; a <= 9; a++) {
      const xIndex = i * 10 + a
      const xItem = this.getSudoItem(xIndex)
      if (xItem.playNum && xIndex !== index) {
        XArr.push(xItem.playNum)
      }
    }
    const YArr = []
    for (let b = 1; b <= 9; b++) {
      const yIndex = b * 10 + j
      const yItem = this.getSudoItem(yIndex)
      if (yItem.playNum && yIndex !== index) {
        YArr.push(yItem.playNum)
      }
    }
    const thArr = []
    const centerNum = this.getTh(i, j)
    const thIndexArr = [
      centerNum - 11, centerNum - 10, centerNum - 9,
      centerNum - 1, centerNum, centerNum + 1,
      centerNum + 9, centerNum + 10, centerNum + 11,
    ]
    for (let c = 0; c < 9; c++) {
      const thIndex = thIndexArr[c]
      const thItem = this.getSudoItem(thIndex)
      if (thItem.playNum && thIndex !== index) {
        thArr.push(thItem.playNum)
      }
    }
    const arr = this.getConnect(this.getConnect(XArr, YArr), thArr)
    const thisItem = this.getSudoItem(index)

    if (arr.includes(thisItem.playNum) && thisItem.isBlank) {
      thisItem.isError = true
      this.sudokuData.errorArr.push(thisItem.id)
    } else {
      thisItem.isError = false
    }
  }
  // 当输入完整时，检测结果
  checkResult() {
    if (this.sudokuData.errorArr.length === 0) {
      // const message = `
      // <p class="mb-2">${this.translate.instant('gameOver.winWin')}</p>
      // <p class="d-flex align-items-center justify-content-center">${this.translate.instant('common.got')}<span class="color-red pl-1"> <i class="nwicon nwi-cup color-red"></i> x ${this.sudokuData.cup}</span></p>
      // `
      this.gameOverReset()
      this.saveData()
      // 排行榜
      // this.sendToUpdateData(this.sudokuData)
      // this.showGameOverPop(message)
    } else {
      this.showErrors()
    }
  }

  gameOverReset() {
    const winCup = this.sudokuData.cup
    this.sudokuShowData.winCup = winCup
    const thisSudoCup = this.sudokuData.allCups.find(s => s.mode === this.sudokuData.nowMode)!
    thisSudoCup.cupNum += winCup
    const nowLv = this.sudokuData.mode[this.sudokuData.nowMode]
    if (this.sudokuData.nowLv < nowLv) {
      const thisSudoLevel = thisSudoCup.levelCups.find(ls => ls.lv === this.sudokuData.nowLv)
      if (thisSudoLevel && thisSudoLevel.cupNum < winCup) {
        // TODO: 需要修改
        // const addCup = winCup - thisSudoLevel.cupNum
        // this.all.allData.cup += addCup
        // this.all.allData.allGetCup += addCup
        // thisSudoLevel.cupNum = winCup
        // this.all.allData.gameCups.find(g => g.id === GameId.sudoku).getCup += addCup
      }
    } else {
      thisSudoCup.levelCups.push({
        lv: nowLv,
        cupNum: winCup,
      })
      // TODO: 需要修改
      // this.all.allData.cup += winCup
      // this.all.allData.allGetCup += winCup
      // this.all.allData.gameCups.find(g => g.id === GameId.sudoku).getCup += winCup
      this.sudokuData.mode[this.sudokuData.nowMode] += 1
    }
    // this.all.save()
    thisSudoCup.totalTime += this.sudokuData.time
    // console.log(this.sudokuData.mode[this.sudokuData.nowMode])
    this.pauseShowTime()
    this.sudokuData.time = 0
    this.sudokuData.continue = false
    this.sudokuData.errorArr = []
    this.sudokuData.cup = this.STAR_MAX
    this.sudokuShowData.playNumber = 0
    this.sudokuData.sudoArr = []
    this.sudokuShowData.nowGameWin = true
  }

  // sendToUpdateData(sudoData) {
  //   // this.rankService.sendToUpdateData(sudoData)
  // }

  // 存档
  saveData(): void {
    if (this.sudokuData.sudo.length > 80) {
      // this.storage.save(SUDOKU_SAVE.NORMAL_STORAGE, this.sudokuData)
    }
  }

  loadData() {
    // const loadData: any = this.storage.load(SUDOKU_SAVE.NORMAL_STORAGE)
    // if (loadData) {
    //   this.sudokuData = loadData
    // }
  }

  createNewGame(hardMode: number, lv?: number) {
    // console.log(hardMode + ' game start!')
    this.pauseShowTime()
    this.sudokuData.nowMode = hardMode
    const nowLv = lv ? lv : this.sudokuData.mode[hardMode]
    this.sudokuData.nowHardModeName = this.hardModeName[hardMode]
    this.sudokuData.time = 0
    this.sudokuShowData.nowGameWin = false
    this.sudokuData.errorArr = []
    this.sudokuData.cup = this.STAR_MAX
    this.sudokuShowData.playNumber = 0
    this.createBlankEditBoard()
    this.createSudoArr()
    this.sudokuData.nowLv = nowLv
    this.createBlankArr(nowLv, hardMode)
    this.createSudoPlayArr()
    this.mergeNewSudo()
    this.sudokuData.continue = true
    this.saveData()
    this.startShowTime()
    // console.log(this.SudoData)
  }

  mergeNewSudo() {
    this.sudokuData.sudo = []
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        const index = i * 10 + j
        const isBlank = this.sudokuData.blankArr.includes(index)
        const backupNum = this.sudokuData.sudoArr[index]
        const thisSudo: SudoItem = {
          id: index,
          isBlank,
          isTip: false,
          isEdit: false,
          editBoard: clone(this.editBoardTemplate),
          backupNum,
          playNum: !isBlank ? backupNum : 0,
          isError: false,
        }
        this.sudokuData.sudo.push(thisSudo)
      }
    }
  }

  showGameOverPop(message: string) {
    this.sudokuShowData.gameOverText = message
    this.sudokuShowData.pop.gameover = true
  }

  // for test used
  clearData() {
    // this.storage.remove('sd-setting')
    // this.storage.remove('sd-data')
  }
}
