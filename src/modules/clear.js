module.exports = frank => {
	frank.add_plugins([
		require('@taskr/clear')
	])
	frank.add_tasks({
		* clear(task) {
			yield task.clear('./public')
		}
	})

	return frank
}
