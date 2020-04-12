import { SortDirection } from '../const/sort-direction.enum';

export interface ISortStrategy<T> {
  sort(data: T[], direction: SortDirection): T[];
}
