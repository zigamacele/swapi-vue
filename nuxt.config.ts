// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/eslint-module'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})