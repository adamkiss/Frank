'use strict'

const Frank = require('./src/frank')

module.exports = (cwd, opts) => {
	const frank = new Frank(cwd, opts)

	frank.add_module('css-sass')
	frank.add_module('js-browserify')
	frank.add_module('images')
	frank.add_module('assets')

	frank.add_module('clear')

	return frank
}
