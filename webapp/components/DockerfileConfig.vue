<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-medium transition-colors" :class="[
          isDark ? 'text-white' : 'text-gray-900'
        ]">Dockerfile Configuration</h3>
        <p class="transition-colors" :class="[
          isDark ? 'text-blue-100/70' : 'text-gray-500'
        ]">Define the Dockerfile for each service.</p>
      </div>
    </div>

    <div v-for="(service, serviceIndex) in store.services" :key="serviceIndex"
         class="p-6 rounded-lg border transition-colors space-y-4"
         :class="[
           'bg-dockerlight-card dark:bg-docker-card',
           'border-dockerlight-border dark:border-docker-border'
         ]">
      <h4 class="font-medium" :class="['text-dockerlight-text dark:text-docker-text']">
        Dockerfile for {{ service.name }}
      </h4>
      
      <!-- Base Image -->
      <div class="space-y-2">
        <label class="block text-sm font-medium" :class="[isDark ? 'text-blue-100' : 'text-gray-700']">
          Base Image
        </label>
        <div class="flex gap-4">
          <input 
            v-model="service.dockerfile.baseImage"
            type="text"
            placeholder="e.g., node:18-alpine"
            class="flex-1 px-4 py-2 rounded-lg border transition-colors"
            :class="[
              'bg-dockerlight-card dark:bg-docker-card',
              'border-dockerlight-border dark:border-docker-border',
              'text-dockerlight-text dark:text-docker-text',
              'placeholder-dockerlight-text2 dark:placeholder-docker-text2',
              'focus:border-dockerlight-accent dark:focus:border-docker-accent'
            ]"
          />
          <select 
            v-model="service.dockerfile.baseImageTag"
            class="px-4 py-2 rounded-lg border transition-colors"
            :class="[
              'bg-dockerlight-card dark:bg-docker-card',
              'border-dockerlight-border dark:border-docker-border',
              'text-dockerlight-text dark:text-docker-text',
              'focus:border-dockerlight-accent dark:focus:border-docker-accent'
            ]"
          >
            <option value="latest">latest</option>
            <option value="alpine">alpine</option>
            <option value="slim">slim</option>
          </select>
        </div>
      </div>

      <!-- Working Directory -->
      <div class="space-y-2">
        <label class="block text-sm font-medium" :class="[isDark ? 'text-blue-100' : 'text-gray-700']">
          Working Directory
        </label>
        <input 
          v-model="service.dockerfile.workdir"
          type="text"
          placeholder="/app"
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

      <!-- Copy Files -->
      <div class="space-y-2">
        <label class="block text-sm font-medium" :class="[isDark ? 'text-blue-100' : 'text-gray-700']">
          Files to Copy
        </label>
        <div class="space-y-2">
          <div v-for="(copy, index) in service.dockerfile.copy" :key="index"
               class="flex gap-4">
            <input 
              v-model="copy.src"
              type="text"
              placeholder="Source path"
              class="flex-1 px-4 py-2 rounded-lg border transition-colors"
              :class="[
                'bg-dockerlight-card dark:bg-docker-card',
                'border-dockerlight-border dark:border-docker-border',
                'text-dockerlight-text dark:text-docker-text',
                'placeholder-dockerlight-text2 dark:placeholder-docker-text2',
                'focus:border-dockerlight-accent dark:focus:border-docker-accent'
              ]"
            />
            <input 
              v-model="copy.dest"
              type="text"
              placeholder="Destination path"
              class="flex-1 px-4 py-2 rounded-lg border transition-colors"
              :class="[
                'bg-dockerlight-card dark:bg-docker-card',
                'border-dockerlight-border dark:border-docker-border',
                'text-dockerlight-text dark:text-docker-text',
                'placeholder-dockerlight-text2 dark:placeholder-docker-text2',
                'focus:border-dockerlight-accent dark:focus:border-docker-accent'
              ]"
            />
            <button 
              @click="removeCopyPath(serviceIndex, index)"
              class="p-2 rounded-lg transition-colors"
              :class="[
                'text-red-400 hover:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/10'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <button 
            @click="addCopyPath(serviceIndex)"
            class="px-4 py-2 rounded-lg transition-colors border text-sm"
            :class="[
              'bg-dockerlight-accent2 dark:bg-docker-accent2',
              'border-dockerlight-accent2 dark:border-docker-accent2',
              'text-dockerlight-accent dark:text-docker-accent',
              'hover:bg-dockerlight-accent dark:hover:bg-docker-accent'
            ]"
          >
            Add File to Copy
          </button>
        </div>
      </div>

      <!-- Run Commands -->
      <div class="space-y-2">
        <label class="block text-sm font-medium" :class="[isDark ? 'text-blue-100' : 'text-gray-700']">
          Run Commands
        </label>
        <div class="space-y-2">
          <div v-for="(cmd, index) in service.dockerfile.run" :key="index"
               class="flex gap-4">
            <input 
              v-model="service.dockerfile.run[index]"
              type="text"
              placeholder="e.g., npm install"
              class="flex-1 px-4 py-2 rounded-lg border transition-colors"
              :class="[
                'bg-dockerlight-card dark:bg-docker-card',
                'border-dockerlight-border dark:border-docker-border',
                'text-dockerlight-text dark:text-docker-text',
                'placeholder-dockerlight-text2 dark:placeholder-docker-text2',
                'focus:border-dockerlight-accent dark:focus:border-docker-accent'
              ]"
            />
            <button 
              @click="removeRunCommand(serviceIndex, index)"
              class="p-2 rounded-lg transition-colors"
              :class="[
                'text-red-400 hover:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/10'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <button 
            @click="addRunCommand(serviceIndex)"
            class="px-4 py-2 rounded-lg transition-colors border text-sm"
            :class="[
              'bg-dockerlight-accent2 dark:bg-docker-accent2',
              'border-dockerlight-accent2 dark:border-docker-accent2',
              'text-dockerlight-accent dark:text-docker-accent',
              'hover:bg-dockerlight-accent dark:hover:bg-docker-accent'
            ]"
          >
            Add Run Command
          </button>
        </div>
      </div>

      <!-- CMD -->
      <div class="space-y-2">
        <label class="block text-sm font-medium" :class="[isDark ? 'text-blue-100' : 'text-gray-700']">
          CMD (Start Command)
        </label>
        <input 
          v-model="service.dockerfile.cmd"
          type="text"
          placeholder="e.g., npm start"
          class="w-full px-4 py-2 rounded-lg border transition-colors"
          :class="[
            isDark 
              ? 'bg-[#0A1A45] border-blue-500/20 text-blue-100 placeholder-blue-300/30 focus:border-[#4D9FFF]' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDockerComposeStore } from '~/stores/dockerCompose'

const { isDark } = useTheme()
const store = useDockerComposeStore()

const addCopyPath = (serviceIndex: number) => {
  store.services[serviceIndex].dockerfile.copy.push({ src: '', dest: '' })
}

const removeCopyPath = (serviceIndex: number, copyIndex: number) => {
  store.services[serviceIndex].dockerfile.copy.splice(copyIndex, 1)
}

const addRunCommand = (serviceIndex: number) => {
  store.services[serviceIndex].dockerfile.run.push('')
}

const removeRunCommand = (serviceIndex: number, cmdIndex: number) => {
  store.services[serviceIndex].dockerfile.run.splice(cmdIndex, 1)
}
</script> 