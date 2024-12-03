<script lang="ts">
import { transformerStyleToClass } from '@shikijs/transformers'
import { createHighlighter } from 'shiki'
import themeJson from '../themes/gentle-clean-dark.json'

const highlighter = createHighlighter({
  themes: [],
  langs: ['typescript', 'vue']
}).then(async h => {

  const theme = {
    name: themeJson.name,
    fg: themeJson.colors.foreground,
    bg: themeJson.colors['editor.background'],
    settings: themeJson.tokenColors
  }
  await h.loadTheme(theme)

  return h
})

export const toClass = transformerStyleToClass()
</script>

<script setup lang="ts">
const props = defineProps<{
  lang: string
  code: string
}>()

const h = await highlighter

const html = h.codeToHtml(props.code, {
  lang: 'typescript',
  themes: {
    default: 'Gentle Clean Dark'
  },
  defaultColor: false,
  transformers: [toClass]
})

const css = toClass.getCSS()
</script>

<template>
  <component is="style">
    {{ css }}
  </component>
  <pre v-html="html" />
</template>

<style>
pre span {
  color: var(--shiki-default);
}
</style>
