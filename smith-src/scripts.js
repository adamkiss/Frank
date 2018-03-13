const browserify = task => task.source('source/assets/scripts/app.js').browserify()

module.exports = frank => {
	frank.plugins.add(require('@taskr/browserify'))
	frank.plugins.add(require('@taskr/uglify'))

	frank.tasks['scripts:serve'] = function * (task) {
		yield browserify(task)
			.target('public/assets')
	}

	frank.tasks['scripts:build'] = function * (task) {
		yield browserify(task)
			.uglify()
			.target('public/assets')
	}

	frank.tasks['scripts:vendor'] = function * (task) {
		yield task.source('source/assets/scripts/vendor/**')
			.target('public/assets/vendor')
	}
}
