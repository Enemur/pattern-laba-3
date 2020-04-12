import { ISortStrategy } from '../abstract/sort-strategy.interface';
import { SortDirection } from '../const/sort-direction.enum';
import { ExcludeKeyType } from '../type/exclude-key.type';
import { CompareType } from '../type/compare.type';
import { CanSwapType } from '../type/can-swap.type';
import { getCanSwapFunc } from '../tool/can-swap.tool';

export class InsertSortStrategy<T, K> implements ISortStrategy<T> {
  private readonly canSwap: CanSwapType<T>;

  constructor(
    private readonly excludeKeyFunc: ExcludeKeyType<T, K>,
    private readonly compareFunc: CompareType<K>
  ) {
    this.canSwap = getCanSwapFunc(excludeKeyFunc, compareFunc);
  }

  sort(data: T[], direction: SortDirection): T[] {
    for (let i = 1; i < data.length; i++) {
      let k: number;
      const tmp = data[i];

      for (k = i - 1; k >= 0; k--) {
        if (!this.canSwap(data[k], tmp, direction)) {
          break;
        }

        data[k + 1] = data[k];
      }

      data[k + 1] = tmp;
    }

    return data;
  }
}
