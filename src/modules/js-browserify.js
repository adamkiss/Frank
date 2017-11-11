const {hallo} = require('./_dev.js')

module.exports = {
	plugins: [require('@taskr/sass'), hallo],
	tasks: {
		* default (task) {
			console.log('default')
		}
	}
}