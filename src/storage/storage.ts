import { IPrototype } from '../abstract/prototype.interface';

export class Storage<T> implements IPrototype<Storage<T>> {
  constructor(
    private readonly array: T[],
  ) { }

  clone(): Storage<T> {
    return new Storage<T>(Array.from(this.array));
  }

  getArray(): T[] {
    return this.array;
  }
}
