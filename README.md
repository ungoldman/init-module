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
```

## Usage

`npm` allows you to configure an [init module](https://docs.npmjs.com/misc/config#init-module) that will be loaded by the npm init command. This is how `init-module` is intended to be used.

```
npm set init-module $(init-module --path)
```

Once you've set the above config property, `init-module` will simply extend the default `npm init` command.

```
npm init
```

`npm init` allows you to configure a few things and works from a few defaults. This module is meant to take it a bit further, adding more defaults to `npm config` that will autopopulate when you run `npm init -y`, and allowing you to use `npm init` as a `package.json` editor at any point.

### Config for `npm init`

These defaults are already available to `npm init` without `init-module`.

#### Author Name

- Default: ""
- Type: String

The value `npm init` should use by default for the package author's name.

```
npm set init-author-name="Your Name"
```

#### Author Email

- Default: ""
- Type: String

The value `npm init` should use by default for the package author's email.

```
npm set init-author-name="your@email.com"
```

#### Author URL

- Default: ""
- Type: String

The value `npm init` should use by default for the package author's homepage.

```
npm set init-author-url="http://yoursite.com"
```

#### License

- Default: "ISC"
- Type: String

The value `npm init` should use by default for the package license.

```
npm set init-license="BSD-2-Clause"
```

The license name must be a valid SPDX license expression. See https://spdx.org/licenses for more info.

#### Version

- Default: "1.0.0"
- Type: semver

The value that `npm init` should use by default for the package version number, if not already set in `package.json`.

```
npm set init-version="1.0.0"
```

### Config for `init-module`

These defaults require `init-module` in order to be available in `npm init`.

*Coming soon...*

#### Ideas

- default & editable scripts (test, lint, other)
- default & editable dev dependencies (e.g. tape, standard)

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Ideas

- Run extra commands with a temporary postinstall script. Hacky and potentially iffy.

## License

[ISC](LICENSE)
