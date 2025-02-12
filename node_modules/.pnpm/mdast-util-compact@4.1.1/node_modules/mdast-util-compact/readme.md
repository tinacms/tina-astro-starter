# mdast-util-compact

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[mdast][] utility to make trees compact by collapsing adjacent text nodes and
blockquotes.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`compact(tree)`](#compacttree)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a utility that lets you make a tree, after changes, more similar
to how it would be parsed.

## When should I use this?

Probably never!
You should try and keep your trees clean yourself.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+ and 16.0+), install with [npm][]:

```sh
npm install mdast-util-compact
```

In Deno with [`esm.sh`][esmsh]:

```js
import {compact} from 'https://esm.sh/mdast-util-compact@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {compact} from 'https://esm.sh/mdast-util-compact@4?bundle'
</script>
```

## Use

```js
import {u} from 'unist-builder'
import {compact} from 'mdast-util-compact'

const tree = u('strong', [u('text', 'alpha'), u('text', ' '), u('text', 'bravo')])

compact(tree)

console.log(tree)
```

Yields:

```js
{
  type: 'strong',
  children: [ { type: 'text', value: 'alpha bravo' } ]
}
```

## API

This package exports the identifier [`compact`][api-compact].
There is no default export.

### `compact(tree)`

Make an mdast tree compact by merging adjacent text nodes and block quotes.

###### Parameters

*   `tree` ([`Node`][node])
    — tree to change

###### Returns

The given `tree` ([`Node`][node]).

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

Use of `mdast-util-compact` does not involve **[hast][]** or user content so
there are no openings for [cross-site scripting (XSS)][xss] attacks.

## Related

*   [`mdast-squeeze-paragraphs`](https://github.com/syntax-tree/mdast-squeeze-paragraphs)
    — remove empty paragraphs

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/mdast-util-compact/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/mdast-util-compact/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-compact.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-compact

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-compact.svg

[downloads]: https://www.npmjs.com/package/mdast-util-compact

[size-badge]: https://img.shields.io/bundlephobia/minzip/mdast-util-compact.svg

[size]: https://bundlephobia.com/result?p=mdast-util-compact

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[mdast]: https://github.com/syntax-tree/mdast

[node]: https://github.com/syntax-tree/mdast#node

[hast]: https://github.com/syntax-tree/hast

[api-compact]: #compacttree
