<template>
  <router-link
    :to="`/topics/${topic.id}`"
    :aria-label="`Ler artigo: ${topic.id}`"
    class="group block"
  >
    <n-card
      class="w-full bg-gradient-to-br from-gray-600 to-gray-700 border border-gray-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-sm hover:scale-[1.02] p-0"
    >
      <div class="rounded-2xl overflow-hidden border-b border-gray-500/40">
        <img
          :src="imageSrc"
          :alt="topic.title"
          class="w-full h-48 object-cover"
        />
      </div>

      <div class="p-4">
        <h3
          class="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {{ truncatedTitle }}
        </h3>
      </div>

      <div class="px-4 pb-4">
        <span
          class="text-xs font-mono text-gray-300 flex items-center gap-1 transition-colors duration-200 group-hover:font-bold group-hover:text-sm"
        >
          Ler artigo <i class="pi pi-chevron-right"></i>
        </span>
      </div>
    </n-card>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NCard } from 'naive-ui'
import type { TopicDTO } from '@/types/interfaces/TopicDTO'

const props = defineProps<{ topic: TopicDTO }>()

const truncatedTitle = computed(() => {
  return props.topic.title.length > 60
    ? props.topic.title.slice(0, 60) + '...'
    : props.topic.title
})

const imageSrc = '/scylla.webp'
</script>
