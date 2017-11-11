'use strict'

const Taskr = require('taskr')

module.exports = class Frank {
	constructor(cwd, opts = {}) {
		this.cwd = cwd
		this.opts = opts

		this.plugins = []
		this.tasks = {}
	}

	add_module(module) {
		require(`./modules/${module}`)(this, this.opts[module] || {})
	}

	add_plugins(p) {
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
