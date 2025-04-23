<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900">Basic Configuration</h3>
      <p class="text-sm text-gray-500">Set up the fundamental properties of your Docker Compose file.</p>
    </div>

    <div class="space-y-4">
      <!-- Version Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Docker Compose Version</label>
        <select 
          v-model="store.baseConfig.version"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="3.8">3.8</option>
          <option value="3.7">3.7</option>
          <option value="3.6">3.6</option>
          <option value="3.5">3.5</option>
        </select>
      </div>

      <!-- Project Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Project Name</label>
        <input 
          type="text"
          v-model="store.baseConfig.projectName"
          placeholder="my-awesome-project"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          v-model="store.baseConfig.description"
          rows="3"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Brief description of your Docker Compose project"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDockerComposeStore } from '~/stores/dockerCompose'

const store = useDockerComposeStore()
</script> 