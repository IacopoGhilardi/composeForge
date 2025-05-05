<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-xl font-medium transition-colors" :class="[
          isDark ? 'text-white' : 'text-gray-900'
        ]">Services Configuration</h3>
        <p class="transition-colors" :class="[
          isDark ? 'text-blue-100/70' : 'text-gray-500'
        ]">Define the services for your Docker Compose configuration.</p>
      </div>
      <button 
        @click="store.addService"
        class="px-4 py-2 rounded-lg transition-colors border"
        :class="[
          'bg-dockerlight-accent2 dark:bg-docker-accent2',
          'border-dockerlight-accent2 dark:border-docker-accent2',
          'text-dockerlight-accent dark:text-docker-accent',
          'hover:bg-dockerlight-accent dark:hover:bg-docker-accent'
        ]"
      >
        Add Service
      </button>
    </div>

    <div v-if="store.services.length === 0" 
         class="text-center py-12 rounded-lg border transition-colors"
         :class="[
           'bg-dockerlight-card dark:bg-docker-card',
           'border-dockerlight-border dark:border-docker-border',
           'text-dockerlight-text2 dark:text-docker-text2'
         ]">
      <p>No services defined yet. Click "Add Service" to begin.</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="(service, index) in store.services" :key="index" 
           class="p-6 rounded-lg border transition-colors"
           :class="[
             'bg-dockerlight-card dark:bg-docker-card',
             'border-dockerlight-border dark:border-docker-border'
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

        <!-- Service Name -->
        <div class="space-y-2">
          <label class="block text-sm font-medium" :class="[isDark ? 'text-blue-100' : 'text-gray-700']">
            Service Name
          </label>
          <input 
            v-model="service.name"
            type="text"
            placeholder="e.g., web, api, db"
            class="w-full px-4 py-2 rounded-lg border transition-colors"
            :class="getInputClasses()"
          />
        </div>

        <!-- Build/Image Selection -->
        <div class="space-y-4">
          <label class="block text-sm font-medium" :class="[isDark ? 'text-blue-100' : 'text-gray-700']">
            Container Source
          </label>
          <div class="flex space-x-4">
            <label class="flex items-center space-x-2">
              <input 
                type="radio" 
                v-model="service.containerSource" 
                value="image"
                class="text-blue-600"
              />
              <span :class="[isDark ? 'text-blue-100' : 'text-gray-700']">Use Existing Image</span>
            </label>
            <label class="flex items-center space-x-2">
              <input 
                type="radio" 
                v-model="service.containerSource" 
                value="dockerfile"
                class="text-blue-600"
              />
              <span :class="[isDark ? 'text-blue-100' : 'text-gray-700']">Custom Dockerfile</span>
            </label>
            <label class="flex items-center space-x-2">
              <input 
                type="radio" 
                v-model="service.containerSource" 
                value="build"
                class="text-blue-600"
              />
              <span :class="[isDark ? 'text-blue-100' : 'text-gray-700']">Custom Build</span>
            </label>
          </div>

          <!-- Image Configuration -->
          <div v-if="service.containerSource === 'image'" class="space-y-2">
            <input 
              v-model="service.image"
              type="text"
              placeholder="e.g., nginx:latest"
              class="w-full px-4 py-2 rounded-lg border transition-colors"
              :class="getInputClasses()"
            />
          </div>

          <!-- Build Configuration -->
          <div v-if="service.containerSource === 'build'" class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium" :class="[isDark ? 'text-blue-100' : 'text-gray-700']">
                Build Context
              </label>
              <input 
                v-model="service.build.context"
                type="text"
                placeholder="e.g., ./app"
                class="w-full px-4 py-2 rounded-lg border transition-colors"
                :class="getInputClasses()"
              />
            </div>

            <!-- Build Arguments -->
            <div class="space-y-2">
              <label class="block text-sm font-medium" :class="[isDark ? 'text-blue-100' : 'text-gray-700']">
                Build Arguments
              </label>
              <div v-for="(arg, argIndex) in service.build.args" :key="argIndex" class="flex gap-4 mt-2">
                <input 
                  v-model="arg.key"
                  type="text"
                  placeholder="ARG name"
                  class="flex-1 px-4 py-2 rounded-lg border transition-colors"
                  :class="getInputClasses()"
                />
                <input 
                  v-model="arg.value"
                  type="text"
                  placeholder="ARG value"
                  class="flex-1 px-4 py-2 rounded-lg border transition-colors"
                  :class="getInputClasses()"
                />
                <button 
                  @click="removeBuildArg(index, argIndex)"
                  class="p-2 rounded-lg transition-colors"
                  :class="getDeleteButtonClasses()"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <button 
                @click="addBuildArg(index)"
                class="mt-2 px-4 py-2 rounded-lg transition-colors border text-sm"
                :class="getSecondaryButtonClasses()"
              >
                Add Build Argument
              </button>
            </div>
          </div>
        </div>

        <!-- Volumes Configuration -->
        <div class="space-y-4">
          <label class="block text-sm font-medium" :class="[isDark ? 'text-blue-100' : 'text-gray-700']">
            Volumes
          </label>
          
          <!-- Named Volumes -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm" :class="[isDark ? 'text-blue-100/70' : 'text-gray-600']">Named Volumes</span>
              <button 
                @click="addNamedVolume(index)"
                class="px-4 py-2 rounded-lg transition-colors border text-sm"
                :class="getSecondaryButtonClasses()"
              >
                Add Named Volume
              </button>
            </div>
            <div v-for="(volume, volIndex) in service.volumes.named" :key="volIndex" class="flex gap-4">
              <input 
                v-model="volume.name"
                type="text"
                placeholder="Volume name"
                class="flex-1 px-4 py-2 rounded-lg border transition-colors"
                :class="getInputClasses()"
              />
              <input 
                v-model="volume.mountPath"
                type="text"
                placeholder="Container path"
                class="flex-1 px-4 py-2 rounded-lg border transition-colors"
                :class="getInputClasses()"
              />
              <button 
                @click="removeNamedVolume(index, volIndex)"
                class="p-2 rounded-lg transition-colors"
                :class="getDeleteButtonClasses()"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Bind Mounts -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm" :class="[isDark ? 'text-blue-100/70' : 'text-gray-600']">Bind Mounts</span>
              <button 
                @click="addBindMount(index)"
                class="px-4 py-2 rounded-lg transition-colors border text-sm"
                :class="getSecondaryButtonClasses()"
              >
                Add Bind Mount
              </button>
            </div>
            <div v-for="(mount, mountIndex) in service.volumes.binds" :key="mountIndex" class="flex gap-4">
              <input 
                v-model="mount.source"
                type="text"
                placeholder="Host path"
                class="flex-1 px-4 py-2 rounded-lg border transition-colors"
                :class="getInputClasses()"
              />
              <input 
                v-model="mount.target"
                type="text"
                placeholder="Container path"
                class="flex-1 px-4 py-2 rounded-lg border transition-colors"
                :class="getInputClasses()"
              />
              <select 
                v-model="mount.mode"
                class="px-4 py-2 rounded-lg border transition-colors"
                :class="getInputClasses()"
              >
                <option value="rw">Read-Write</option>
                <option value="ro">Read-Only</option>
              </select>
              <button 
                @click="removeBindMount(index, mountIndex)"
                class="p-2 rounded-lg transition-colors"
                :class="getDeleteButtonClasses()"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
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
</template>

