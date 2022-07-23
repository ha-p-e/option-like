# option-like

Experiment to provide an option like experience when working with `null` and `undefined` without introducing new types or changing type signatures for easier integration.

### Example

```ts
const mayAdd1: (x: number) => number | undefined;
const mayMul2: (x: number) => number | undefined;
```

**vanilla ts**:

```ts
const calc = (n: number) => {
    const x = mayAdd1(n);
    if (x) {
        const y = mayMul2(x);
        if (y) {
            const z = y / 3;
            if (z > 4) return z;
        }
    }
    return 0;
};
```

**option-like**:

```ts
const calc = (n: number) =>
    pipe(
        mayAdd1(n),
        chain(mayMul2),
        map(x => x / 3),
        filter(x => x > 4),
        getOrElse(() => 0)
    );
```
