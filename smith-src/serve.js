const path = require('path')
const {spawn} = require('child_process')
const browserSync = require('browser-sync')

module.exports = frank => {
	frank.tasks.serve = function * (task) {
		frank.caddyServer = spawn(
			'caddy', [
				'-port', '2221',
				'-conf', path.resolve(__dirname, '..', 'Caddyfile'),
				'-root', frank.cwd
			], {stdio: 'inherit'}
		)
		frank.browserSync = browserSync({
			proxy: 'https://localhost:2221',
			port: '2222',
			open: true,
			notify: true,
			https: true,
			ghostMode: {
				forms: false
			}
		})

		process.on('SIGINT', () => {
			frank.caddyServer.kill()
			process.exit()
		})
		frank.caddyServer.on('close', code => {
			console.log(`Caddy Server ended with code ${code}`)
		})

		return true
	}
}
