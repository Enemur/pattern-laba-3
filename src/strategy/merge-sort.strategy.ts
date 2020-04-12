import { ISortStrategy } from '../abstract/sort-strategy.interface';
import { SortDirection } from '../const/sort-direction.enum';
import { ExcludeKeyType } from '../type/exclude-key.type';
import { CompareType } from '../type/compare.type';
import { CanSwapType } from '../type/can-swap.type';
import { getCanSwapFunc } from '../tool/can-swap.tool';

export class MergeSortStrategy<T, K> implements ISortStrategy<T> {
  private readonly canSwap: CanSwapType<T>;

  constructor(
    private readonly excludeKeyFunc: ExcludeKeyType<T, K>,
    private readonly compareFunc: CompareType<K>
  ) {
    this.canSwap = getCanSwapFunc(excludeKeyFunc, compareFunc);
  }

  sort(data: T[], direction: SortDirection): T[] {
    if (data.length == 1) {
      return data;
    }

    const middle = Math.ceil(data.length / 2);
    const left = this.sort(data.slice(0, middle), direction);
    const right = this.sort(data.slice(middle, data.length), direction);

    return this.merge(left, right, direction);
  }

  private merge(left: T[], right: T[], direction: SortDirection): T[] {
    let a: number = 0;
    let b: number = 0;
    const merged = [];

    for (let i = 0; i < left.length + right.length; i++) {
      if (b < right.length && a < left.length) {
        if (this.canSwap(left[a], right[b], direction)) {
          merged.push(right[b++]);
        } else {
          merged.push(left[a++]);
        }
      } else {
        if (b < right.length) {
          merged.push(right[b++]);
        } else {
          merged.push(left[a++]);
        }
      }
    }

    return merged;
  }
}
