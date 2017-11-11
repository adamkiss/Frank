module.exports = frank => {
	frank.add_plugins([
		require('@taskr/browserify'),
		require('@taskr/uglify')
	])

	frank.add_tasks({
		* js_compile(task) {
			yield task
				.source('assets/js/*.js')
				.browserify()
				.target('./public/assets')
		},
		* js_build(task) {
			yield task
				.source('assets/js/*.js')
				.browserify()
				.uglify()
				.target('./public/assets')
		}
	})

	return frank
}
