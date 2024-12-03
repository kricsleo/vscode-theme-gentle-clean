<script setup>
import Code from './Code.vue'
import tsCode from './fixtures/example.ts?raw'

</script>

<template>
  <Suspense>
    <main>
      <Code lang="ts" :code="tsCode" />
    </main>
  </Suspense>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
*::-webkit-scrollbar {
  display: none;
}
html {
  min-height: 100vh;
  color-scheme: dark;
  background: #1a1b26;
}
code {
  font-family: JuliaMono;;
}

main {
  padding: 2rem;
}
</style>
