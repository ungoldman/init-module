#!/usr/bin/env node

var cliclopts = require('cliclopts')
var minimist = require('minimist')
var main = require.resolve('../init-module.js')

var allowedOptions = [
  {
    name: 'path',
    abbr: 'p',
    help: 'Print the path to the main init-module file',
    boolean: true
  },
  {
    name: 'config',
    abbr: 'c',
    help: 'Configure npm init defaults',
    boolean: true
  },
  {
    name: 'help',
    abbr: 'h',
    help: 'Show help',
    boolean: true
  }
]

var opts = cliclopts(allowedOptions)
var argv = minimist(process.argv.slice(2), opts.options())

function printUsageAndExit () {
  console.log('Usage: init-module [options]')
  opts.print()
  process.exit()
}

if (argv.help) {
  printUsageAndExit()
}

if (argv.path) {
  console.log(main)
  process.exit()
}

printUsageAndExit()
