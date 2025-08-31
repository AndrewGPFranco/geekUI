<template>
  <div>
    <p v-if="loading" class="text-gray-400 text-sm">Carregando tópicos...</p>
    <p v-else-if="!topics.length" class="text-gray-400 text-sm">Nenhum tópico encontrado.</p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <CardTopic
        v-for="topic in topics"
        :key="topic.id"
        :topic="topic"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import CardTopic from './CardTopic.vue'
import TopicService from '@/services/TopicService'
import type { TopicDTO } from '@/types/interfaces/TopicDTO'

const message = useMessage()
const loading = ref(true)
const topics = ref<TopicDTO[]>([])

const fetchTopics = async () => {
  try {
    const service = new TopicService()
    const response = await service.getAllTopics()

    if (response.getError()) {
      message.error(response.getResponse() as string)
    } else {
      topics.value = response.getResponse() as TopicDTO[]
    }
  } catch (error) {
    console.error('Erro ao buscar tópicos:', error)
    message.error('Ocorreu um erro ao carregar os tópicos.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTopics()
})
</script>

<style scoped>
.grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
