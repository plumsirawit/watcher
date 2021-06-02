export function waitSequential<T>(
  thunks: ((s: T) => Promise<T>)[],
  initialValue: Promise<T>,
  timeBetween = 1000,
): Promise<T> {
  const delay = (time: number) =>
    function <V>(data: V) {
      return new Promise<V>((res) => setTimeout(() => res(data), time));
    };
  return thunks.reduce(
    (pre, cur) => pre.then(delay(timeBetween)).then(cur),
    initialValue,
  );
}
