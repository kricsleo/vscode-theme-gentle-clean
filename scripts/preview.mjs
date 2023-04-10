#!/usr/bin/env zx

const { name, version } = await fs.readJson('./package.json')
const vsixPath = `${name}-${version}.vsix`
const extensionId = 'kricsleo.gentle-clean'

await $`npm run build`
await $`code --uninstall-extension ${extensionId}`
await $`code --install-extension ${vsixPath}`

console.log(chalk.yellow('Installed'),  '🫧 ', vsixPath)