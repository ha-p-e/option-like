import {
    contains,
    exists,
    filter,
    filterNot,
    chain,
    flatten,
    getOrElse,
    ifNone,
    ifSome,
    isNone,
    isSome,
    map,
    match,
    Option,
    orElse,
    reduce,
    tap,
    toArray,
    unzip,
    when,
    zip,
} from "../src/option";
import { pipe } from "../src/pipe";

describe("Option", () => {
    describe("chain", () =>
        it.each<{ arg: Option<number>; expected: Option<number> }>([
            { arg: 1, expected: 2 },
            { arg: undefined, expected: undefined },
            { arg: null, expected: null },
        ])("chain(x => x + 1)($arg) === $expected", ({ arg, expected }) =>
            expect(
                pipe(
                    arg,
                    chain(x => x + 1)
                )
            ).toStrictEqual(expected)
        ));

    describe("contains", () =>
        it.each<{ arg: Option<number>; expected: boolean }>([
            { arg: 1, expected: true },
            { arg: 2, expected: false },
            { arg: undefined, expected: false },
            { arg: null, expected: false },
        ])("contains(1)($arg) === $expected", ({ arg, expected }) =>
            expect(pipe(arg, contains(1))).toStrictEqual(expected)
        ));

    describe("exists", () =>
        it.each<{ arg: Option<number>; expected: boolean }>([
            { arg: 1, expected: true },
            { arg: 2, expected: false },
            { arg: undefined, expected: false },
            { arg: null, expected: false },
        ])("exists(x => x === 1)($arg) === $expected", ({ arg, expected }) =>
            expect(
                pipe(
                    arg,
                    exists(x => x === 1)
                )
            ).toStrictEqual(expected)
        ));

    describe("filter", () =>
        it.each<{ arg: Option<number>; expected: Option<number> }>([
            { arg: 1, expected: 1 },
            { arg: 2, expected: undefined },
            { arg: undefined, expected: undefined },
            { arg: null, expected: null },
        ])("filter(x => x === 1)($arg) === $expected", ({ arg, expected }) =>
            expect(
                pipe(
                    arg,
                    filter(x => x === 1)
                )
            ).toStrictEqual(expected)
        ));

    describe("filterNot", () =>
        it.each<{ arg: Option<number>; expected: Option<number> }>([
            { arg: 1, expected: undefined },
            { arg: 2, expected: 2 },
            { arg: undefined, expected: undefined },
            { arg: null, expected: null },
        ])("filterNot(x => x === 1)($arg) === $expected", ({ arg, expected }) =>
            expect(
                pipe(
                    arg,
                    filterNot(x => x === 1)
                )
            ).toStrictEqual(expected)
        ));

    describe("flatten", () =>
        it.each<{ arg: Option<Option<number>>; expected: Option<number> }>([
            { arg: 1, expected: 1 },
            { arg: undefined, expected: undefined },
            { arg: null, expected: null },
        ])("flatten($arg) === $expected", ({ arg, expected }) =>
            expect(flatten(arg)).toStrictEqual(expected)
        ));

    describe("reduce", () =>
        it.each<{ arg: Option<number>; expected: Option<number> }>([
            { arg: 1, expected: 2 },
            { arg: undefined, expected: 1 },
            { arg: null, expected: 1 },
        ])(
            "reduce(1, (acc, c) => acc + c)($arg) === $expected",
            ({ arg, expected }) =>
                expect(
                    pipe(
                        arg,
                        reduce(1, (acc, c) => acc + c)
                    )
                ).toStrictEqual(expected)
        ));

    describe("getOrElse", () =>
        it.each<{ arg: Option<number>; expected: Option<number> }>([
            { arg: 1, expected: 1 },
            { arg: undefined, expected: 2 },
            { arg: null, expected: 2 },
        ])("getOrElse(() => 2)($arg) === $expected", ({ arg, expected }) =>
            expect(
                pipe(
                    arg,
                    getOrElse(() => 2)
                )
            ).toStrictEqual(expected)
        ));

    describe("ifNone", () =>
        it.each<{ arg: Option<number>; expected: number }>([
            { arg: 1, expected: 0 },
            { arg: undefined, expected: 1 },
            { arg: null, expected: 1 },
        ])(
            "ifNone(() => action())($arg) calls action $expected times",
            ({ arg, expected }) => {
                const action = jest.fn();
                pipe(
                    arg,
                    ifNone(() => action())
                );
                expect(action).toHaveBeenCalledTimes(expected);
            }
        ));

    describe("ifSome", () =>
        it.each<{ arg: Option<number>; expected: number }>([
            { arg: 1, expected: 1 },
            { arg: undefined, expected: 0 },
            { arg: null, expected: 0 },
        ])(
            "ifSome(() => action())($arg) calls action $expected times",
            ({ arg, expected }) => {
                const action = jest.fn();
                pipe(
                    arg,
                    ifSome(() => action())
                );
                expect(action).toHaveBeenCalledTimes(expected);
            }
        ));

    describe("isNone", () =>
        it.each<{ arg: Option<number>; expected: boolean }>([
            { arg: 1, expected: false },
            { arg: undefined, expected: true },
            { arg: null, expected: true },
        ])("isNone($arg) === $expected", ({ arg, expected }) =>
            expect(isNone(arg)).toStrictEqual(expected)
        ));

    describe("isSome", () =>
        it.each<{ arg: Option<number>; expected: boolean }>([
            { arg: 1, expected: true },
            { arg: undefined, expected: false },
            { arg: null, expected: false },
        ])("isSome($arg) === $expected", ({ arg, expected }) =>
            expect(isSome(arg)).toStrictEqual(expected)
        ));

    describe("map", () =>
        it.each<{ arg: Option<number>; expected: Option<number> }>([
            { arg: 1, expected: 2 },
            { arg: undefined, expected: undefined },
            { arg: null, expected: null },
        ])("map(x => x + 1)($arg) === $expected", ({ arg, expected }) =>
            expect(
                pipe(
                    arg,
                    map(x => x + 1)
                )
            ).toStrictEqual(expected)
        ));

    describe("match", () =>
        it.each<{ arg: Option<number>; expected: Option<number> }>([
            { arg: 1, expected: 2 },
            { arg: undefined, expected: 0 },
            { arg: null, expected: 0 },
        ])(
            "match(x => x + 1, () => 0)($arg) === $expected",
            ({ arg, expected }) =>
                expect(
                    pipe(
                        arg,
                        match({
                            some: x => x + 1,
                            none: () => 0,
                        })
                    )
                ).toStrictEqual(expected)
        ));

    describe("orElse", () =>
        it.each<{ arg: Option<number>; expected: Option<number> }>([
            { arg: 1, expected: 1 },
            { arg: undefined, expected: 2 },
            { arg: null, expected: 2 },
        ])("orElse(() => 2)($arg) === $expected", ({ arg, expected }) =>
            expect(
                pipe(
                    arg,
                    orElse(() => 2)
                )
            ).toStrictEqual(expected)
        ));

    describe("toArray", () =>
        it.each<{ arg: Option<number>; expected: Array<number> }>([
            { arg: 1, expected: [1] },
            { arg: undefined, expected: [] },
            { arg: null, expected: [] },
        ])("toArray($arg) === $expected", ({ arg, expected }) =>
            expect(toArray(arg)).toStrictEqual(expected)
        ));

    describe("tap", () =>
        it.each<{ arg: Option<number>; expected: number }>([
            { arg: 1, expected: 1 },
            { arg: undefined, expected: 0 },
            { arg: null, expected: 0 },
        ])("tap(() => action())($arg) === $arg", ({ arg, expected }) => {
            const action = jest.fn();
            expect(
                pipe(
                    arg,
                    tap(() => action())
                )
            ).toStrictEqual(arg);
            expect(action).toHaveBeenCalledTimes(expected);
        }));

    describe("unzip", () =>
        it.each<{
            arg: Option<[number, number]>;
            expected: [Option<number>, Option<number>];
        }>([
            { arg: [1, 2], expected: [1, 2] },
            { arg: undefined, expected: [undefined, undefined] },
            { arg: null, expected: [null, null] },
        ])("unzip($arg) === $expected", ({ arg, expected }) =>
            expect(unzip(arg)).toStrictEqual(expected)
        ));

    describe("when", () =>
        it.each<{
            arg: boolean;
            expected: Option<number>;
        }>([
            { arg: true, expected: 1 },
            { arg: false, expected: undefined },
        ])("when($arg)(() => 1) === $expected", ({ arg, expected }) =>
            expect(when(arg)(() => 1)).toStrictEqual(expected)
        ));

    describe("zip", () => {
        it.each<{
            arg: [
                Option<number>,
                Option<number>,
                Option<number>,
                Option<number>,
                Option<number>
            ];
            expected: Option<[number, number, number, number, number]>;
        }>([
            { arg: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
            { arg: [1, 2, 3, 4, undefined], expected: undefined },
            { arg: [1, 2, 3, undefined, 5], expected: undefined },
            { arg: [1, 2, undefined, 4, 5], expected: undefined },
            { arg: [1, undefined, 3, 4, 5], expected: undefined },
            { arg: [undefined, 2, 3, 4, 5], expected: undefined },
            { arg: [1, 2, 3, 4, null], expected: undefined },
            { arg: [1, 2, 3, null, 5], expected: undefined },
            { arg: [1, 2, null, 4, 5], expected: undefined },
            { arg: [1, null, 3, 4, 5], expected: undefined },
            { arg: [null, 2, 3, 4, 5], expected: undefined },
        ])("zip($arg) === $expected", ({ arg, expected }) =>
            expect(zip(...arg)).toStrictEqual(expected)
        );
    });
});
