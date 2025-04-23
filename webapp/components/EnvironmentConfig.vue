<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Environment Variables</h3>
        <p class="text-sm text-gray-500">Define global environment variables for your Docker Compose configuration.</p>
      </div>
      <button 
        @click="addVariable"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add Variable
      </button>
    </div>

    <div v-if="variables.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <p class="text-gray-500">No environment variables defined yet. Click "Add Variable" to begin.</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="(variable, index) in variables" :key="index" class="flex gap-4 items-start">
        <div class="flex-grow grid grid-cols-2 gap-4">
          <!-- Variable Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Variable Name</label>
            <input 
              v-model="variable.key"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., DATABASE_URL"
            />
          </div>

          <!-- Variable Value -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Value</label>
            <input 
              v-model="variable.value"
              :type="variable.isSecret ? 'password' : 'text'"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Variable value"
            />
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center space-x-4 pt-6">
          <button 
            @click="toggleSecret(index)"
            class="text-gray-600 hover:text-gray-700"
            :title="variable.isSecret ? 'Show value' : 'Hide value'"
          >
            <span v-if="variable.isSecret">👁️</span>
            <span v-else>🔒</span>
          </button>
          <button 
            @click="removeVariable(index)"
            class="text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <!-- File Upload -->
    <div class="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="mt-4 flex text-sm text-gray-600 justify-center">
          <label class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
            <span>Upload a .env file</span>
            <input 
              type="file" 
              class="sr-only"
              accept=".env"
              @change="handleFileUpload"
            >
          </label>
        </div>
        <p class="text-xs text-gray-500">or drag and drop</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface EnvVariable {
  key: string
  value: string
  isSecret: boolean
}

const variables = ref<EnvVariable[]>([])

const addVariable = () => {
  variables.value.push({
    key: '',
    value: '',
    isSecret: false
  })
}

const removeVariable = (index: number) => {
  variables.value.splice(index, 1)
}

const toggleSecret = (index: number) => {
  variables.value[index].isSecret = !variables.value[index].isSecret
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
          variables.value.push({
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