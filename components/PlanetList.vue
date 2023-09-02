<script setup lang="ts">
import { ref } from 'vue'

const showFavorites = ref<boolean>(false)
</script>

<template>
  <section class="fade-in flex flex-col gap-2 sm:flex-row">
    <PlanetListBox v-if="!showFavorites" :show="showFavorites" />
    <PlanetListBox v-else :show="showFavorites" />
    <PlanetListStar
      :show="showFavorites"
      classes="h-8 w-8 cursor-pointer border border-neutral-700 bg-neutral-950 p-1 text-neutral-400 hover:border-neutral-400 hover:bg-neutral-600 hover:text-neutral-50"
      enter-animation="slide-from-left"
      @set-show="showFavorites = !showFavorites"
    />
  </section>
</template>
