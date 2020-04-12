import { ISortStrategy } from '../abstract/sort-strategy.interface';
import { SortDirection } from '../const/sort-direction.enum';
import { ExcludeKeyType } from '../type/exclude-key.type';
import { CompareType } from '../type/compare.type';
import { CanSwapType } from '../type/can-swap.type';
import { getCanSwapFunc } from '../tool/can-swap.tool';
import { swap } from '../tool/swap.tool';

export class BubbleSortStrategy<T, K> implements ISortStrategy<T> {
  private readonly canSwap: CanSwapType<T>;

  constructor(
    private readonly excludeKeyFunc: ExcludeKeyType<T, K>,
    private readonly compareFunc: CompareType<K>
  ) {
    this.canSwap = getCanSwapFunc(excludeKeyFunc, compareFunc);
  }

  sort(data: T[], direction: SortDirection): T[] {
    for (let i = 0; i < data.length - 1; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (this.canSwap(data[i], data[j], direction)) {
          swap(data, i, j);
        }
      }
    }

    return data;
  }
}
