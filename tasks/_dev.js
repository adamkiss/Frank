module.exports.hello = function (task, utils) {
	task.plugin('hello', {}, function * (file, opts) {
		file.metadata = {saving: 'grace'}
		return file
	})
}

module.exports.hallo = function (task, utils) {
	task.plugin('hallo', {}, function * (file, opts) {
		console.log (file, opts)
		return file
	})
}
