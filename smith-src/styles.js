module.exports = frank => {
	frank.plugins.add(require('@taskr/sass'))
	frank.plugins.add(require('taskr-autoprefixer'))

	frank.tasks.styles = function * (task) {
		yield task
			.source('source/assets/styles/style.{css,s[ac]ss}')
			.sass({
				sourceMapEmbed: !frank.env.minify,
				outputStyle: frank.env.minify ? 'compressed' : 'expanded'
			})
			.autoprefixer()
			.target('public/assets')
	}
}
