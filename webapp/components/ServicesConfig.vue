<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-medium transition-colors" :class="[
          isDark ? 'text-white' : 'text-gray-900'
        ]">Services Configuration</h3>
        <p class="transition-colors" :class="[
          isDark ? 'text-blue-100/70' : 'text-gray-500'
        ]">Define the services that will run in your Docker environment.</p>
      </div>
      <button 
        @click="store.addService"
        class="px-4 py-2 rounded-lg transition-colors border"
        :class="[
          isDark 
            ? 'bg-[#4D9FFF]/10 border-[#4D9FFF]/20 text-[#4D9FFF] hover:bg-[#4D9FFF]/20' 
            : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
        ]"
      >
        Add Service
      </button>
    </div>

    <div v-if="store.services.length === 0" 
         class="text-center py-12 rounded-lg border transition-colors"
         :class="[
           isDark 
             ? 'bg-[#020B2D] border-blue-500/10 text-blue-100/70' 
             : 'bg-gray-50 border-gray-200 text-gray-500'
         ]">
      <p>No services defined yet. Click "Add Service" to begin.</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="(service, index) in store.services" :key="index" 
           class="p-6 rounded-lg border transition-colors"
           :class="[
             isDark 
               ? 'bg-[#020B2D] border-blue-500/10' 
               : 'bg-white border-gray-200'
           ]">
        <!-- Service header -->
        <div class="flex justify-between items-start mb-6">
          <h4 class="text-lg font-medium text-white">Service #{{ index + 1 }}</h4>
          <button 
            @click="store.removeService(index)"
            class="text-red-400 hover:text-red-300 transition-colors"
          >
            Remove
          </button>
        </div>

        <!-- Service fields -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-blue-100 mb-2">Service Name</label>
            <input 
              v-model="service.name"
              type="text"
              class="w-full px-4 py-2 rounded-lg bg-[#051042] border border-blue-500/20 
                     text-blue-100 focus:outline-none focus:border-[#4D9FFF] focus:ring-1 focus:ring-[#4D9FFF]
                     placeholder-blue-300/30"
              placeholder="e.g., web, db, redis"
            />
          </div>

          <!-- Image -->
          <div>
            <label class="block text-sm font-medium text-blue-100 mb-2">Image</label>
            <input 
              v-model="service.image"
              type="text"
              class="w-full px-4 py-2 rounded-lg bg-[#051042] border border-blue-500/20 
                     text-blue-100 focus:outline-none focus:border-[#4D9FFF] focus:ring-1 focus:ring-[#4D9FFF]
                     placeholder-blue-300/30"
              placeholder="e.g., nginx:latest"
            />
          </div>

          <!-- Container Name -->
          <div>
            <label class="block text-sm font-medium text-blue-100 mb-2">Container Name</label>
            <input 
              v-model="service.containerName"
              type="text"
              class="w-full px-4 py-2 rounded-lg bg-[#051042] border border-blue-500/20 
                     text-blue-100 focus:outline-none focus:border-[#4D9FFF] focus:ring-1 focus:ring-[#4D9FFF]
                     placeholder-blue-300/30"
              placeholder="e.g., my-web-container"
            />
          </div>

          <!-- Ports -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-blue-100 mb-2">Ports</label>
              <button 
                @click="addPort(service)"
                class="text-sm text-indigo-600 hover:text-indigo-700"
              >
                + Add Port
              </button>
            </div>
            <div class="space-y-2">
              <div v-for="(port, portIndex) in service.ports" :key="portIndex" class="flex gap-2">
                <input 
                  v-model="port.host"
                  type="text"
                  class="w-1/2 px-4 py-2 rounded-lg bg-[#051042] border border-blue-500/20 
                         text-blue-100 focus:outline-none focus:border-[#4D9FFF] focus:ring-1 focus:ring-[#4D9FFF]"
                  placeholder="Host port"
                />
                <span class="flex items-center">:</span>
                <input 
                  v-model="port.container"
                  type="text"
                  class="w-1/2 px-4 py-2 rounded-lg bg-[#051042] border border-blue-500/20 
                         text-blue-100 focus:outline-none focus:border-[#4D9FFF] focus:ring-1 focus:ring-[#4D9FFF]"
                  placeholder="Container port"
                />
                <button 
                  @click="removePort(service, portIndex)"
                  class="text-red-400 hover:text-red-300 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Environment Variables -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-blue-100 mb-2">Environment Variables</label>
              <button 
                @click="addEnv(service)"
                class="text-sm text-indigo-600 hover:text-indigo-700"
              >
                + Add Variable
              </button>
            </div>
            <div class="space-y-2">
              <div v-for="(env, envIndex) in service.environment" :key="envIndex" class="flex gap-2">
                <input 
                  v-model="env.key"
                  type="text"
                  class="w-1/2 px-4 py-2 rounded-lg bg-[#051042] border border-blue-500/20 
                         text-blue-100 focus:outline-none focus:border-[#4D9FFF] focus:ring-1 focus:ring-[#4D9FFF]"
                  placeholder="Key"
                />
                <input 
                  v-model="env.value"
                  type="text"
                  class="w-1/2 px-4 py-2 rounded-lg bg-[#051042] border border-blue-500/20 
                         text-blue-100 focus:outline-none focus:border-[#4D9FFF] focus:ring-1 focus:ring-[#4D9FFF]"
                  placeholder="Value"
                />
                <button 
                  @click="removeEnv(service, envIndex)"
                  class="text-red-400 hover:text-red-300 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDockerComposeStore } from '~/stores/dockerCompose'
const { isDark } = useTheme()
const store = useDockerComposeStore()

const addPort = (service: any) => {
  if (!service.ports) service.ports = []
  service.ports.push({ host: '', container: '' })
}

const removePort = (service: any, index: number) => {
  service.ports.splice(index, 1)
}

const addEnv = (service: any) => {
  if (!service.environment) service.environment = []
  service.environment.push({ key: '', value: '' })
}

const removeEnv = (service: any, index: number) => {
  service.environment.splice(index, 1)
}
</script> 