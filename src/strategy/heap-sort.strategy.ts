import { ISortStrategy } from '../abstract/sort-strategy.interface';
import { SortDirection } from '../const/sort-direction.enum';
import { ExcludeKeyType } from '../type/exclude-key.type';
import { CompareType } from '../type/compare.type';
import { CanSwapType } from '../type/can-swap.type';
import { getCanSwapFunc } from '../tool/can-swap.tool';
import { swap } from '../tool/swap.tool';

export class HeapSortStrategy<T, K> implements ISortStrategy<T> {
  private readonly canSwap: CanSwapType<T>;

  constructor(
    private readonly excludeKeyFunc: ExcludeKeyType<T, K>,
    private readonly compareFunc: CompareType<K>
  ) {
    this.canSwap = getCanSwapFunc(excludeKeyFunc, compareFunc);
  }

  sort(data: T[], direction: SortDirection): T[] {
    const N = data.length;

    for (let j = 0; j < N; j++) {
      for (let i = Math.ceil(N / 2) - 1 - Math.ceil(j / 2); i > -1; i--) {
        if (2 * i + 2 <= N - 1 - j) {
          if (this.canSwap(data[2 * i + 1], data[2 * i + 2], direction)) {
            if (!this.canSwap(data[i],  data[2 * i + 1], direction)) {
              swap(data, i, 2 * i + 1);
            }
          }
          else {
            if (!this.canSwap(data[i],  data[2 * i + 2], direction)) {
              swap(data, i, 2 * i + 2);
            }
          }
        } else  {
          if (2 * i + 1 <= N - 1 - j) {
            if (!this.canSwap(data[i],  data[2 * i + 1], direction)) {
              swap(data, i, 2 * i + 1);
            }
          }
        }
      }
      swap(data,0, N - 1 - j);
    }

    return data;
  }
}
