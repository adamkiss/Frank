#!/usr/bin/env node
'use strict'
const meow = require('meow')
const pkg = require('../package.json')

meow(`
	Frank ${pkg.version}
	  $ frank
`)
