<script setup lang="ts">
import { usePlanetStore } from '@/stores/PlanetStore'
import { ref, onMounted } from 'vue'
import { PeopleData } from 'types/apiResponse'
import { useRoute } from 'vue-router'

const planetStore = usePlanetStore()
const planet = planetStore.currentPlanet
const residents = ref<PeopleData[] | undefined[]>([])
const loading = ref(false)
const route = useRoute()

const fetchResidents = async () => {
  residents.value = []
  if (planet?.residents.length) {
    loading.value = true
    try {
      const residentPromises = await Promise.all(
        planet.residents.map(async (url) => {
          const personResponse = await fetch(url)

          return personResponse.json()
        }),
      )

      residents.value = residentPromises as PeopleData[] | undefined[]
      loading.value = false
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(() => {
  void fetchResidents()
})
</script>

<template>
  <div
    v-if="planet?.name !== route.params['name']"
    class="fade-in border border-neutral-700 bg-neutral-950 px-10 py-6"
  >
    Navigational Anomaly Detected: Return to Safe Coordinates
  </div>
  <section
    v-if="planetStore.currentPlanet"
    class="slide-from-right flex h-96 w-[22em] flex-col items-center gap-2 border border-neutral-800 bg-neutral-950 p-4 text-neutral-200 sm:w-[30em]"
  >
    <div
      class="flex w-full items-center justify-between gap-2 border-b border-neutral-700 capitalize"
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
    <div v-if="loading">Scanning Planetary Lifesigns and Identities...</div>
    <div v-else-if="!residents.length">
      No Inhabitants Detected: Planet Uncharted by Sentient Life
    </div>
    <div
      v-else
      class="flex flex-col gap-2 divide-y divide-neutral-800 overflow-auto text-center"
    >
      <div
        v-for="(resident, index) in residents"
        :key="index"
        class="fade-in flex flex-col gap-1 p-2 text-sm"
      >
        <span class="text-base">{{ resident?.name }}</span>
        <span class="opacity-60">gender: {{ resident?.gender }}</span>
        <span class="opacity-60">height: {{ resident?.height }}</span>
        <span class="opacity-60">mass: {{ resident?.mass }}</span>
      </div>
    </div>
  </section>
</template>
