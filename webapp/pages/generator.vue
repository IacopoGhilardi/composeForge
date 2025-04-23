<template>
  <div class="min-h-screen bg-white dark:bg-[#020B2D]">
    <!-- Header con logo e tema -->
    <header class="border-b border-gray-200 dark:border-blue-900/40 bg-white dark:bg-[#020B2D]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-2">
            <img src="" alt="ComposeForge" class="h-8 w-8" />
            <span class="text-lg font-semibold text-gray-800 dark:text-white">ComposeForge</span>
          </div>
          <button 
            @click="toggleTheme"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-blue-900/20"
          >
            <svg v-if="isDark" class="w-5 h-5 text-[#4D9FFF]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
            </svg>
            <svg v-else class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">
          Docker Compose Generator
        </h1>
        <p class="mt-2 text-gray-600 dark:text-blue-100/70">
          Create your configuration with our interactive builder
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left panel: Configuration -->
        <div class="bg-white dark:bg-[#051042] rounded-lg shadow-sm dark:shadow-blue-900/20">
          <!-- Tabs -->
          <div class="border-b border-gray-200 dark:border-blue-900/40">
            <nav class="flex -mb-px">
              <button 
                v-for="step in steps" 
                :key="step.id"
                @click="currentStep = step.id"
                class="px-4 py-3 text-sm font-medium border-b-2 transition-colors"
                :class="[
                  currentStep === step.id 
                    ? 'border-[#4D9FFF] text-[#4D9FFF] dark:text-[#4D9FFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-blue-100/70 dark:hover:text-white'
                ]"
              >
                {{ step.name }}
              </button>
            </nav>
          </div>

          <!-- Form content -->
          <div class="p-6">
            <component :is="currentStepComponent" />
          </div>
        </div>

        <!-- Right panel: Preview -->
        <div class="bg-white dark:bg-[#051042] rounded-lg shadow-sm dark:shadow-blue-900/20">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium text-gray-800 dark:text-white">
                Preview
              </h2>
              <button 
                @click="copyToClipboard"
                class="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md
                       text-gray-700 bg-gray-100 hover:bg-gray-200
                       dark:text-white dark:bg-[#4D9FFF]/10 dark:hover:bg-[#4D9FFF]/20
                       transition-colors duration-150"
              >
                Copy to Clipboard
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                </svg>
              </button>
            </div>
            <div class="bg-gray-50 dark:bg-[#020B2D] rounded-lg p-4">
              <pre class="text-sm font-mono text-gray-800 dark:text-blue-100/90 overflow-auto">{{ generatedConfig }}</pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDockerComposeStore } from '~/stores/dockerCompose'
import BaseConfig from '~/components/BaseConfig.vue'
import ServicesConfig from '~/components/ServicesConfig.vue'
import NetworksConfig from '~/components/NetworksConfig.vue'
import EnvironmentConfig from '~/components/EnvironmentConfig.vue'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const store = useDockerComposeStore()

const steps = [
  { id: 'base', name: 'Base', component: BaseConfig },
  { id: 'services', name: 'Services', component: ServicesConfig },
  { id: 'networks', name: 'Networks', component: NetworksConfig },
  { id: 'environment', name: 'Environment', component: EnvironmentConfig }
]

const currentStep = ref('base')

const currentStepComponent = computed(() => {
  const step = steps.find(s => s.id === currentStep.value)
  return step?.component || BaseConfig
})

const generatedConfig = computed(() => {
  return store.generateDockerCompose()
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedConfig.value)
    // TODO: Add success notification
  } catch (err) {
    // TODO: Add error notification
  }
}
</script> 