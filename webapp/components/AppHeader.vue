<template>
  <header class="sticky top-0 z-50 w-full transition-colors border-b bg-dockerlight-card dark:bg-docker-card border-dockerlight-border dark:border-docker-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="text-xl font-bold transition-colors" :class="[
            isDark ? 'text-white' : 'text-gray-900'
          ]">ComposeForge</span>
        </NuxtLink>

        <div class="flex items-center space-x-6">
          <nav class="hidden md:flex items-center space-x-6">
            <a 
              href="https://github.com/IacopoGhilardi/composeForge"
              target="_blank"
              class="text-sm font-medium transition-colors"
              :class="[
                isDark ? 'text-dockerlight-accent2 dark:text-docker-accent2 hover:text-white' : 'text-dockerlight-text2 dark:text-docker-text2 hover:text-gray-900'
              ]"
            >
              GitHub
            </a>
          </nav>

          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme"
            class="p-2 rounded-lg transition-colors"
            :class="[
              isDark 
                ? 'bg-dockerlight-accent2 dark:bg-docker-accent2 hover:bg-dockerlight-accent2 dark:hover:bg-docker-accent2' 
                : 'bg-dockerlight-accent dark:bg-docker-accent hover:bg-dockerlight-accent dark:hover:bg-docker-accent'
            ]"
            aria-label="Toggle theme"
          >
            <svg 
              v-if="isDark" 
              class="w-5 h-5 text-dockerlight-accent dark:text-docker-accent" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg 
              v-else 
              class="w-5 h-5 text-gray-600" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          <!-- Get Started Button -->
          <NuxtLink
            to="/generator"
            class="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="[
              isDark 
                ? 'bg-white text-[#010B2D] hover:bg-blue-50' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            ]"
          >
            Get Started
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()
</script> 