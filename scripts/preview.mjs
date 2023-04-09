#!/usr/bin/env zx

const { name, version } = await fs.readJson('./package.json')
const vsixPath = `${name}-${version}.vsix`

await $`npm run build`
await $`code --uninstall-extension kricsleo.gentle-clean`
await $`code --install-extension ${vsixPath}`

console.log(chalk.yellow('Installed'),  '🫧 ', vsixPath)