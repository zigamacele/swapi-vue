<script setup lang="ts">
import { usePlanetStore } from '../../stores/PlanetStore'
import InfiniteLoading from 'v3-infinite-loading'
import { Planet, PlanetData } from '../../types/apiResponse'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted } from 'vue'
import { getLocalStorage } from '../../utils/globals'

const { setCurrentPlanet, planets, updatePlanets } = usePlanetStore()

const currLocalStorage = ref({
  favorites: [] as Planet[],
  inStorage: [] as string[],
})

const updateLocalStorage = (planet: Planet) => {
  const index = currLocalStorage.value.favorites.findIndex(
    (item: Planet) => item.name === planet.name,
  )

  if (index === -1) {
    currLocalStorage.value.favorites.push(planet)
  } else {
    currLocalStorage.value.favorites.splice(index, 1)
  }

  window.localStorage.setItem(
    'favorites',
    JSON.stringify(currLocalStorage.value.favorites),
  )

  currLocalStorage.value = getLocalStorage()
}

onMounted(() => {
  currLocalStorage.value = getLocalStorage()
})

interface $state {
  complete: () => void
  loaded: () => void
  error: () => void
}

const API_URL = 'https://swapi.dev/api/planets/?page='
let page = 1

const loadMore = async ($state: $state) => {
  try {
    const response = await fetch(API_URL + page)
    const { results, next } = (await response.json()) as PlanetData

    if (!next) {
      updatePlanets(results)
      $state.complete()
    } else {
      updatePlanets(results)
      page++
      $state.loaded()
    }
  } catch (error) {
    $state.error()
  }
}

const props = defineProps({
  show: Boolean,
  classes: {
    type: String,
    default: 'h-4 w-4 cursor-pointer text-neutral-400 hover:text-neutral-50',
  },
})
</script>
<template>
  <div
    class="flex h-40 w-80 flex-col gap-2 overflow-y-scroll border border-neutral-800 bg-neutral-950 p-4 sm:h-96 sm:w-60"
  >
    <div v-if="!planets.length && !show" class="text-sm">
      Scanning the Galactic Atlas...
    </div>
    <div
      v-for="(planet, index) in props.show
        ? currLocalStorage.favorites
        : planets"
      :key="index"
    >
      <div
        class="flex items-center justify-between rounded-lg px-2 py-1 text-center"
      >
        <div
          class="flex cursor-pointer items-center gap-2 hover:underline hover:opacity-60"
          @click="setCurrentPlanet(planet)"
        >
          <ChevronLeftIcon class="h-4 w-4" />
          <span>{{ planet.name }}</span>
        </div>

        <PlanetListStar
          :show="currLocalStorage.inStorage.includes(planet.name)"
          enter-animation="slide-from-right"
          @set-show="updateLocalStorage(planet)"
        />
      </div>
    </div>
    <InfiniteLoading v-if="!show" @infinite="loadMore" />
  </div>
</template>
