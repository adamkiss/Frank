const Taskr = require('taskr')
const Frank = new Taskr({
	plugins: [],
	tasks: {
		* default (f) {
			console.log('linked')
		}
	}
})

module.exports = Frank