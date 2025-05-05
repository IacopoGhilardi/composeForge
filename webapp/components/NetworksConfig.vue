<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-medium transition-colors" :class="[
          isDark ? 'text-white' : 'text-gray-900'
        ]">Networks Configuration</h3>
        <p class="transition-colors" :class="[
          isDark ? 'text-blue-100/70' : 'text-gray-500'
        ]">Define custom networks for your services.</p>
      </div>
      <button 
        @click="store.addNetwork"
        class="px-4 py-2 rounded-lg transition-colors border"
        :class="[
          'bg-dockerlight-accent2 dark:bg-docker-accent2',
          'border-dockerlight-accent2 dark:border-docker-accent2',
          'text-dockerlight-accent dark:text-docker-accent',
          'hover:bg-dockerlight-accent dark:hover:bg-docker-accent'
        ]"
      >
        Add Network
      </button>
    </div>

    <div v-if="store.networks.length === 0" 
         class="text-center py-12 rounded-lg border transition-colors"
         :class="[
           'bg-dockerlight-card dark:bg-docker-card',
           'border-dockerlight-border dark:border-docker-border',
           'text-dockerlight-text2 dark:text-docker-text2'
         ]">
      <p>No networks defined yet. Click "Add Network" to begin.</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="(network, index) in store.networks" :key="index" 
           class="p-6 rounded-lg bg-[#020B2D] border border-blue-500/10">
        <div class="flex justify-between items-start mb-6">
          <div class="space-y-4 w-full">
            <!-- Network Name -->
            <div>
              <label class="block text-sm font-medium text-blue-100 mb-2">Network Name</label>
              <input 
                v-model="network.name"
                type="text"
                class="w-full px-4 py-2 rounded-lg bg-[#051042] border border-blue-500/20 
                       text-blue-100 focus:outline-none focus:border-[#4D9FFF] focus:ring-1 focus:ring-[#4D9FFF]
                       placeholder-blue-300/30"
                placeholder="e.g., frontend-network"
              />
            </div>

            <!-- Network Driver -->
            <div>
              <label class="block text-sm font-medium text-blue-100 mb-2">Driver</label>
              <select 
                v-model="network.driver"
                class="w-full px-4 py-2 rounded-lg bg-[#051042] border border-blue-500/20 
                       text-blue-100 focus:outline-none focus:border-[#4D9FFF] focus:ring-1 focus:ring-[#4D9FFF]"
              >
                <option value="bridge">bridge</option>
                <option value="host">host</option>
                <option value="overlay">overlay</option>
                <option value="none">none</option>
              </select>
            </div>

            <!-- Enable IPv6 -->
            <div class="flex items-center space-x-3">
              <input 
                type="checkbox"
                v-model="network.enableIpv6"
                class="w-4 h-4 text-[#4D9FFF] bg-[#051042] border-blue-500/20 
                       rounded focus:ring-[#4D9FFF] focus:ring-offset-0 focus:ring-offset-transparent"
              />
              <label class="text-sm text-blue-100">Enable IPv6</label>
            </div>
          </div>
          <button 
            @click="store.removeNetwork(index)"
            class="text-red-400 hover:text-red-300 transition-colors ml-4"
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
const { isDark } = useTheme()
const store = useDockerComposeStore()
</script> 