<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <h3 class="text-xl font-medium transition-colors" :class="[
        isDark ? 'text-white' : 'text-gray-900'
      ]">Basic Configuration</h3>
      <p class="transition-colors" :class="[
        isDark ? 'text-blue-100/70' : 'text-gray-500'
      ]">Set up the fundamental properties of your Docker Compose file.</p>
    </div>

    <div class="space-y-6">
      <!-- Version Selection -->
      <div>
        <label class="block text-sm font-medium mb-2 transition-colors" :class="[
          isDark ? 'text-blue-100' : 'text-gray-700'
        ]">Docker Compose Version</label>
        <select 
          v-model="store.baseConfig.version"
          class="w-full px-4 py-2 rounded-lg border transition-colors"
          :class="[
            isDark 
              ? 'bg-[#020B2D] border-blue-500/20 text-blue-100 focus:border-[#4D9FFF]' 
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
          ]"
        >
          <option value="3.8">3.8</option>
          <option value="3.7">3.7</option>
          <option value="3.6">3.6</option>
          <option value="3.5">3.5</option>
        </select>
      </div>

      <!-- Project Name -->
      <div>
        <label class="block text-sm font-medium mb-2 transition-colors" :class="[
          isDark ? 'text-blue-100' : 'text-gray-700'
        ]">Project Name</label>
        <input 
          type="text"
          v-model="store.baseConfig.projectName"
          placeholder="my-awesome-project"
          class="w-full px-4 py-2 rounded-lg border transition-colors"
          :class="[
            isDark 
              ? 'bg-[#020B2D] border-blue-500/20 text-blue-100 placeholder-blue-300/30 focus:border-[#4D9FFF]' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
          ]"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium mb-2 transition-colors" :class="[
          isDark ? 'text-blue-100' : 'text-gray-700'
        ]">Description</label>
        <textarea
          v-model="store.baseConfig.description"
          rows="3"
          class="w-full px-4 py-2 rounded-lg border transition-colors"
          :class="[
            isDark 
              ? 'bg-[#020B2D] border-blue-500/20 text-blue-100 placeholder-blue-300/30 focus:border-[#4D9FFF]' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
          ]"
          placeholder="Brief description of your Docker Compose project"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDockerComposeStore } from '~/stores/dockerCompose'
import { useTheme } from '~/composables/useTheme'

const { isDark } = useTheme()
const store = useDockerComposeStore()
</script> 