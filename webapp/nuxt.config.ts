import colors from 'tailwindcss/colors'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    config: {
      theme: {
        extend: {
          colors: {
            prova: '#F87171',
            docker: {
              bg: '#0A1A45',
              card: '#16204d',
              accent: '#4D9FFF',
              accent2: '#7DD3FC',
              text: '#FFFFFF',
              text2: '#B6C6E3',
              border: '#22306b',
              error: '#F87171',
              success: '#34D399',
            },
            dockerlight: {
              bg: '#F7FAFC',
              card: '#FFFFFF',
              accent: '#2563EB',
              accent2: '#4D9FFF',
              text: '#1E293B',
              text2: '#64748B',
              border: '#E2E8F0',
              error: '#DC2626',
              success: '#059669',
            }
          }
        }
      }
    }
  }
})