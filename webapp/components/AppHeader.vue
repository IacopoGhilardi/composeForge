<template>
  <header class="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200"
    :class="[
      isDark 
        ? 'bg-gray-900/90 backdrop-blur border-gray-800' 
        : 'bg-white/90 backdrop-blur border-gray-200'
    ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo e navigazione sinistra -->
        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <!-- Logo -->
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" 
                :class="isDark ? 'stroke-indigo-400' : 'stroke-indigo-600'"
                stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.5 4.5v2c0 1.1.9 2 2 2h2" 
                :class="isDark ? 'stroke-indigo-400' : 'stroke-indigo-600'"
                stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">
              ComposeForge
            </span>
          </NuxtLink>
        </div>

        <!-- Navigazione destra -->
        <div class="flex items-center space-x-6">
          <!-- GitHub Link -->
          <a href="https://github.com/yourusername/composeforge" 
            target="_blank" 
            rel="noopener noreferrer"
            :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'"
            class="transition-colors duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
            </svg>
          </a>

          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme"
            class="p-2 rounded-full transition-colors duration-200"
            :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'"
          >
            <!-- Sun icon -->
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Moon icon -->
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script> 