<script setup lang="ts">
import { useDockerComposeStore } from '~/stores/dockerCompose'
const { isDark } = useTheme()
const store = useDockerComposeStore()

const getInputClasses = () => {
  return isDark 
    ? 'bg-[#0A1A45] border-blue-500/20 text-blue-100 placeholder-blue-300/30 focus:border-[#4D9FFF]' 
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
}

const getDeleteButtonClasses = () => {
  return isDark 
    ? 'text-red-400 hover:bg-red-500/10' 
    : 'text-red-500 hover:bg-red-50'
}

const getSecondaryButtonClasses = () => {
  return isDark 
    ? 'bg-[#4D9FFF]/10 border-[#4D9FFF]/20 text-[#4D9FFF] hover:bg-[#4D9FFF]/20' 
    : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
}

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

const addNamedVolume = (serviceIndex: number) => {
  store.services[serviceIndex].volumes.named.push({ name: '', mountPath: '' })
}

const removeNamedVolume = (serviceIndex: number, volumeIndex: number) => {
  store.services[serviceIndex].volumes.named.splice(volumeIndex, 1)
}

const addBindMount = (serviceIndex: number) => {
  store.services[serviceIndex].volumes.binds.push({ 
    source: '', 
    target: '', 
    mode: 'rw' 
  })
}

const removeBindMount = (serviceIndex: number, mountIndex: number) => {
  store.services[serviceIndex].volumes.binds.splice(mountIndex, 1)
}

const addBuildArg = (serviceIndex: number) => {
  store.services[serviceIndex].build.args.push({ key: '', value: '' })
}

const removeBuildArg = (serviceIndex: number, argIndex: number) => {
  store.services[serviceIndex].build.args.splice(argIndex, 1)
}
</script> 