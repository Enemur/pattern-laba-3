import { ExcludeKeyType } from '../type/exclude-key.type';
import { CompareType } from '../type/compare.type';
import { SortDirection } from '../const/sort-direction.enum';
import { CanSwapType } from '../type/can-swap.type';

export function getCanSwapFunc<T, K>(exclude: ExcludeKeyType<T, K>, comparer: CompareType<K>): CanSwapType<T> {
  return (a: T, b: T, direction: SortDirection) => {
    const aKey = exclude(a);
    const bKey = exclude(b);

    return (comparer(aKey, bKey) * direction) > 0;
  };
}
