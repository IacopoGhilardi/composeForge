<template>
  <div class="min-h-screen relative overflow-hidden transition-colors" :class="[
    isDark ? 'bg-[#010B2D]' : 'bg-gray-50'
  ]">
    <!-- Background Decorations (solo in dark mode) -->
    <div v-if="isDark" class="absolute inset-0">
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      
      <!-- Circles -->
      <div class="absolute top-20 left-10 w-24 h-24 rounded-full bg-blue-500/5 blur-2xl"></div>
      <div class="absolute top-40 right-20 w-32 h-32 rounded-full bg-purple-500/5 blur-2xl"></div>
      
      <!-- Dots Grid -->
      <div class="absolute inset-0" 
           style="background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0);
                  background-size: 40px 40px;">
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Title Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold tracking-tight mb-4" :class="[
            isDark 
              ? 'bg-gradient-to-r from-white to-blue-100 text-transparent bg-clip-text'
              : 'text-gray-900'
          ]">
            Docker Compose Generator
          </h1>
          <p :class="[
            isDark ? 'text-blue-100/70' : 'text-gray-600'
          ]">
            Create your configuration with our interactive builder
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Configuration Form -->
          <div class="rounded-2xl shadow-sm transition-colors" :class="[
            isDark 
              ? 'bg-[#051042]/50 backdrop-blur-sm border border-blue-500/10' 
              : 'bg-white border border-gray-200'
          ]">
            <div class="p-6">
              <!-- Step Navigation -->
              <nav class="flex space-x-1 mb-8 border-b border-blue-500/10">
                <button 
                  v-for="step in steps" 
                  :key="step.id"
                  @click="currentStep = step.id"
                  class="px-6 py-3 text-base font-medium transition-colors relative"
                  :class="[
                    currentStep === step.id 
                      ? 'text-[#4D9FFF]' 
                      : 'text-blue-100/70 hover:text-white'
                  ]"
                >
                  {{ step.name }}
                  <div 
                    v-if="currentStep === step.id"
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-[#4D9FFF]"
                  ></div>
                </button>
              </nav>

              <!-- Dynamic Form Content -->
              <div class="min-h-[400px]">
                <component :is="currentStepComponent" />
              </div>
            </div>
          </div>

          <!-- Preview Panel -->
          <div class="rounded-2xl shadow-sm transition-colors" :class="[
            isDark 
              ? 'bg-[#051042]/50 backdrop-blur-sm border border-blue-500/10' 
              : 'bg-white border border-gray-200'
          ]">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold text-white">Preview</h2>
                <button 
                  @click="copyToClipboard"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl
                         bg-blue-500/10 text-blue-100 hover:bg-blue-500/20 
                         border border-blue-500/20 transition-colors duration-150"
                >
                  Copy to Clipboard
                  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                  </svg>
                </button>
              </div>
              <div class="bg-[#020B2D] rounded-xl p-4 border border-blue-500/10">
                <pre class="text-sm font-mono text-blue-100/90 overflow-auto">{{ generatedConfig }}</pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDockerComposeStore } from '~/stores/dockerCompose'
import BaseConfig from '~/components/BaseConfig.vue'
import ServicesConfig from '~/components/ServicesConfig.vue'
import NetworksConfig from '~/components/NetworksConfig.vue'
import EnvironmentConfig from '~/components/EnvironmentConfig.vue'
import { useTheme } from '~/composables/useTheme'

const store = useDockerComposeStore()
const { isDark } = useTheme()

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