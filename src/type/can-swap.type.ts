import { SortDirection } from '../const/sort-direction.enum';

export type CanSwapType<T> = (a: T, b: T, direction: SortDirection) => boolean;
