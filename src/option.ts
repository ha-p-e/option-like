export type None = undefined | null;
export type Option<A> = A | None;

export const None = <A>(value?: None): Option<A> => value;
export const Some = <A>(value: A): Option<A> => value;

export const chain =
    <A, B>(fn: (value: A) => Option<B>) =>
    (option: Option<A>): Option<B> =>
        isSome(option) ? fn(option) : option;

export const contains =
    <A>(value: A) =>
    (option: Option<A>) =>
        isSome(option) ? option === value : false;

export const exists =
    <A>(pred: (value: A) => boolean) =>
    (option: Option<A>) =>
        isSome(option) ? pred(option) : false;

export const filter =
    <A>(pred: (value: A) => boolean) =>
    (option: Option<A>): Option<A> =>
        isSome(option) ? (pred(option) ? option : undefined) : option;

export const filterNot =
    <A>(pred: (value: A) => boolean) =>
    (option: Option<A>): Option<A> =>
        isSome(option) ? (!pred(option) ? option : undefined) : option;

export const flatten = <A>(optOpt: Option<Option<A>>): Option<A> => optOpt;

export const reduce =
    <A, B>(seed: B, fn: (acc: B, value: A) => B) =>
    (option: Option<A>): B =>
        isSome(option) ? fn(seed, option) : seed;

export const getOrElse =
    <A>(other: () => A) =>
    (option: Option<A>): A =>
        isSome(option) ? option : other();

export const ifNone =
    <A>(action: () => void) =>
    (option: Option<A>) => {
        if (isNone(option)) action();
    };

export const ifSome =
    <A>(action: (a: A) => void) =>
    (option: Option<A>) => {
        if (isSome(option)) action(option);
    };

export const isNone = <A>(option: Option<A>): option is None => !isSome(option);

export const isSome = <A>(option: Option<A>): option is A => option != null;

export const map =
    <A, B>(fn: (value: A) => B) =>
    (option: Option<A>): Option<B> =>
        isSome(option) ? fn(option) : option;

export const match =
    <A, B>(pattern: { some: (value: A) => B; none: () => B }) =>
    (option: Option<A>) =>
        isSome(option) ? pattern.some(option) : pattern.none();

export const orElse =
    <A>(other: () => Option<A>) =>
    (option: Option<A>): Option<A> =>
        isSome(option) ? option : other();

export const toArray = <A>(option: Option<A>) =>
    isSome(option) ? [option] : [];

export const tap =
    <A>(action: (value: A) => void) =>
    (option: Option<A>) => {
        if (isSome(option)) action(option);
        return option;
    };

export function unzip<A, B>(option: Option<[A, B]>): [Option<A>, Option<B>] {
    return isSome(option) ? option : [option, option];
}

export const when =
    <A>(cond: boolean) =>
    (option: () => Option<A>): Option<A> =>
        cond ? option() : undefined;

export function zip<A, B>(a: Option<A>, b: Option<B>): Option<[A, B]>;
export function zip<A, B, C>(
    a: Option<A>,
    b: Option<B>,
    c: Option<C>
): Option<[A, B, C]>;
export function zip<A, B, C, D>(
    a: Option<A>,
    b: Option<B>,
    c: Option<C>,
    d: Option<D>
): Option<[A, B, C, D]>;
export function zip<A, B, C, D, E>(
    a: Option<A>,
    b: Option<B>,
    c: Option<C>,
    d: Option<D>,
    e: Option<E>
): Option<[A, B, C, D]>;
export function zip<A, B, C, D, E>(
    _a: Option<A>,
    _b?: Option<B>,
    _c?: Option<C>,
    _d?: Option<D>,
    _e?: Option<E>
): unknown {
    const args = [...arguments];
    return args.every(isSome) ? args : undefined;
}
