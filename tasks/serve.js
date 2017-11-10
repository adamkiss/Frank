// const portfinder = require('portfinder')
const path = require('path')
const {spawn} = require('child_process')

const caddyfile = __dirname;
const caller = process.cwd();
const caddy = spawn(
	'caddy', [
		'-port', '2221',
		'-conf', path.resolve(__dirname, '..', 'Caddyfile'),
		'-root', caller
	], { stdio: 'inherit' })
	caddy.on('close', (code) => {
		console.log(`Caddy Server ended with code ${code}`)
	})

setTimeout(() => {
	caddy.kill()
}, 50000)

module.exports = {}