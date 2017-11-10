'use strict'

const taskfiles = require('./tasks')
const Taskr = require('taskr')

module.exports = class Frank {
	constructor (cwd) {
		this.cwd = cwd

		this.setup()
	}

	setup() {
		this.plugins = []
		this.tasks = {}

		for (let file of taskfiles){
			this.plugins = file.plugins.reduce((acc, cur) => {
				acc.indexOf(cur) === -1 && acc.push(cur)
				return acc
			}, this.plugins)
			Object.assign(this.tasks, file.tasks)
		}
	}

	start() {
		this.taskr = new Taskr({
			plugins: this.plugins,
			tasks: this.tasks,
			cwd: this.cwd
		})
		return this.taskr.start(...arguments)
	}
}

// function frank(cwd){
// 	return Frank
// }

// module.exports = frank