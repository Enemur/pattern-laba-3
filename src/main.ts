import { Context } from './strategy/contex';
import { BubbleSortStrategy } from './strategy/bubble-sort.strategy';
import { ISortStrategy } from './abstract/sort-strategy.interface';
import { SortDirection } from './const/sort-direction.enum';
import { SortStrategy } from './const/sort-strategy.enum';
import { HeapSortStrategy } from './strategy/heap-sort.strategy';
import { InsertSortStrategy } from './strategy/insert-sort.strategy';
import { MergeSortStrategy } from './strategy/merge-sort.strategy';
import { SelectionSortStrategy } from './strategy/selection-sort.strategy';
import { QuickSortStrategy } from './strategy/quick-sort.strategy';
import { Storage } from './storage/storage';

const exclude = (n: number) => n;
const comparer = (left: number, right: number) => left - right;

const strategies: Record<SortStrategy, ISortStrategy<number>> = {
  [ SortStrategy.BubbleSort ]: new BubbleSortStrategy(exclude, comparer),
  [ SortStrategy.HeapSort ]: new HeapSortStrategy(exclude, comparer),
  [ SortStrategy.InsertSort ]: new InsertSortStrategy(exclude, comparer),
  [ SortStrategy.MergeSort ]: new MergeSortStrategy(exclude, comparer),
  [ SortStrategy.QuickSort ]: new QuickSortStrategy(exclude, comparer),
  [ SortStrategy.SelectionSort ]: new SelectionSortStrategy(exclude, comparer),
};

function about() {
  console.log('Pavel Ametov');
  console.log('Task #3');
  console.log('8-T3O-402B-16\n');
}

function main() {
  about();

  const context = new Context();

  const storage = new Storage([1, 3, 5, -1, 7, 5, 8, 3]);

  console.log(`Original: ${storage.getArray()}\n`);

  for (const name of Object.values(SortStrategy)) {
    const strategy = strategies[name];

    context.setStrategy(strategy);

    console.log(`${name}: `);

    const ascSorted = context.sort(storage.clone().getArray(), SortDirection.ASC);
    console.log(`ASC: ${ascSorted}`);

    const descSorted = context.sort(storage.clone().getArray(), SortDirection.DESC);
    console.log(`DESC: ${descSorted}\n`);
  }
}

main();
