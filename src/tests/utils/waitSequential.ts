export function waitSequential<T>(
  thunks: ((s: T) => Promise<T>)[],
  initialValue: Promise<T>,
): Promise<T> {
  const delay = (time: number) =>
    function <V>(data: V) {
      return new Promise<V>((res) => setTimeout(() => res(data), time));
    };
  return thunks.reduce(
    (pre, cur) => pre.then(delay(250)).then(cur),
    initialValue,
  );
}
