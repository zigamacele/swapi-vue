<script setup lang="ts">
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid'
import { StarIcon as StarOutline } from '@heroicons/vue/24/outline'

defineProps({
  show: Boolean,
  classes: {
    type: String,
    default: 'h-4 w-4 cursor-pointer text-neutral-400 hover:text-neutral-50',
  },
  enterAnimation: {
    type: String,
    default: 'slide-from-left',
  },
})

defineEmits(['setShow'])
</script>

<template>
  <span :class="enterAnimation">
    <StarOutline v-if="!show" :class="classes" @click="$emit('setShow')" />
    <StarSolid v-else :class="classes" @click="$emit('setShow')" />
  </span>
</template>
