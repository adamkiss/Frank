const path = require('path')
const glob = require('glob')

class HelperPhp {
	echo(renderString) {
		return renderString ? `<?= ${renderString} ?>` : false
	}
	e(renderString) {
		return this.echo(renderString)
	}

	inline(renderString) {
		return renderString ? `<?php ${renderString} ?>` : false
	}
	i(renderString) {
		return this.inline(renderString)
	}

	omitted(renderString) {
		return renderString ? `<?php ${renderString}` : false
	}

	redirect(location = '/') {
		return this.omitted(`header('Location: ${location}');`)
	}
}

class HelperAssets {
	constructor(frank) {
		this.frank = frank
		this.cache = {found: {}, notfound: []}
	}

	cssTag(path) {
		return `<link rel="stylesheet" href="/assets/${path}" />`
	}
	jsTag(path) {
		return `<script src="/assets/${path}"></script>`
	}

	get(file) {
		const f = this.frank
		const build = Boolean(f && f.env && f.env.build)
		const assets = (f && f.env && f.env.assets) ? f.env.assets : false
		if (build && assets) {
			file = assets[file]
		}
		return file.slice(-3) === 'css' ? this.cssTag(file) : this.jsTag(file)
	}

	vendorGlob(file) {
		return path.join(this.frank.cwd, `public/assets/vendor/${file}-*.js`)
	}
	vendorCache(key, file) {
		this.cache.found[key] = path.parse(file).base
		return this.cache.found[key]
	}
	vendor(file) {
		if (!this.cache.found[file]) {
			const found = glob.sync(this.vendorGlob(file))[0]
			if (found) {
				this.cache.found[file] = this.vendorCache(file, found)
			} else {
				this.cache.found[file] = file
			}
		}
		if (this.cache.found[file]) {
			return this.jsTag(this.cache.found[file])
		} else if (this.cache.notfound.indexOf(file)) {
			this.cache.notfound.push(file)
			throw new Error(`No file for ${file}`)
		}

		return false
	}

}

const fsmarkdown = require('jstransformer')(
	require('jstransformer-fsmarkdown'))

const markdownRender = renderString => {
	return renderString ? fsmarkdown.render(renderString).body : ''
}

module.exports = frank => {
	const assetHelper = new HelperAssets(frank)
	return {
		_: require('lodash'),
		php: new HelperPhp(),
		md: markdownRender,
		assets: assetHelper.get.bind(assetHelper),
		vendor: assetHelper.vendor.bind(assetHelper),
		moment: require('moment')
	}
}
