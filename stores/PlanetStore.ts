import { Planet } from 'types/apiResponse'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlanetStore = defineStore('planet', () => {
  const planets = ref<Planet[]>([] as Planet[])
  const currentPlanet = ref<Planet | null>(null)

  const updatePlanets = (newPlanets: Planet[]) => {
    planets.value.push(...newPlanets)
  }
  const setCurrentPlanet = (planet: Planet) => {
    currentPlanet.value = planet
  }

  return { planets, currentPlanet, updatePlanets, setCurrentPlanet }
})
