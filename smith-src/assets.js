module.exports = frank => {
	frank.tasks.fonts = function * (task) {
		yield task
			.source('source/assets/styles/fonts/*.*')
			// .changed()
			.target('public/assets/fonts')
	}

	frank.tasks.images = function * (task) {
		yield task
			.source('source/assets/images/**/*.{jp?(e)g,png,gif,svg}')
			// .changed()
			.sharp(frank.config.fs.responsiveImageSettings || {})
			.imagemin()
			.target('public/assets/images')
	}
}
