#!/usr/bin/env zx
import 'zx/globals'
const { name, version } = await fs.readJson('./package.json')
const vsixPath = `${name}-${version}.vsix`

await $`code --uninstall-extension kricsleo.gentle-clean`
await $`code --install-extension ${vsixPath}`

console.log(chalk.yellow('Installed'),  '🫧 ', vsixPath)