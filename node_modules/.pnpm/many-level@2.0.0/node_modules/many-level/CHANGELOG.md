# Changelog

## [2.0.0] - 2022-07-02

_If you are upgrading: please see [`UPGRADING.md`](UPGRADING.md)._

### Changed

- **Breaking:** replace `duplexify` and friends with `readable-stream` v4 ([#7](https://github.com/Level/many-level/issues/7)) ([`308bde7`](https://github.com/Level/many-level/commit/308bde7)) (Robert Nagy, Vincent Weevers)
- Bump `protocol-buffers` from 4 to 5 ([#3](https://github.com/Level/many-level/issues/3)) ([`c2832d5`](https://github.com/Level/many-level/commit/c2832d5)) (Vincent Weevers).

## [1.0.1] - 2022-03-21

### Fixed

- On close, abort requests made before `forward()` ([`f7dcb5e`](https://github.com/Level/many-level/commit/f7dcb5e)) (Vincent Weevers).

## [1.0.0] - 2022-03-20

_:seedling: Initial release. If you are upgrading from `multileveldown`: please see [`UPGRADING.md`](./UPGRADING.md)._

[2.0.0]: https://github.com/Level/many-level/releases/tag/v2.0.0

[1.0.1]: https://github.com/Level/many-level/releases/tag/v1.0.1

[1.0.0]: https://github.com/Level/many-level/releases/tag/v1.0.0
