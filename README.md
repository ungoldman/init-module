# init-module

> Add some sugar to the npm init command.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![style][style-image]][style-url]

[npm-image]: https://img.shields.io/npm/v/init-module.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/init-module
[travis-image]: https://img.shields.io/travis/ungoldman/init-module.svg?style=flat-square
[travis-url]: https://travis-ci.org/ungoldman/init-module
[style-image]: https://img.shields.io/badge/code%20style-unstyled-brightgreen.svg?style=flat-square
[style-url]: https://github.com/mapbox/eslint-config-unstyled

`npm init` allows you to configure a few things and works from a few defaults. `init-module` is meant to take it a bit further, making all `package.json` properties editable, adding more defaults to `npm config` that will autopopulate when you run `npm init -y`, and allowing you to use `npm init` as a `package.json` editor.

## Install

```
npm i -g init-module
```

## Usage

`npm` allows you to configure an [`init module`](https://docs.npmjs.com/misc/config#init-module) that will be loaded by the `npm init` command to override the default prompts. The `init-module` program is intended to be used in this manner.

```
npm set init-module $(init-module --path)
```

Once you've set the above config property, `init-module` will simply extend the default `npm init` command.

```
npm init
```

### Configuration (`npm init`)

These defaults are already available to `npm init` without `init-module`.

#### Author Name: `init-author-name`

- Default: ""
- Type: String

The value `npm init` should use by default for the package author's name.

```
npm set init-author-name="Your Name"
```

#### Author Email: `init-author-email`

- Default: ""
- Type: String

The value `npm init` should use by default for the package author's email.

```
npm set init-author-name="your@email.com"
```

#### Author URL: `init-author-url`

- Default: ""
- Type: String

The value `npm init` should use by default for the package author's homepage.

```
npm set init-author-url="http://yoursite.com"
```

#### License `init-license`

- Default: "ISC"
- Type: String

The value `npm init` should use by default for the package license.

```
npm set init-license="BSD-2-Clause"
```

The license name must be a valid SPDX license expression. See https://spdx.org/licenses for more info.

#### Version `init-version`

- Default: "1.0.0"
- Type: semver

The value that `npm init` should use by default for the package version number, if not already set in `package.json`.

```
npm set init-version="1.0.0"
```

### Configuration (`init-module`)

These defaults require `init-module` in order to be available in `npm init`.

#### Test Script: `init-scripts-start`

- Default: null
- Type: String

The command to use when running `npm start`.

```
npm set init-scripts-start="node ."
```

#### Test Script: `init-scripts-test`

- Default: 'echo "Error: no test specified" && exit 1'
- Type: String

The command to use when running `npm test`.

```
npm set init-scripts-test="standard"
```

## Example

Here's an example of the `init-*` contents of my global `.npmrc` file.

```
init-author-email = "ungoldman@gmail.com"
init-author-name = "Nate Goldman"
init-author-url = "http://ungoldman.com/"
init-license = "ISC"
init-module = "/Users/ng/dev/github/init-module/init-module.js"
init-scripts-start = "node ."
init-scripts-test = "standard"
init-version = "1.0.0"
```

All configuration above can be set with `npm set`, which is just a shortcut for `npm config set`. You can also edit your `.npmrc` manually if you prefer (`npm config edit` will open your global `.npmrc` file with your default editor).

Running `npm init` in an empty directory with the above configuration, I get the following:

```
~/my-module $ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (my-module)
version: (1.0.0-alpha)
description: A fine module indeed.
entry point: (index.js)
test command: (standard)
start command: (node .)
git repository: https://github.com/ungoldman/my-module.git
keywords: my, module
author name: (Nate Goldman)
author email: (ungoldman@gmail.com)
author url: (http://ungoldman.com)
license: (ISC)
private: (false) true
About to write to /Users/ng/dev/github/init-module/my-module/package.json:

{
  "name": "my-module",
  "version": "1.0.0-alpha",
  "description": "A fine module indeed.",
  "main": "index.js",
  "scripts": {
    "start": "node .",
    "test": "standard"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ungoldman/my-module.git"
  },
  "keywords": [
    "my",
    "module"
  ],
  "author": "Nate Goldman <ungoldman@gmail.com> (http://ungoldman.com)",
  "license": "ISC",
  "private": true,
  "bugs": {
    "url": "https://github.com/ungoldman/my-module/issues"
  },
  "homepage": "https://github.com/ungoldman/my-module#readme"
}


Is this ok? (yes)
```

Note that with `init-module`, running `npm init` again will allow you to edit all of the above properties, unlike the stock `npm init` behavior.

```
name: (my-module)
version: (1.0.0-alpha)
description: (A fine module indeed.)
entry point: (index.js)
test command: (standard && tape test/*.js | tap-spec)
git repository: (git+https://github.com/ungoldman/my-module.git)
keywords: (my, module)
author name: (Nate Goldman)
author email: (ungoldman@gmail.com)
author url: (http://ungoldman.com)
license: (ISC)
private: (true)
```

### The "yes" option (force)

Running `npm init -y` in an empty directory with the example configuration above yields the following `package.json`:

```json
{
  "name": "my-module",
  "version": "1.0.0-alpha",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "standard && tape test/*.js | tap-spec"
  },
  "author": "Nate Goldman <ungoldman@gmail.com> (http://ungoldman.com)",
  "license": "ISC"
}
```

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## See also

- [`module-init`](https://github.com/ungoldman/module-init)
- [`maintenance-modules`](https://github.com/maxogden/maintenance-modules)

## License

[ISC](LICENSE.md)
