export function getOr<T>(defaultValue: T): (maybe: T | undefined) => T {
  return (maybe: T | undefined): T => maybe || defaultValue
}

export const getOrElse = <T>(maybe: T | undefined, defaultValue: T): T => getOr(defaultValue)(maybe)
