const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const glob = require('glob')
const mm = require('multimatch')
const matter = require('gray-matter')

module.exports = frank => {
	frank.msp = {
		collections: require('metalsmith-collections'),
		define: require('metalsmith-define'),
		ignore: require('metalsmith-ignore'),
		inPlace: require('metalsmith-in-place'),
		matters: require('metalsmith-matters'),
		rename: require('metalsmith-rename'),
		virtualPages: require('metalsmith-virtual-pages')
	}

	frank.msp.metaPath = function () {
		const pathParsePlus = name => {
			const parsed = path.parse(name)

			const splitName = parsed.name.split('.')
			parsed.name = splitName.shift()

			const nameExt = splitName.join('.')
			parsed.ext_ = [nameExt ? '.' : '', nameExt, parsed.ext].join('')

			return parsed
		}

		const isJade = parsed => parsed.ext === '.jade'
		const jadeFilename = parsed => path.join(frank.cwd, `source/${parsed.base}`)

		const process = name => {
			const parsed = pathParsePlus(name)
			return {
				pathInfo: parsed,
				origname: name,
				filename: isJade(parsed) ? jadeFilename(parsed) : name
			}
		}

		return (files, metalsmith, done) => {
			Object.keys(files).forEach(name => {
				_.merge(files[name], process(name))
			})
			done()
		}
	}

	frank.msp.permalinks = () => {
		const match = '**/*.{php,htm?(l),jade,php.jade}'

		const indexedName = (name, pathInfo) => {
			const pathParts = name.split('.')
			pathParts.shift()
			pathInfo.ext_ = `.${pathParts.join('.')}`
			return path.join(pathInfo.dir, pathInfo.name, `index${pathInfo.ext_}`)
		}

		const setUrl = filePath => `/${filePath}`

		const setPermalink = filePath => {
			const pathParts = filePath.split('/')
			pathParts.splice(-1, 1)
			return path.normalize(`/${pathParts.join('/')}/`)
		}

		return (files, metalsmith, done) => {
			const matched = mm(Object.keys(files), match)
			Object.keys(files).forEach(name => {
				const file = files[name]
				const skipPermalink = matched.indexOf(name) === -1 || Boolean(file.permalink)

				if (!skipPermalink || file.pathInfo.name !== 'index') {
					const oldName = name
					name = indexedName(oldName, file.pathInfo)

					if (Object.keys(files).indexOf(name) !== -1) {
						throw new Error(`File permalink exists already: ${oldName} trying to move to ${name}`)
					}

					delete files[oldName]
					files[name] = file
				}

				files[name].url = skipPermalink ? setUrl(name) : setPermalink(name)
			})
			done()
		}
	}

	frank.msp.readDataFiles = relativePath => {
		const returnData = {generators: [], metadata: {}}

		glob.sync(path.join(frank.cwd, relativePath)).forEach(file => {
			const fileParts = path.parse(file).name.split('_')
			const fileData = matter(`---\n${fs.readFileSync(file)}`).data

			if (fileParts[0] === 'generator') {
				returnData.generators.push(fileData)
			} else {
				_.set(returnData.metadata, fileParts.join('.'), fileData)
			}
		})

		return returnData
	}
}

