const _ = 'lodash'
const fs = 'fs'
const glob = 'glob'
const mm = 'mm'
const path = 'path'
const matter = 'gray-matter'
const marked = 'marked'

module.exports = (ms, msp, cfg) => {
	msp.metaPath = function () {
		const pathParsePlus = name => {
			const parsed = path.parse(name)

			const splitName = parsed.name.split('.')
			parsed.name = splitName.shift()

			const nameExt = splitName.join('.')
			parsed.ext_ = [nameExt ? '.' : '', nameExt, parsed.ext].join('')

			return parsed
		}

		const isJade = parsed => parsed.ext === '.jade'
		const jadeFilename = parsed => cfg.site.path(`source/${parsed.base}`)

		const process = name => {
			const parsed = pathParsePlus(name)
			return {
				pathInfo: parsed,
				origname: name,
				filename: isJade(parsed) ? jadeFilename(parsed) : name
			}
		}

		return (files, metalsmith, done) => {
			files.forEach((file, name) => {
				_.merge(file, process(name))
			})
			done()
		}
	}

	msp.permalinks = () => {
		const match = '**/*.{php,htm?(l),jade,php.jade}'

		const indexedName = (name, pathInfo) => {
			const pathParts = name.split('.')
			pathParts.shift()
			pathInfo.ext_ = `.${pathParts.join('.')}`
			return path.join(pathInfo.dir, pathInfo.name, 'index', pathInfo.ext_)
		}

		const setUrl = filePath => `/${filePath}`

		const setPermalink = filePath => {
			pathParts = filePath.split('/')
			pathParts.splice(-1,1)
			return path.normalize(`/${pathParts.join('/')}/`)
		}

		return (files, metalsmith, done) => {
			const matched = mm(Object.keys(files), match)
			files.forEach((file, name) => {
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

	msp.readDataFiles = relativePath => {
		const returnData = {generators: [], metadata: {}}

		glob.sync(cfg.site.path(relativePath)).forEach(file => {
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

	return msp
}

