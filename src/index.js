'use strict'

const Taskr = require('taskr')

module.exports = class Frank {
	constructor(cwd, opts = {}) {
		this.cwd = cwd
		this.opts = opts

		this.plugins = []
		this.tasks = {}

		this.setup()
	}

	add_plugin(p) {
		this.plugins = p.reduce((acc, cur) => {
			if (acc.indexOf(cur) === -1) {
				acc.push(cur)
			}
			return acc
		}, this.plugins)
	}

	add_tasks(t) {
		Object.assign(this.tasks, t)
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
/*
	foreach (tasks) {
		require('./task')(Frank, opts)
	}
 */

// function frank(cwd){
// 	return Frank
// }

// module.exports = frank