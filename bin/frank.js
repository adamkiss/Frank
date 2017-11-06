#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
let Frank = false

function run(i, flags){
	// try local, pinned frank first
	let frankPath = path.join(process.cwd(), 'node_modules', 'frank');
	try {
		fs.accessSync(frankPath)
	} catch (_) {
		frankPath = '..'
	}

	if (!Frank){
		Frank = require(frankPath)(process.cwd())
	}

	if (i.length){
		Frank.start(i[0])
	} else {
		Frank.start()
	}
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