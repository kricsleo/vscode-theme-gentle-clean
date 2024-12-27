import { execSync } from 'node:child_process'
import { name, version } from '../package.json'

const extensionPath = `${name}-${version}.vsix`
const extensionId = 'kricsleo.gentle-clean'

main()

function main() {
  execSync(`bun run build`)
  execSync(`code --uninstall-extension ${extensionId}`)
  execSync(`code --install-extension ${extensionPath}`)

  console.log('\n=======>', extensionPath, 'Installed <=======')
}

