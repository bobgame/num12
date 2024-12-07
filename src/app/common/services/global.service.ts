import { Injectable } from '@angular/core'
import { GameName, PageName } from '../enums/base.enum'
import { Router } from '@angular/router'
import { GameData, GameShow } from '../interfaces/base.interface'
import { environment } from 'src/environments/environment'
import { TranslateService } from '@ngx-translate/core'
import localforage from 'localforage'
import { SlEnum } from '../enums/sl.enum'
import { specialStoreItem } from '../data/base'
import { clone } from 'lodash-es'
import { appConfig } from 'src/app/app.config'
import { LanguageService } from './language.service'
import { SettingItem, SettingsEnum, settingsDefault } from '../data/settings'
import { rand } from 'src/app/units/Base'

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageService,
  ) { }

  environment = environment
  settings = clone(settingsDefault)

  gameData: GameData = {
    allStar: 0,
    gameList: [
      { id: 1, name: GameName.slider, pageName: PageName.slider, star: 0 },
      { id: 2, name: GameName.nPuzzle, pageName: PageName.nPuzzle, star: 0 },
      { id: 3, name: GameName.n2048, pageName: PageName.n2048, star: 0 },
      { id: 4, name: GameName.numGuess, pageName: PageName.numGuess, star: 0 },
      { id: 5, name: GameName.sudoku, pageName: PageName.sudoku, star: 0 },
    ],
    gameHistory: {
      slider: {
        numCounts: [],
      },
    },
  }

  show: GameShow = {
    pageName: PageName.home,
    isHP: false,
    onlyWeb: false,
    pop: {
      star: false,
      loading: true,
    },
  }

  getSetting = (id: SettingsEnum): SettingItem => this.settings.find(s => s.id === id) || { id: 0, value: '' }

  navigate(page: PageName = PageName.home) {
    this.show.pop.loading = true
    setTimeout(() => {
      this.show.pageName = page
    }, 0)
    setTimeout(() => {
      this.show.pop.loading = false
    }, 800 + 200 * rand())
    // this.router.navigate([page])
  }

  goBack() {
    this.navigate(PageName.home)
  }

  instant(key: string, interpolateParams?: object | undefined) {
    if (interpolateParams) {
      return this.translate.instant(key, interpolateParams) || ''
    }
    return this.translate.instant(key) || ''
  }

  // Storage start
  async initStorage() {
    const self = this
    localforage.config({
      name: 'actiondofsimplefmxll',
    })
    try {
      // console.log('initStorage')
      await localforage.ready()
      // console.log('localforage.ready()')
      return localforage
        .getItem(SlEnum.a)
        .then(function (value) {
          if (value) {
            self.startLoad()
          } else {
            self.writeStorage()
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    } catch (e) {
      console.log(e) // `No available storage method found.`
    }
  }

  writeStorage() {
    const heroStr = JSON.stringify(specialStoreItem)
    localforage.setItem(SlEnum.a, heroStr)
    localforage.setItem(SlEnum.b, heroStr)
    localforage.setItem(SlEnum.c, heroStr)
    // localforage.setItem(SlEnum.d, heroStr)
    localforage.setItem(SlEnum.e, heroStr)
    localforage.setItem(SlEnum.f, heroStr)
    localforage.setItem(SlEnum.g, heroStr)
    localforage.setItem(SlEnum.h, heroStr)
    localforage.setItem(SlEnum.i, heroStr)
    localforage.setItem(SlEnum.j, heroStr)
    // localforage.setItem(SlEnum.k, heroStr)
    localforage.setItem(SlEnum.l, heroStr)
    localforage.setItem(SlEnum.m, heroStr)
    localforage.setItem(SlEnum.n, heroStr)
    localforage.setItem(SlEnum.o, heroStr)
  }


  startLoad() {
    // this.loadGame(true)
    this.loadHis()
  }

  loadGame(isStart = false) {
    localforage
      .getItem(SlEnum.d)
      .then((value) => {
        if (value && typeof value === 'string') {
          const loadValue = JSON.parse(value)
          if (loadValue && loadValue.latitude.age.isActive.balance && loadValue.latitude.age.isActive.balance.dv && loadValue.latitude.age.isActive.balance.dv === appConfig.dv) {
            // const res = loadValue.latitude.age.isActive.balance
            // this.hero = cloneDeep(res.h)
            // this.keys = cloneDeep(res.k)
            // this.now = cloneDeep(res.n)
            // this.npcs = cloneDeep(res.c)
            // this.npcsAdventure = cloneDeep(res.a)
            // this.mails = cloneDeep(res.m)
            // this.allMaps = cloneDeep(res.p)
            // this.places = this.allMaps.find((m) => m.id === this.now.mapId)?.places || this.allMaps[0].places
            // this.allTasks = cloneDeep(res.t)
            // this.show.pop.load = false
            if (!isStart) {
              this.toast('读取成功')
              // this.navigate(PageName.play)
            }
          } else {
            // this.show.isNewGame = true
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  loadHis() {
    localforage
      .getItem(SlEnum.k)
      .then((value) => {
        if (value && typeof value === 'string') {
          const loadValue = JSON.parse(value)
          if (loadValue && loadValue.latitude.age.isActive.balance && loadValue.latitude.age.isActive.balance.hisV && loadValue.latitude.age.isActive.balance.hisV === appConfig.hv) {
            const res = loadValue.latitude.age.isActive.balance
            this.settings = clone(res.s)
            // this.collect = clone(res.c)
            const lang = this.getSetting(2).value
            this.languageService.useLanguage(lang)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async save() {
    await this.saveHis()
    await this.saveGame()
  }
  async saveHis() {
    const HeroDefaultT = clone(specialStoreItem)
    HeroDefaultT.latitude.age.isActive.balance = {
      hisV: appConfig.hv,
      // c: clone(this.collect),
      // s: clone(this.settings),
    }
    const heroStr = JSON.stringify(HeroDefaultT)
    return localforage
      .setItem(SlEnum.k, heroStr)
      .then((value) => {
        console.log('saveHis success', value)

        // toast('保存成功')
        // closeSaveBox()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  async saveGame() {
    const HeroDefaultT = clone(specialStoreItem)
    // const nowMap = this.allMaps.find((m) => m.id === this.now.mapId)
    // if (nowMap) {
    //   nowMap.places = clone(this.places)
    // }
    HeroDefaultT.latitude.age.isActive.balance = {
      dv: appConfig.dv,
      // h: clone(this.hero),
      // k: clone(this.keys),
      // n: clone(this.now),
      // c: clone(this.npcs),
      // a: clone(this.npcsAdventure),
      // m: clone(this.mails),
      // p: clone(this.allMaps),
      // t: clone(this.allTasks),
    }
    const heroStr = JSON.stringify(HeroDefaultT)
    localforage
      .setItem(SlEnum.d, heroStr)
      .then(() => {
        this.toast('保存成功')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Storage end

  toast(message: string) {
    console.log(message)
    // this.toastService.show(message)
  }
}
