module.exports = frank => {
	frank.tasks.manifest = function * (task) {
		yield task
			.source('public/assets/*.{js,css}')
			.rev()
			.revManifest({
				dest: 'dist',
				file: 'assets-manifest.json',
				trim: str => str.replace(/app\/client/i, 'assets')
			})
	}
}
