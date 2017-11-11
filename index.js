'use strict'

const Frank = require('./src/frank')

module.exports = (cwd, opts) => {
	const frank = new Frank(cwd, opts)

	frank.add_module('css-sass')

	return frank
}
