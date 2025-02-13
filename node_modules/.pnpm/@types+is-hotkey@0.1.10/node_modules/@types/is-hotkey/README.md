# Installation
> `npm install --save @types/is-hotkey`

# Summary
This package contains type definitions for is-hotkey (https://github.com/ianstormtaylor/is-hotkey#readme).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/is-hotkey.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/is-hotkey/index.d.ts)
````ts
export interface KeyboardEventLike {
    key: string;
    which: number;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
}

export interface HotKeyOptions {
    byKey: boolean;
}

export interface HotKey {
    which?: number | undefined;
    key?: string | undefined;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
}

/**
 * Is hotkey?
 */
export function isHotkey(
    hotkey: string | readonly string[],
    options?: HotKeyOptions,
): (event: KeyboardEventLike) => boolean;

export function isHotkey(hotkey: string | readonly string[], event: KeyboardEventLike): boolean;

export function isHotkey(
    hotkey: string | readonly string[],
    options: HotKeyOptions,
    event: KeyboardEventLike,
): boolean;

export function isCodeHotkey(hotkey: string | readonly string[]): (event: KeyboardEventLike) => boolean;
export function isCodeHotkey(hotkey: string | readonly string[], event: KeyboardEventLike): boolean;

export function isKeyHotkey(hotkey: string | readonly string[]): (event: KeyboardEventLike) => boolean;
export function isKeyHotkey(hotkey: string | readonly string[], event: KeyboardEventLike): boolean;

/**
 * Parse.
 */
export function parseHotkey(hotkey: string, options?: HotKeyOptions): HotKey;

/**
 * Compare.
 */
export function compareHotkey(object: HotKey, event: KeyboardEventLike): boolean;

/**
 * Utils.
 */
export function toKeyCode(name: string): number;
export function toKeyName(name: string): string;

/**
 * Export.
 */
export default isHotkey;

````

### Additional Details
 * Last updated: Mon, 20 Nov 2023 23:36:24 GMT
 * Dependencies: none

# Credits
These definitions were written by [Alex Kondratyuk](https://github.com/lynxtaa).
