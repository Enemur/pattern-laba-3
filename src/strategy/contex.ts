import { ISortStrategy } from '../abstract/sort-strategy.interface';
import { SortDirection } from '../const/sort-direction.enum';

export class Context<T> {
  private strategy: ISortStrategy<T> | undefined;

  setStrategy(strategy: ISortStrategy<T>) {
    this.strategy = strategy;
  }

  sort(data: T[], direction: SortDirection): T[] {
    if (!this.strategy) {
      throw new Error('Strategy did not set');
    }

    return this.strategy.sort(data, direction);
  }
}
