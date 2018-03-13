const metalsmith = require('metalsmith')

module.exports = frank => {
	const _ = require('lodash')
	const jadeHelpers = require('./jade-helpers')(frank)

	require('./metalsmith-plugins')(frank)

	const config = {
		ignore: ['.DS_Store'],
		inPlace: {
			engine: 'jade',
			cache: false,
			pattern: '**/*.jade*'
		}
	}

	const renameMap = [
		[/\.php\.jade$/, '.php'],
		[/\.jade$/, '.html']
	]

	const runMetalsmith = (opts, callback) => {
		frank.config.metalsmith = frank.msp.readDataFiles('source/data/*.*')
		frank.config.metalsmith.metadata.env = {
			build: opts.build || false,
			assets: frank.config.metalsmith.metadata['assets-manifest']
		}
		metalsmith(frank.cwd)
			.source('source/site')
			.destination('public')
			.clean(false)
			.frontmatter(false)
			.use(frank.msp.matters())
			.use(frank.msp.ignore(config.ignore))
			.use(frank.msp.virtualPages(frank.config.metalsmith.generators))
			.use(frank.msp.define(frank.config.metalsmith.metadata))
			.use(frank.msp.metaPath())
			.use(frank.msp.permalinks())
			.use(frank.msp.collections(frank.config.collections))
			.use(frank.msp.inPlace(_.extend(config.inPlace, jadeHelpers)))
			.use(frank.msp.rename(renameMap))
			.build(error => {
				if (error) {
					console.error(
						error.message.substr(error.message.lastIndexOf('\n') + 1)
					)
					callback(error)
				} else {
					callback()
				}
			})
	}
	const runMetalsmithPromise = opts => new Promise((resolve, reject) => {
		runMetalsmith(opts, (error = false) => {
			return error ? reject(error) : resolve(':)')
		})
	})

	frank.plugins.add(require('@taskr/clear'))
	frank.tasks.metalsmith = function * (task) {
		yield task.clear('public').run({
			every: false,
			* func() {
				yield runMetalsmithPromise({})
			}
		})
	}
}
