#!/usr/bin/env node
'use strict'

function run(){

}

const cli = require('cac')();

cli.command('task', {
	desc: 'Main dev command: run Taskr task',
	alias: ['d', 'dev']
}, (i, flags) => {

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