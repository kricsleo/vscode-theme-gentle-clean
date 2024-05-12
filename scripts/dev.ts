import fs from 'fs/promises'

const devFile = '/Users/shengfeng.xu/Documents/workspace/vscode-theme-gentle-clean/themes/gentle-clean-dark.json'
const targetFile = '/Users/shengfeng.xu/Documents/workspace/vscode-theme-gentle-clean/themes/gentle-clean-dark2.json'

main()

async function main() {
  try {
    import('../themes/gentle-clean-dark.json')
  } catch {
    // never mind, just import this file to trigger `bun --watch` to re-run this scritp
  }
  const devContent = await fs.readFile(devFile, 'utf-8')
  const replaced = replace(devContent)
  await fs.writeFile(targetFile, replaced, 'utf-8')
}

function replace(content: string): string {
  const lines = content.split('\n')
  const [variableLines, configLines] = lines.reduce<string[][]>(
    (all, line) => {
      const isVariable = line.trimStart().startsWith('// $')
      isVariable ? all[0].push(line) : all[1].push(line)
      return all
    },
    [[], []]
  )

  const varialbes = new Map(variableLines.map(line => line
    .slice(line.indexOf('$'))
    .trimEnd()
    .split(':') as [string, string]
  ))

  console.log('varialbes', varialbes)

  return configLines.map(line => line.replace(
    /(?<=")\$[^"]*(?=")/, 
    match => varialbes.get(match)!
  )).join('\n')
}