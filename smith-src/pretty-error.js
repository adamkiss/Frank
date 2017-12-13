module.exports = frank => {
	frank.prettyError = require('pretty-error').start()

	frank.prettyError.appendStyle({
		'pretty-error': {
			margin: 0
		},
		'pretty-error > header > title > kind': {
			color: 'black',
			background: 'red',
			padding: '0 1'
		},
		'pretty-error > header > colon': {
			display: 'none'
		},
		'pretty-error > header > message': {
			color: 'bright-red',
			padding: '0 1'
		},
		'pretty-error > trace': {
			marginLeft: 2
		},
		'pretty-error > trace > item': {
			marginLeft: 2,
			marginBottom: 0,
			bullet: '"<grey>→</grey>"'
		},
		'pretty-error > trace > item > header > pointer > file': {
			color: 'bright-cyan'
		},
		'pretty-error > trace > item > header > pointer > colon': {
			color: 'cyan'
		},
		'pretty-error > trace > item > header > pointer > line': {
			color: 'white'
		},
		'pretty-error > trace > item > header > what': {
			color: 'bright-white',
			padding: '0 1'
		}
	})

	frank.prettyError.alias('/Users/adam/Projects/Frankensmith', '(Frankensmith)')
	frank.prettyError.skipPackage('gulp', 'orchestrator', 'ware', 'wrap-fn', 'async', 'consolidate', 'bluebird')
	frank.prettyError.skipNodeFiles()
}
