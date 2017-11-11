module.exports = frank => {
	frank.add_tasks({
		* assets(task) {
			yield task
				.source('assets/!(css|js|img)/**/*.*')
				.target('./public/assets')
		}
	})

	return frank
}

