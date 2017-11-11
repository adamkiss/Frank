const {hello, hallo} = require('./_dev.js')

function opts_to_config(opts) {
	return {
		sourceMapEmbed: !opts.minify,
		outputStyle: opts.minify ? 'compressed' : 'expanded'
	}
}

module.exports = (frank, opts) => {
	console.log(opts)

	frank.add_plugins([
		require('@taskr/sass'), hello, hallo
	])
	frank.add_tasks({
		* sass(task) {
			yield task
				.source('sass/halo.sass')
				.hello()
				.sass(opts_to_config(opts))
				.hallo()
				.target('./dist')
		}
	})

	return frank
}
