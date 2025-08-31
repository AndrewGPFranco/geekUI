<template>
  <div>
    <p v-if="loading" class="loading-text">Carregando tópicos...</p>
    <p v-else-if="!topics.length" class="no-topics-text">Nenhum tópico encontrado.</p>

    <div v-else class="topics-grid">
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
.loading-text,
.no-topics-text {
  color: #9ca3af;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin: 0;
  padding: 1rem 0;
  text-align: center;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  width: 100%;
}

@media (min-width: 640px) {
  .topics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .topics-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .topics-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .topics-grid {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .topics-grid {
    gap: 0.75rem;
  }

  .loading-text,
  .no-topics-text {
    font-size: 0.8125rem;
    padding: 0.75rem 0;
  }
}
</style>
