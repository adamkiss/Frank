'use strict'

const path = require('path')

const Taskr = require('taskr')
const reporter = require('taskr/lib/reporter')

module.exports = class Frank {
	constructor(cwd, opts = {}) {
		this.cwd = cwd
		this.opts = opts

		this.plugins = new Set()
		this.tasks = {}

		this.config = require(path.join(this.cwd, 'frank.site.js'))
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
			plugins: Array.from(this.plugins),
			tasks: this.tasks,
			cwd: this.cwd
		})
		this.reporter = reporter.call(this.taskr)
		return this.taskr.start(...arguments)
	}
}
