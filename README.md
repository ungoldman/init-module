# init-module

> Add some sugar to the npm init command.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/module-init.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/module-init
[travis-image]: https://img.shields.io/travis/ngoldman/module-init.svg?style=flat-square
[travis-url]: https://travis-ci.org/ngoldman/module-init
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://standardjs.com/

A successor to [`module-init`](https://github.com/ngoldman/module-init).

**work in progress**

This is still very experimental! Use at your own risk. Feedback and pull requests welcome.

## Install

```
npm install init-module -g
npm set init-module $(init-module --path)
```

## Usage

```
npm init
```

Protip: take advantage of [`.npmconfig`](https://docs.npmjs.com/misc/config#init-module) to set config variables for more handy defaults. This module takes advantage of [npm set init-module](https://docs.npmjs.com/misc/config#init-module).

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Ideas

- Expose all standard `package.json` as settable and editable directly via `npm init`.
- Run extra commands with a temporary postinstall script. Hacky and potentially iffy.

## License

[ISC](LICENSE)
