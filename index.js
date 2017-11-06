const Taskr = require('taskr')
const node_modules_include = require('path').join(__dirname, 'node_modules')

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
					.sass({
						sourceMapEmbed: true,
						// importer: function(url, prev, done){
						// 	console.log(url, prev, done)
						// }
					})
					.hallo()
					.target('./dist')
			}
		},
		cwd
	})
}

module.exports = frank