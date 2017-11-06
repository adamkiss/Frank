const Taskr = require('taskr')

const hello = function (task, utils) {
	task.plugin('hello', {}, function * (file, opts) {
		file.metadata = {saving: 'grace'}
		return file
	})
}

const hallo = function (task, utils) {
	task.plugin('hallo', {}, function * (file, opts) {
		console.log (file, opts)
		return file
	})
}

function frank(cwd){
	return new Taskr({
		plugins: [
			require('@taskr/sass'),
			hello, hallo
		],
		tasks: {
			* default (task) {
				console.log('linked')
			},
			* fakesass (task) {
				task
					.source('sass/halo.sass')
					.hello()
					.sass()
					.hallo()
					.target('./dist')
			}
		},
		cwd
	})
}

module.exports = frank