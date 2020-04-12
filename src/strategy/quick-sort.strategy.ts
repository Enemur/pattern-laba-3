import { ISortStrategy } from '../abstract/sort-strategy.interface';
import { SortDirection } from '../const/sort-direction.enum';
import { ExcludeKeyType } from '../type/exclude-key.type';
import { CompareType } from '../type/compare.type';
import { CanSwapType } from '../type/can-swap.type';
import { getCanSwapFunc } from '../tool/can-swap.tool';
import { swap } from '../tool/swap.tool';

export class QuickSortStrategy<T, K> implements ISortStrategy<T> {
  private readonly canSwap: CanSwapType<T>;

  constructor(
    private readonly excludeKeyFunc: ExcludeKeyType<T, K>,
    private readonly compareFunc: CompareType<K>
  ) {
    this.canSwap = getCanSwapFunc(excludeKeyFunc, compareFunc);
  }

  sort(data: T[], direction: SortDirection): T[] {
    return this.innerSort(data, 0, data.length - 1, direction);
  }

  private partition(data: T[], leftIndex: number, rightIndex: number, direction: SortDirection): number {
    let index = leftIndex;

    for (let k = leftIndex; k <= rightIndex; k++) {
      if (!this.canSwap(data[k], data[rightIndex], direction)) {
        swap(data, index, k);

        index++;
      }
    }

    return index - 1;
  }

  private innerSort(data: T[], leftIndex: number, rightIndex: number, direction: SortDirection): T[] {
    if (leftIndex >= rightIndex) {
      return data;
    }

    const c = this.partition(data, leftIndex, rightIndex, direction);
    this.innerSort(data, leftIndex, c - 1, direction);
    this.innerSort(data, c + 1, rightIndex, direction);

    return data;
  }
}
