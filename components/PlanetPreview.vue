<script setup lang="ts">
import { usePlanetStore } from '@/stores/PlanetStore'
import { getRandomNumber } from '@/utils/globals'
import { RocketLaunchIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const planetStore = usePlanetStore()
const router = useRouter()
const travelToPlanet = () =>
  router.push({ path: `/planet/${planetStore.currentPlanet?.name}` })
</script>

<template>
  <section
    v-if="planetStore.currentPlanet"
    class="slide-from-right flex h-72 flex-col items-center justify-between border border-neutral-800 bg-neutral-950 p-4 text-neutral-200"
  >
    <div class="flex flex-col items-center gap-8">
      <div
        class="flex w-[20em] items-center justify-between gap-2 border-b border-neutral-700 capitalize"
      >
        <span class="whitespace-nowrap">{{
          planetStore.currentPlanet?.name
        }}</span>
        <span
          :key="planetStore.currentPlanet?.name"
          class="slide-from-right max-w-[15em] truncate text-sm opacity-60"
          >{{ planetStore.currentPlanet?.terrain }}</span
        >
      </div>
      <img
        :key="planetStore.currentPlanet?.name"
        :src="'/planets/' + getRandomNumber() + '.png'"
        alt="planet image"
        class="fade-in spin h-28 w-28"
      />
    </div>
    <button
      class="flex items-center gap-2 border border-neutral-700 px-2 py-1 hover:opacity-60"
      @click="travelToPlanet"
    >
      <RocketLaunchIcon class="h-5 w-5" />
      <span>Hyperspace Jump</span>
    </button>
  </section>
</template>
