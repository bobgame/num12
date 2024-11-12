// export const calcMissRate = (hitRate: number, dod: number): number => {
//   let rate = dod / (hitRate + dod)
//   if (rate < 0) {rate = 0.05}
//   if (rate > 0.8) {rate = 0.8}
//   return rate
// }

import { RareTypeEnum } from '../enums/state.enum';
import { Item } from '../interfaces/data.interface';

/**
 * 命中低于对方闪避，则命中率低于20%，每低5点降低1%命中率，命中率最低10%
 * 命中等于对方闪避，命中率20%
 * 命中高于对方闪避，则命中率高于20%，命中高0.6点增加1%命中率，直到50%。
 * 如果自身命中高于对方闪避50个点，命中就50%。
 * 之后所高于对方的闪避每增加10，命中率增加1%，最高70%。
 * @param hitRate number
 * @param dod number
 * @returns number
 */
export const calcMissRate = (hitRate: number, dod: number): number => {
  let rate = 0.2;
  if (hitRate < dod) {
    rate = 0.2 - (dod - hitRate) / 500;
    if (rate < 0.1) {
      rate = 0.1;
    }
  } else {
    if (hitRate - dod < 50) {
      rate = 0.2 + ((hitRate - dod) * 3) / 500;
    } else {
      rate = 0.5 + (hitRate - dod - 50) / 1000;
      if (rate > 0.7) {
        rate = 0.7;
      }
    }
  }
  let missRate = 1 - rate;
  if (missRate < 0) {
    missRate = 0;
  }
  return missRate;
};
export const calcLvExp = (lv: number): number => {
  let exp = 0;
  if (lv <= 10) {
    exp = (lv + Math.floor(lv / 2)) * 200;
  } else if (lv > 10) {
    exp = calcLvExp(10) + calcLvExp(lv - 10) * 3;
  }
  return exp;
};
/** return 0~1 */
export const calcCriticalRate = (atkCritical: number): number => {
  let rateValue = 0;
  if (atkCritical > 0) {
    if (atkCritical <= 50) {
      rateValue = Math.floor(atkCritical * 10) / 10;
    } else if (atkCritical <= 100) {
      rateValue = Math.floor((50 + (atkCritical - 50) / 4) * 10) / 10;
    } else if (atkCritical <= 160) {
      rateValue = Math.floor((62.5 + (atkCritical - 100) / 8) * 10) / 10;
    } else {
      rateValue = Math.floor((70 + (atkCritical - 160) / 20) * 10) / 10;
    }
    if (rateValue > 100) {
      rateValue = 100;
    }
  }
  return rateValue / 100;
};
export const isLowerRare = (item: Item, targetRare: RareTypeEnum): boolean => {
  let isLower = false;
  if (item.rare) {
    if (
      targetRare === RareTypeEnum.uncommon &&
      item.rare === RareTypeEnum.none
    ) {
      isLower = true;
    } else if (
      targetRare === RareTypeEnum.extraordinary &&
      (item.rare === RareTypeEnum.none || item.rare === RareTypeEnum.uncommon)
    ) {
      isLower = true;
    } else if (
      targetRare === RareTypeEnum.legendary &&
      (item.rare === RareTypeEnum.none ||
        item.rare === RareTypeEnum.uncommon ||
        item.rare === RareTypeEnum.extraordinary)
    ) {
      isLower = true;
    } else {
      isLower = false;
    }
  } else {
    isLower = true;
  }
  return isLower;
};

// export const calcLvExp = (lv: number): number => {
//   let exp = 0
//   if (lv <= 10) {
//     exp = (lv + Math.floor(lv / 2)) * 100
//   } else if (lv > 10) {
//     exp = calcLvExp(10) + calcLvExp(lv - 10) * 2
//   }
//   return exp
// }
