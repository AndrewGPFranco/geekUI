<template>
  <section>
    <h1>
      <div v-if="topic">
        <div
          class="preview-area markdown-preview"
          v-html="renderedMarkdown"
        />
      </div>
      <div v-else>
        <h1>Nada</h1>
      </div>
    </h1>
  </section>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { useRoute } from 'vue-router'
import TopicService from '@/services/TopicService'
import { ref, onMounted, watch, computed } from 'vue'
import type { TopicDTO } from '@/types/interfaces/TopicDTO.ts'

const route = useRoute()
const topic = ref<TopicDTO | null>(null)

const tokenUUID = route.params.uuid

const topicService = new TopicService()

const fetchTopic = async (uuid: unknown) => {
  if (!uuid) return

  try {
    const mapResult = await topicService.getTopicByID(uuid)

    if (!mapResult.getError()) {
      if (mapResult.getResponse() !== null) {
        const response = mapResult.getResponse()

        if (response && typeof response !== 'string' && 'title' in response)
          topic.value = response
      }
    }
  } catch (error) {
    console.error('Erro ao buscar tópico:', error)
  }
}

const renderedMarkdown = computed(() => {
  if (topic.value !== null) {
    if (!topic.value.description.trim())
      return '<p class="empty-content">Nenhum conteúdo para visualizar...</p>'

    try {
      return marked(topic.value.description)
    } catch (error) {
      console.error('Erro ao renderizar markdown:', error)
      return '<p class="error-content">Erro ao renderizar o markdown</p>'
    }
  }

  return '<p class="error-content">Nada a ser renderizado</p>'
})

onMounted(() => {
  fetchTopic(tokenUUID)
})

watch(() => route.params.uuid, (newUUID) => {
  if (newUUID) {
    topic.value = null
    fetchTopic(newUUID)
  }
})
</script>

<style scoped>
section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
}

h1 {
  margin: 0;
}

.preview-area {
  padding: 1.5rem;
  min-height: 500px;
  font-size: 0.875rem;
  line-height: 1.6;
}

.markdown-preview :deep(h1) {
  font-size: 2rem;
  font-weight: bold;
  margin: 1.5rem 0 1rem 0;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.markdown-preview :deep(h2) {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1.25rem 0 0.75rem 0;
}

.markdown-preview :deep(h3) {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}

.markdown-preview :deep(p) {
  margin: 0.75rem 0;
}

.markdown-preview :deep(ul),
.markdown-preview :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
}

.markdown-preview :deep(li) {
  margin: 0.25rem 0;
}

.markdown-preview :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  background: #f8fafc;
  font-style: italic;
}

.markdown-preview :deep(code) {
  background: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875em;
}

.markdown-preview :deep(pre) {
  background: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.markdown-preview :deep(pre code) {
  background: transparent;
  padding: 0;
}

.markdown-preview :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
}

.markdown-preview :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
  margin: 1rem 0;
}

.markdown-preview .empty-content {
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  margin: 2rem 0;
}

.markdown-preview .error-content {
  color: #dc2626;
  background: #fef2f2;
  padding: 1rem;
  border-radius: 0.375rem;
  border: 1px solid #fecaca;
}
</style>
