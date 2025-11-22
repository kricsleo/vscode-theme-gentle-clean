import { execSync } from 'node:child_process'
import { name, version } from '../package.json'

const extensionPath = `${name}-${version}.vsix`
const extensionId = 'kricsleo.gentle-clean'

main()

function main() {
  execSync(`bun run build`)
  execSync(`cursor --uninstall-extension ${extensionId}`)
  execSync(`cursor --install-extension ${extensionPath}`)

  console.log('\n=======>', extensionPath, 'Installed <=======')
}

