<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-medium transition-colors" :class="[
          isDark ? 'text-white' : 'text-gray-900'
        ]">Environment Variables</h3>
        <p class="transition-colors" :class="[
          isDark ? 'text-blue-100/70' : 'text-gray-500'
        ]">Define global environment variables for your Docker Compose configuration.</p>
      </div>
      <button 
        @click="addVariable"
        class="px-4 py-2 rounded-lg transition-colors border"
        :class="[
          isDark 
            ? 'bg-[#4D9FFF]/10 border-[#4D9FFF]/20 text-[#4D9FFF] hover:bg-[#4D9FFF]/20' 
            : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
        ]"
      >
        Add Variable
      </button>
    </div>

    <div v-if="store.environment.length === 0" 
         class="text-center py-12 rounded-lg border transition-colors"
         :class="[
           isDark 
             ? 'bg-[#020B2D] border-blue-500/10 text-blue-100/70' 
             : 'bg-gray-50 border-gray-200 text-gray-500'
         ]">
      <p>No environment variables defined yet. Click "Add Variable" to begin.</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="(variable, index) in store.environment" :key="index"
           class="p-4 rounded-lg border transition-colors"
           :class="[
             isDark 
               ? 'bg-[#020B2D] border-blue-500/10' 
               : 'bg-white border-gray-200'
           ]">
        <div class="flex gap-4">
          <div class="flex-1">
            <input 
              v-model="variable.key"
              type="text"
              placeholder="Variable name"
              class="w-full px-4 py-2 rounded-lg border transition-colors"
              :class="[
                isDark 
                  ? 'bg-[#0A1A45] border-blue-500/20 text-blue-100 placeholder-blue-300/30 focus:border-[#4D9FFF]' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              ]"
              @input="updateEnvironment"
            />
          </div>
          <div class="flex-1">
            <input 
              v-model="variable.value"
              type="text"
              placeholder="Variable value"
              class="w-full px-4 py-2 rounded-lg border transition-colors"
              :class="[
                isDark 
                  ? 'bg-[#0A1A45] border-blue-500/20 text-blue-100 placeholder-blue-300/30 focus:border-[#4D9FFF]' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              ]"
              @input="updateEnvironment"
            />
          </div>
          <button 
            @click="removeVariable(index)"
            class="p-2 rounded-lg transition-colors"
            :class="[
              isDark 
                ? 'text-red-400 hover:bg-red-500/10' 
                : 'text-red-500 hover:bg-red-50'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- File Upload Section -->
    <div class="mt-8 p-6 border-2 border-dashed rounded-lg text-center transition-colors"
         :class="[
           isDark 
             ? 'border-blue-500/20' 
             : 'border-gray-300'
         ]">
      <div class="space-y-4">
        <svg class="mx-auto h-12 w-12 text-blue-100/40" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="flex text-sm text-blue-100/70 justify-center">
          <label class="relative cursor-pointer bg-[#051042] rounded-md font-medium text-[#4D9FFF] hover:text-[#4D9FFF]/80 px-4 py-2">
            <span>Upload a .env file</span>
            <input type="file" class="sr-only" accept=".env" @change="handleFileUpload">
          </label>
        </div>
        <p class="text-xs text-blue-100/50">or drag and drop</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDockerComposeStore } from '~/stores/dockerCompose'
import { useTheme } from '~/composables/useTheme'

const { isDark } = useTheme()
const store = useDockerComposeStore()

const addVariable = () => {
  store.environment.push({ key: '', value: '' })
}

const removeVariable = (index: number) => {
  store.environment.splice(index, 1)
  updateEnvironment()
}

const updateEnvironment = () => {
  // Aggiorna lo store e l'anteprima
  store.updateEnvironment(store.environment)
}

const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target?.result as string
    const lines = content.split('\n')
    
    lines.forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=')
        const value = valueParts.join('=')
        if (key && value) {
          store.environment.push({
            key: key.trim(),
            value: value.trim(),
            isSecret: false
          })
        }
      }
    })
  }
  reader.readAsText(file)
}
</script> 