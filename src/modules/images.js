module.exports = frank => {
	frank.add_tasks({
		* images(task) {
			yield task
				.source('assets/img/**/*.*')
				.target('public/assets/images')
		}
	})

	return frank
}

