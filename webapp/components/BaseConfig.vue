<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <h3 class="text-xl font-medium transition-colors"
          :class="['text-dockerlight-text dark:text-docker-text']">
        Basic Configuration
      </h3>
      <p class="transition-colors"
         :class="['text-dockerlight-text2 dark:text-docker-text2']">
        Set up the fundamental properties of your Docker Compose file.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Version Selection -->
      <div>
        <label class="block text-sm font-medium mb-2 transition-colors"
               :class="['text-dockerlight-text2 dark:text-docker-text2']">
          Docker Compose Version
        </label>
        <select 
          v-model="store.baseConfig.version"
          class="w-full px-4 py-2 rounded-lg border transition-colors"
          :class="[
            'bg-dockerlight-card dark:bg-docker-card',
            'border-dockerlight-border dark:border-docker-border',
            'text-dockerlight-text dark:text-docker-text',
            'focus:border-dockerlight-accent dark:focus:border-docker-accent'
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
        <label class="block text-sm font-medium mb-2 transition-colors"
               :class="['text-dockerlight-text2 dark:text-docker-text2']">
          Project Name
        </label>
        <input 
          type="text"
          v-model="store.baseConfig.projectName"
          placeholder="my-awesome-project"
          class="w-full px-4 py-2 rounded-lg border transition-colors"
          :class="[
            'bg-dockerlight-card dark:bg-docker-card',
            'border-dockerlight-border dark:border-docker-border',
            'text-dockerlight-text dark:text-docker-text',
            'placeholder-dockerlight-text2 dark:placeholder-docker-text2',
            'focus:border-dockerlight-accent dark:focus:border-docker-accent'
          ]"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium mb-2 transition-colors"
               :class="['text-dockerlight-text2 dark:text-docker-text2']">
          Description
        </label>
        <textarea
          v-model="store.baseConfig.description"
          rows="3"
          class="w-full px-4 py-2 rounded-lg border transition-colors"
          :class="[
            'bg-dockerlight-card dark:bg-docker-card',
            'border-dockerlight-border dark:border-docker-border',
            'text-dockerlight-text dark:text-docker-text',
            'placeholder-dockerlight-text2 dark:placeholder-docker-text2',
            'focus:border-dockerlight-accent dark:focus:border-docker-accent'
          ]"
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