const {hello} = require('./_dev.js')

module.exports = {
	plugins: [
		require('@taskr/sass'), hello
	],
	tasks: {
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
	}
}