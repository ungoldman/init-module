# init-module

> Add some sugar to the npm init command.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/init-module.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/init-module
[travis-image]: https://img.shields.io/travis/ngoldman/init-module.svg?style=flat-square
[travis-url]: https://travis-ci.org/ngoldman/init-module

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

Protip: this module uses [npm config set init-module](https://docs.npmjs.com/misc/config#init-module) to override `npm init` defaults. Take advantage of [`npm config`](https://docs.npmjs.com/misc/config) to set even more config variables for more handy defaults.

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Ideas

- Expose all standard `package.json` as settable and editable directly via `npm init`.
- Run extra commands with a temporary postinstall script. Hacky and potentially iffy.

## License

[ISC](LICENSE)
