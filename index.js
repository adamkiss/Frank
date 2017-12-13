'use strict'

const Frank = require('./src/frank')

module.exports = (cwd, opts) => {
	const frank = new Frank(cwd, opts)

	frank.env = {minify: false}

	require('./smith-src/serve')(frank)
	require('./smith-src/styles')(frank)
	require('./smith-src/scripts')(frank)

	frank.tasks.build = function * (task) {
		yield task.parallel([
			'scripts:serve', 'styles'
		])
	}
	/*
	// frank.add_module('css-sass')
	// frank.add_module('js-browserify')
	// frank.add_module('images')
	// frank.add_module('assets')

	// frank.add_module('clear')
	*/
	return frank
}
