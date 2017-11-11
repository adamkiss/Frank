function opts_to_config(opts) {
	return {
		sourceMapEmbed: !opts.minify,
		outputStyle: opts.minify ? 'compressed' : 'expanded'
	}
}

module.exports = (frank, opts) => {
	frank.add_plugins([
		require('@taskr/sass'), require('taskr-autoprefixer')
	])
	frank.add_tasks({
		* sass(task) {
			yield task
				.source('assets/css/style.scss')
				.sass(opts_to_config(opts))
				.autoprefixer()
				.target('./public/assets')
		}
	})

	return frank
}
