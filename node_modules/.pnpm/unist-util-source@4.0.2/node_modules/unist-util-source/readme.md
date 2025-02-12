# unist-util-source

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[unist][] utility to get the source code of a node or position.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`source(value, file)`](#sourcevalue-file)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This is a tiny utility that lets you get the source code of a node or position.

## When should I use this?

This is super tiny utility useful when you want to display the source code
of something in a file.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+ and 16.0+), install with [npm][]:

```sh
npm install unist-util-source
```

In Deno with [`esm.sh`][esmsh]:

```js
import {source} from 'https://esm.sh/unist-util-source@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {source} from 'https://esm.sh/unist-util-source@4?bundle'
</script>
```

## Use

Say our document `example.md` contains:

```markdown
> + **[Hello](./example)**
>   world.
```

…and our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {source} from 'unist-util-source'

const file = await read('example.md')
const tree = fromMarkdown(String(file))

const strong = tree.children[0].children[0].children[0].children[0].children[0]
console.log(source(strong, file))
```

…now running `node example.js` yields:

```markdown
**[Hello](./example)**
```

## API

This package exports the identifier [`source`][source].
There is no default export.

### `source(value, file)`

Get the source of a node or at a position.

###### Parameters

*   `value` ([`Node`][node] or [`Position`][position])
    — value to get
*   `file` ([`VFile`][vfile] or `string`)
    — file in which `value` exists

###### Returns

Source of `value` in `doc`, if available (`string` or `null`).

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/unist-util-source/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/unist-util-source/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-source.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-source

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-source.svg

[downloads]: https://www.npmjs.com/package/unist-util-source

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-source.svg

[size]: https://bundlephobia.com/result?p=unist-util-source

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

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[position]: https://github.com/syntax-tree/unist#position

[vfile]: https://github.com/vfile/vfile

[source]: #sourcevalue-file
