export const rand = (): number => crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296

export const sample = <T>(arr: T[]): T => arr[Math.floor(arr.length * rand())]

export const clone = <T>(source: T): T => JSON.parse(JSON.stringify(source))

export const numToNumArray = (num: number) =>
  num
    .toString()
    .split('')
    .map((n) => parseFloat(n))

export const addToArr = <T>(item: T, arr: T[]) => {
  if (!arr.includes(item)) {
    arr.push(item)
  }
}

export const rand100 = (): number => rand() * 100
export const randInt = (MaxNum: number, minNum = 0): number => Math.floor(rand() * (MaxNum - minNum + 1) + minNum)
export const randBoolean = (): boolean => rand() > 0.5

export const randCoding = (count?: number) => {
  const result: string[] = []
  let n = randInt(128, 100) // 这个值可以改变的，对应的生成多少个字母，根据自己需求所改
  if (count) {
    n = randInt(count + 20, count)
  }
  for (let i = 0; i < n; i++) {
    // 生成一个0到25的数字
    const ranNum = Math.ceil(Math.random() * 25)
    // 大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;
    // 然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
    result.push(String.fromCharCode(65 + ranNum))
  }
  return result.join('').toLocaleLowerCase()
}

export const getById = <T>(arr: T[], id: number): T => arr.find((p: any) => p.id && p.id === id) || arr[0]

export const cloneDeep = <T>(obj: T, parent: any = null): T => {
  let result
  let parentInner = parent
  while (parentInner) {
    if (parentInner.originalParent === obj) {
      return parentInner.currentParent
    }
    parentInner = parentInner.parent
  }
  if (obj && typeof obj === 'object') {
    if (obj instanceof RegExp) {
      result = new RegExp(obj.source, obj.flags)
    } else if (obj instanceof Date) {
      result = new Date(obj.getTime())
    } else {
      if (obj instanceof Array) {
        result = []
      } else {
        const proto = Object.getPrototypeOf(obj)
        result = Object.create(proto)
      }
      for (const i in obj) {
        if (obj[i] && typeof obj[i] === 'object') {
          result[i] = cloneDeep(obj[i], {
            originalParent: obj,
            currentParent: result,
            parent,
          })
        } else {
          result[i] = obj[i]
        }
      }
    }
  } else {
    return obj
  }
  return result
}

export const getRandNumArr = (maxAmount: number, maxValue: number): number[] => {
  const arr: number[] = []
  for (let i = 0; i < 999; i++) {
    const num = randInt(maxValue)
    if (!arr.includes(num)) {
      arr.push(num)
      if (arr.length >= maxAmount) {
        break
      }
    }
  }
  if (arr.length < maxAmount) {
    return getRandNumArr(maxAmount, maxValue)
  }
  return arr
}

export const randomCoding = (count?: number) => {
  const result: string[] = []
  let n = randInt(128, 100) // 这个值可以改变的，对应的生成多少个字母，根据自己需求所改
  if (count) {
    n = randInt(count + 20, count)
  }
  for (let i = 0; i < n; i++) {
    // 生成一个0到25的数字
    const ranNum = Math.ceil(Math.random() * 25)
    // 大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;
    // 然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
    result.push(String.fromCharCode(65 + ranNum))
  }
  return result.join('').toLocaleLowerCase()
}
