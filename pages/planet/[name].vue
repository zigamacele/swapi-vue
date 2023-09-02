<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()
const returnHome = () => router.push({ path: '/' })
</script>

<template>
  <main
    class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-end gap-2"
  >
    <button
      class="slide-from-bottom flex w-52 cursor-pointer items-center justify-center gap-2 border border-neutral-700 bg-neutral-950 p-1 text-sm text-neutral-400 hover:bg-neutral-600 hover:text-neutral-50"
      @click="returnHome"
    >
      <HomeIcon class="h-5 w-5" />
      <span>Return to Home System</span>
    </button>
    <PlanetDetails />
  </main>
</template>
