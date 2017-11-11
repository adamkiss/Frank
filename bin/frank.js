#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

let Frank
let frank

function run(i, flags) {
	// Try local, pinned frank first
	let frankPath = path.join(process.cwd(), 'node_modules', 'frank');
	try {
		fs.accessSync(frankPath)
	} catch (err) {
		frankPath = '..'
	}

	Frank = require(frankPath)
	frank = new Frank(process.cwd())

	if (i.length > 0) {
		frank.start(i[0])
	} else {
		frank.start()
	}

	return flags
}

const cli = require('cac')();

cli.command('task', {
	desc: 'Main dev command: run Taskr task',
	alias: ['d', 'dev']
}, (i, flags) => {
	run(i, flags)
})

cli.command('*', ':)', () => cli.showHelp())

cli.on('error', err => {
	console.error('command failed:', err)
	process.exit(1)
})

cli.parse()

//	- serve (-o)
//	- build
//	- deploy (--live)
//	- new
//	- dev
