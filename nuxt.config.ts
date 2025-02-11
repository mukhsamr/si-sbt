// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    'nuxt-lodash',
  ],
  plugins: [
    '~/plugins/preline.client.ts'
  ],
  runtimeConfig: {
    public: {
      apiApp: 'https://si-app.test/api/app',
      apiBase: 'https://si-app.test/api/sbt',
    }
  },
})
