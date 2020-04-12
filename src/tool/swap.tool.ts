export function swap<T>(data: T[], firstIndex: number, secondIndex: number): void {
  const tmp = data[firstIndex];
  data[firstIndex] = data[secondIndex];
  data[secondIndex] = tmp;
}
