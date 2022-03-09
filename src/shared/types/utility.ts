export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

export type Nullable<T> = T | null;

export type Maybe<T> = T | undefined;

export type Defaultize<TSource, TKeys extends keyof TSource> = TSource & { [P in TKeys]-?: TSource[P] };
