module.exports = frank => {
	frank.add_tasks({
		* assets(task) {
			yield task
				.source('assets/(fonts)/**/*.*')
				.target('public/assets')
		}
	})

	return frank
}

