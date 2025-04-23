<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Networks Configuration</h3>
        <p class="text-sm text-gray-500">Define custom networks for your services.</p>
      </div>
      <button 
        @click="store.addNetwork"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add Network
      </button>
    </div>

    <div v-if="store.networks.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <p class="text-gray-500">No networks defined yet. Click "Add Network" to begin.</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="(network, index) in store.networks" :key="index" class="bg-gray-50 p-6 rounded-lg">
        <div class="flex justify-between items-start mb-4">
          <div class="space-y-4 w-full">
            <!-- Network Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Network Name</label>
              <input 
                v-model="network.name"
                type="text"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., frontend-network"
              />
            </div>

            <!-- Network Driver -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Driver</label>
              <select 
                v-model="network.driver"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="bridge">bridge</option>
                <option value="host">host</option>
                <option value="overlay">overlay</option>
                <option value="none">none</option>
              </select>
            </div>

            <!-- Enable IPv6 -->
            <div class="flex items-center">
              <input 
                type="checkbox"
                v-model="network.enableIpv6"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-700">Enable IPv6</label>
            </div>
          </div>
          <button 
            @click="store.removeNetwork(index)"
            class="text-red-600 hover:text-red-700 ml-4"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDockerComposeStore } from '~/stores/dockerCompose'

const store = useDockerComposeStore()
</script> 