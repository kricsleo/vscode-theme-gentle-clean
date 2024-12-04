import fs from 'node:fs/promises'
import path from 'node:path'
import stripJsonComments from 'strip-json-comments';

const devFile = path.resolve('./themes/gentle-clean-dark.dev.json')
const targetFile = path.resolve('./themes/gentle-clean-dark.json')

main()

async function main() {
  try {
    import(devFile)
  } catch {
    // never mind, just import this file to trigger `bun --watch` to re-run this scritp
  }
  const devContent = await fs.readFile(devFile, 'utf-8')
  const replaced = replace(devContent)
  const jsonStr = stripJsonComments(replaced, {
    trailingCommas: true,
    whitespace: false,
  })
  await fs.writeFile(targetFile, jsonStr, 'utf-8')
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
    .split(':')
    .map(t => t.trim()) as [string, string]
  ))

  console.log('varialbes', varialbes)

  return configLines.map(line => line.replace(
    /(?<=")\$[^"]*(?=")/, 
    match => varialbes.get(match) || '#aa0000'
  )).join('\n')
}