<template>
  <div class="min-h-screen relative overflow-hidden transition-colors" 
       :class="[isDark ? 'bg-docker-bg' : 'bg-gradient-to-b from-gray-50 to-white']">
    <!-- Decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Soft gradient circles -->
      <template v-if="isDark">
        <div class="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div class="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div class="absolute bottom-0 left-1/3 w-96 h-96 bg-[#4D9FFF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </template>
      <template v-else>
        <div class="absolute -top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div class="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div class="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </template>
      
      <!-- Subtle grid pattern -->
      <div class="absolute inset-0" 
           :style="{
             backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#1a2547' : '#e5e7eb'} 1px, transparent 0)`,
             backgroundSize: '40px 40px',
             opacity: '0.2'
           }">
      </div>
    </div>

    <!-- Main content -->
    <div class="relative z-10">
      <!-- Hero section -->
      <div class="text-center max-w-5xl mx-auto px-4 pt-20 pb-16">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight">
          <span class="text-dockerlight-text dark:text-docker-text">Create Docker Compose</span><br/>
          <span class="text-dockerlight-accent dark:text-docker-accent">configurations easily</span>
        </h1>
        <p class="mt-6 text-lg text-dockerlight-text2 dark:text-docker-text2 max-w-3xl mx-auto">
          Create production-ready Docker Compose configurations in minutes, not hours. No more manual editing of YAML files.
        </p>
        <div class="mt-10">
          <NuxtLink to="/generator" 
            class="inline-flex items-center px-6 py-3 rounded-lg bg-dockerlight-accent dark:bg-docker-accent text-white hover:bg-dockerlight-accent2 dark:hover:bg-docker-accent2 transition-colors">
            Start Building
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Why Choose section -->
      <div class="py-16">
        <h2 class="text-3xl font-bold text-center transition-colors mb-4"
            :class="isDark ? 'text-white' : 'text-gray-800'">
          Why Choose ComposeForge?
        </h2>
        <p class="text-center transition-colors mb-16"
           :class="isDark ? 'text-blue-100/70' : 'text-gray-600'">
          Everything you need to create perfect Docker Compose files
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          <div v-for="feature in features" :key="feature.title" 
               class="flex flex-col items-center text-center space-y-4 p-6 rounded-xl transition-all"
               :class="isDark ? 'bg-[#0A1A45]/50 hover:bg-[#0A1A45]/70' : 'bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md'">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center"
                 :class="isDark ? 'bg-[#4D9FFF]/10' : 'bg-blue-50'">
              <svg xmlns="http://www.w3.org/2000/svg" 
                   class="w-8 h-8 transition-colors"
                   :class="isDark ? 'text-[#4D9FFF]' : 'text-blue-600'"
                   viewBox="0 0 24 24" 
                   fill="none" 
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold transition-colors"
                :class="isDark ? 'text-white' : 'text-gray-800'">
              {{ feature.title }}
            </h3>
            <p class="transition-colors"
               :class="isDark ? 'text-blue-100/70' : 'text-gray-600'">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Join section -->
      <div class="py-16 text-center">
        <h2 class="text-3xl font-bold mb-8 transition-colors"
            :class="isDark ? 'text-white' : 'text-gray-800'">
          Join thousands of developers who trust ComposeForge
        </h2>
        <NuxtLink to="/generator" 
          class="inline-flex items-center px-6 py-3 rounded-lg transition-colors"
          :class="isDark ? 'bg-[#4D9FFF] text-white hover:bg-[#4D9FFF]/90' : 'bg-blue-600 text-white hover:bg-blue-700'">
          Get Started for Free
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isDark } = useTheme()

const features = [
  {
    title: 'Lightning Fast',
    description: 'Create complex Docker Compose configurations in minutes with our intuitive interface.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Best Practices',
    description: 'Built-in validation and best practices ensure your configurations are production-ready.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Version Control',
    description: 'Save and version your configurations, share them with your team.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  }
]
</script> 