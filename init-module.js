/* global package, config, yes, dirname, basename */

/*
Some things to know:

init-package-json & promzard inject some variables into this module.

- `package` is the parsed contents of package.json if it exists
- `config` gives you access to preferences set in npm config
- `yes` is what you get when you run `npm init {--force|-f|--yes|y}`
- `dirname` is the full path of the current directory
- `basename` is the name of the current directory
- `filename` is the full path to package.json in the current directory
- `prompt` is a promzard prompt that behaves a little strangely
  - see https://github.com/npm/promzard#prompt for function signature
  - looks sync, is actually async, but gets replaced with tokens
    - see https://github.com/npm/promzard#sync-vs-async for more on that

all code below has been adapted from https://github.com/npm/init-package-json
*/

var fs = require('fs')
var glob = require('glob')
var path = require('path')
var validateLicense = require('validate-npm-package-license')
var validateName = require('validate-npm-package-name')
var npa = require('npm-package-arg')
var semver = require('semver')

// more popular packages should go here, maybe?
function isTestPkg (p) {
  return !!p.match(/^(expresso|mocha|tap|coffee-script|coco|streamline)$/)
}

function niceName (n) {
  return n.replace(/^node-|[.-]js$/g, '').toLowerCase()
}

function isTruthy (str) {
  var s = str.toLowerCase()
  if (s === "true" ||
      s === "yes" ||
      s === "y") {
    return true
  }
  return false
}

function spaceMeansBlank (input) {
  if (input === " ") return null
  return input
}

function readDeps (test) { return function (cb) {
  fs.readdir('node_modules', function (err, dir) {
    if (err) return cb()
    var deps = {}
    var n = dir.length
    if (n === 0) return cb(null, deps)
    dir.forEach(function (d) {
      if (d.match(/^\./)) return next()
      if (test !== isTestPkg(d)) return next()
      var dp = path.join(dirname, 'node_modules', d, 'package.json')
      fs.readFile(dp, 'utf8', function (err, p) {
        if (err) return next()
        try { p = JSON.parse(p) }
        catch (e) { return next() }
        if (!p.version) return next()
        if (p._requiredBy) {
          if (!p._requiredBy.some(function (req) { return req === '#USER' })) return next()
        }
        deps[d] = config.get('save-exact') ?
          p.version : config.get('save-prefix') + p.version
        return next()
      })
    })
    function next () { if (--n === 0) return cb(null, deps) }
  })
}}

// name

var name = package.name || basename
var spec = npa(name)
var scope = config.get('scope')

if (scope) {
  if (scope.charAt(0) !== '@') scope = '@' + scope
  if (spec.scope) {
    name = scope + '/' + spec.name.split('/')[1]
  } else {
    name = scope + '/' + name
  }
}

exports.name =  yes ? name :
  prompt('name', name, function (data) {
    var its = validateName(data)
    if (its.validForNewPackages) return data
    var errors = (its.errors || []).concat(its.warnings || [])
    var err = new Error('Sorry, ' + errors.join(' and ') + '.')
    err.notValid = true
    return err
  })

// version

var version = package.version ||
  config.get('init-version') ||
  '1.0.0'

exports.version = yes ? version :
  prompt('version', version, function (version) {
    if (semver.valid(version)) return version
    var err = new Error('Invalid version: "' + version + '"')
    err.notValid = true
    return err
  })

// description

var desc = package.description || ''

exports.description = yes ? desc : prompt('description', desc || null)

// main

var main = package.main || null

exports.main = function (cb) {
  fs.readdir(dirname, function (err, f) {
    if (err) f = []

    f = f.filter(function (f) {
      return f.match(/\.js$/)
    })

    if (f.indexOf('index.js') !== -1)
      f = 'index.js'
    else if (f.indexOf('main.js') !== -1)
      f = 'main.js'
    else if (f.indexOf(basename + '.js') !== -1)
      f = basename + '.js'
    else
      f = f[0]

    var index = f || 'index.js'
    return cb(null, yes ? index : prompt('entry point', main || index))
  })
}

// bin

if (!package.bin) {
  exports.bin = function (cb) {
    fs.readdir(path.resolve(dirname, 'bin'), function (err, d) {
      // no bins
      if (err) return cb()
      // just take the first js file we find there, or nada
      return cb(null, d.filter(function (f) {
        return f.match(/\.js$/)
      })[0])
    })
  }
}

// dependencies

if (!package.dependencies) {
  exports.dependencies = readDeps(false)
}

// devDependencies

if (!package.devDependencies) {
  exports.devDependencies = readDeps(true)
}

// scripts

// MUST have a test script!

exports.scripts = function (cb) {
  fs.readdir(path.join(dirname, 'node_modules'), function (err, deps) {
    // error is fine
    setupScripts(deps || [], cb)
  })
}

function setupScripts (deps, cb) {
  var scripts = package.scripts || {}
  var notest = 'echo "Error: no test specified" && exit 1'
  var startCmd = scripts.start || config.get('init-scripts-start') || null
  var testCmd = scripts.test || config.get('init-scripts-test') || notest

  scripts.start = yes ? startCmd : prompt('start command', startCmd, spaceMeansBlank)
  scripts.test = yes ? testCmd : prompt('test command', testCmd, spaceMeansBlank)

  return cb(null, scripts)
}

// repository

var repo = package.repository

exports.repository = function (cb) {
  if (repo) return cb(null, yes ? repo : prompt('git repository', repo.url || repo))

  fs.readFile('.git/config', 'utf8', function (err, gitconfig) {
    if (err || !gitconfig) {
      return cb(null, yes ? '' : prompt('git repository'))
    }

    gitconfig = gitconfig.split(/\r?\n/)
    var i = gitconfig.indexOf('[remote "origin"]')

    if (i !== -1) {
      var u = gitconfig[i + 1]
      if (!u.match(/^\s*url =/)) u = gitconfig[i + 2]
      if (!u.match(/^\s*url =/)) u = null
      else u = u.replace(/^\s*url = /, '')
    }

    if (u && u.match(/^git@github.com:/)) {
      u = u.replace(/^git@github.com:/, 'https://github.com/')
    }

    return cb(null, yes ? u : prompt('git repository', u))
  })
}

// keywords

var keywords = package.keywords || []



exports.keywords = yes ?
  keywords.length ? keywords : null :
  prompt('keywords', keywords.join(', '), function (s) {
    if (!s) return undefined
    if (Array.isArray(s)) s = s.join(' ')
    if (typeof s !== 'string') return s
    return s.split(/[\s,]+/)
  })

// author

var author = package.author || {
  "name" : config.get('init-author-name'),
  "email" : config.get('init-author-email'),
  "url" : config.get('init-author-url')
}

exports.author = yes ? author :
  {
    "name" : prompt('author name', author.name, spaceMeansBlank),
    "email" : prompt('author email', author.email, spaceMeansBlank),
    "url" : prompt('author url', author.url, spaceMeansBlank)
  }

// license

var license = package.license ||
  config.get('init-license') ||
  'ISC'

exports.license = yes ? license : prompt('license', license, function (data) {
  var its = validateLicense(data)
  if (its.validForNewPackages) return data
  var errors = (its.errors || []).concat(its.warnings || [])
  var err = new Error('Sorry, ' + errors.join(' and ') + '.')
  err.notValid = true
  return err
})

// directories

// ignore directories since it doesn't get used by anything
exports.directories = null

// private

var isPrivate = package.private || null

exports.private = yes ? isPrivate : prompt('private', isPrivate ? 'true' : 'false', function (bool) {
  if (isTruthy(bool)) return true
  else return null
})
