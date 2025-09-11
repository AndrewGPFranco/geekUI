<template>
  <section class="article-container">
    <div v-if="topic" class="article-content">
      <header class="article-header">
        <h1 class="article-title">{{ topic.title }}</h1>

        <div class="article-meta">
          <div class="meta-item">
            <span class="meta-icon">✍️</span>
            <span class="meta-text">{{ topic.usernameCreator }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">📅</span>
            <span class="meta-text">{{ formatDate(topic.createdAt) }}</span>
          </div>
          <div v-if="topic.updatedAt && topic.updatedAt !== topic.createdAt" class="meta-item">
            <span class="meta-icon">🔄</span>
            <span class="meta-text">Atualizado em {{ formatDate(topic.updatedAt) }}</span>
          </div>
        </div>

        <div class="article-tags" v-if="topic.tags?.length">
          <span v-for="tag in topic.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>

      <article class="markdown-content">
        <div
          class="prose"
          v-html="renderedMarkdown"
        />
      </article>

      <section class="comments-section">
        <h2 class="comments-title">
          <span class="comments-icon">💬</span>
          Comentários
          <span v-if="topic.comments?.length" class="comments-count">({{ topic.comments.length
            }})</span>
        </h2>

        <div v-if="topic.comments && topic.comments.length" class="comments-list">
          <div v-for="(comment, index) in topic.comments" :key="index" class="comment">
            <div class="comment-header">
              <span class="comment-user">{{ comment.username }}</span>
              <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
          </div>
        </div>

        <div v-else class="no-comments">
          <span class="no-comments-icon">🤔</span>
          <p>Seja o primeiro a comentar!</p>
        </div>
      </section>
    </div>

    <div v-else class="loading-state">
      <div class="loading-spinner"></div>
      <p>Carregando artigo...</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { useRoute } from 'vue-router'
import TopicService from '@/services/TopicService'
import { ref, onMounted, watch, computed } from 'vue'
import type { TopicDTO } from '@/types/interfaces/TopicDTO.ts'

// Configuração do marked para melhor renderização
marked.setOptions({
  breaks: true,
  gfm: true
})

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
      return '<div class="empty-content"><p>📝 Nenhum conteúdo para visualizar...</p></div>'

    try {
      return marked(topic.value.description)
    } catch (error) {
      console.error('Erro ao renderizar markdown:', error)
      return '<div class="error-content"><p>❌ Erro ao renderizar o markdown</p></div>'
    }
  }

  return '<div class="error-content"><p>❌ Nada a ser renderizado</p></div>'
})

const formatDate = (date: string | Date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchTopic(tokenUUID)
})

watch(
  () => route.params.uuid,
  (newUUID) => {
    if (newUUID) {
      topic.value = null
      fetchTopic(newUUID)
    }
  }
)
</script>

<style scoped>
.article-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
}

.article-content {
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.article-header {
  padding: 3rem 3rem 2rem;
  background: linear-gradient(135deg, #e0eaff 0%, #f5e6ff 100%);
  color: white;
  position: relative;
}

.article-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.article-header > * {
  position: relative;
  z-index: 1;
}

.article-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: black;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.meta-icon {
  font-size: 1.1rem;
}

.meta-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: black;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: black;
}

.markdown-content {
  padding: 3rem;
}

.prose {
  max-width: none;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #334155;
}

:deep(.prose h1) {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #e2e8f0;
}

:deep(.prose h2) {
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin: 1.75rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

:deep(.prose h3) {
  font-size: 1.5rem;
  font-weight: 600;
  color: #334155;
  margin: 1.5rem 0 0.75rem 0;
}

:deep(.prose h4) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #475569;
  margin: 1.25rem 0 0.5rem 0;
}

:deep(.prose p) {
  margin: 1.25rem 0;
  text-align: justify;
}

:deep(.prose ul), :deep(.prose ol) {
  margin: 1.25rem 0;
  padding-left: 2rem;
}

:deep(.prose li) {
  margin: 0.5rem 0;
}

:deep(.prose blockquote) {
  border-left: 4px solid #667eea;
  margin: 1.5rem 0;
  color: #64748b;
  font-style: italic;
  background: #f8fafc;
  padding: 1rem 1.5rem;
  border-radius: 0 8px 8px 0;
}

:deep(.prose code) {
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  color: #e11d48;
}

:deep(.prose pre) {
  background: #1e293b;
  color: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  overflow-x: auto;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.prose pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
  border-radius: 0;
}

:deep(.prose a) {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: all 0.2s;
}

:deep(.prose a:hover) {
  border-bottom-color: #667eea;
}

:deep(.prose table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.prose th) {
  background: #667eea;
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

:deep(.prose td) {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

:deep(.prose tr:hover) {
  background: #f8fafc;
}

.empty-content, .error-content {
  text-align: center;
  padding: 3rem;
  color: #64748b;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px dashed #cbd5e1;
}

.comments-section {
  padding: 3rem;
  border-top: 1px solid #e2e8f0;
  background: #fafafa;
}

.comments-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.comments-icon {
  font-size: 1.5rem;
}

.comments-count {
  font-size: 1rem;
  color: #64748b;
  font-weight: 400;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 4px solid #667eea;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.comment-user {
  font-weight: 600;
  color: #1e293b;
}

.comment-date {
  font-size: 0.85rem;
  color: #64748b;
}

.comment-text {
  margin: 0;
  line-height: 1.6;
  color: #475569;
}

.no-comments {
  text-align: center;
  padding: 3rem;
  color: #64748b;
  background: white;
  border-radius: 12px;
  border: 2px dashed #cbd5e1;
}

.no-comments-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.no-comments p {
  margin: 0;
  font-size: 1.1rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #64748b;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .article-container {
    padding: 1rem;
  }

  .article-header {
    padding: 2rem 1.5rem 1.5rem;
  }

  .article-title {
    font-size: 2rem;
    color: black;
  }

  .markdown-content,
  .comments-section {
    padding: 1.5rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.75rem;
  }

  .comment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
