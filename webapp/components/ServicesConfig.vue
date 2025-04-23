<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Services Configuration</h3>
        <p class="text-sm text-gray-500">Define the services that will run in your Docker environment.</p>
      </div>
      <button 
        @click="store.addService"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add Service
      </button>
    </div>

    <div v-if="store.services.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <p class="text-gray-500">No services defined yet. Click "Add Service" to begin.</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="(service, index) in store.services" :key="index" class="bg-gray-50 p-6 rounded-lg">
        <div class="flex justify-between items-start mb-4">
          <h4 class="text-lg font-medium text-gray-900">Service #{{ index + 1 }}</h4>
          <button 
            @click="store.removeService(index)"
            class="text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>

        <!-- Service Configuration -->
        <div class="space-y-4">
          <!-- Service Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Service Name</label>
            <input 
              v-model="service.name"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., web, db, redis"
            />
          </div>

          <!-- Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Image</label>
            <input 
              v-model="service.image"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., nginx:latest"
            />
          </div>

          <!-- Container Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Container Name</label>
            <input 
              v-model="service.containerName"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., my-web-container"
            />
          </div>

          <!-- Ports -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700">Ports</label>
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
                  class="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Host port"
                />
                <span class="flex items-center">:</span>
                <input 
                  v-model="port.container"
                  type="text"
                  class="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Container port"
                />
                <button 
                  @click="removePort(service, portIndex)"
                  class="text-red-600 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Environment Variables -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700">Environment Variables</label>
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
                  class="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Key"
                />
                <input 
                  v-model="env.value"
                  type="text"
                  class="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Value"
                />
                <button 
                  @click="removeEnv(service, envIndex)"
                  class="text-red-600 hover:text-red-700"
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