/**
 * Overwrite certain properties of a type, while keeping others. Thanks to
 * https://stackoverflow.com/a/46941824!
 */
type Overwrite<T1, T2> = Pick<T1, Exclude<keyof T1, keyof T2>> & T2;