<template>
  <div class="form-topic-container">
    <div class="grid-layout">
      <aside class="sidebar">
        <div class="card">
          <header class="card-header">
            <h3 class="card-title">Informações do Artigo</h3>
          </header>

          <div class="card-content">
            <div class="form-group">
              <label for="title">Título</label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                placeholder="Digite o título do artigo..."
                class="form-input"
                @input="handleChange"
              />
            </div>

            <div class="form-group">
              <label for="category">Categoria</label>
              <n-select v-model:value="formData.tags" multiple :options="options"
                        placeholder="Adicionar tags" />
            </div>
          </div>
        </div>
      </aside>

      <main class="editor-main">
        <div class="card editor-card">
          <header class="card-header">
            <div class="editor-header">
              <h3 class="card-title">Conteúdo do Artigo</h3>

              <div class="editor-tabs">
                <button
                  type="button"
                  :class="['tab-button', { active: !isPreview }]"
                  @click="setPreview(false)"
                >
                  <i class="pi pi-file-edit" />
                  Editor
                </button>
                <button
                  type="button"
                  :class="['tab-button', { active: isPreview }]"
                  @click="setPreview(true)"
                >
                  <i class="pi pi-eye" />
                  Preview
                </button>
              </div>
            </div>

            <div v-if="!isPreview" class="markdown-toolbar">
              <button
                v-for="tool in markdownTools"
                :key="tool.name"
                type="button"
                class="toolbar-btn"
                :title="tool.title"
                @click="insertMarkdown(tool.name, tool.placeholder)"
              >
                <i :class="tool.icon" />
              </button>
            </div>
          </header>

          <div class="card-content editor-content">
            <div
              v-if="isPreview"
              class="preview-area markdown-preview"
              v-html="renderedMarkdown"
            />

            <textarea
              v-else
              ref="textareaRef"
              v-model="formData.description"
              class="content-editor"
              placeholder="Comece a escrever seu artigo aqui... Use markdown para formatação!"
              @input="handleChange"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { useMessage, NSelect } from 'naive-ui'
import ResponseAPI from '@/utils/ResponseAPI.ts'
import TopicService from '@/services/TopicService.ts'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { FormData } from '@/types/interfaces/topics/FormData.ts'
import type { Category } from '@/types/interfaces/topics/Category.ts'
import type { MarkdownTool } from '@/types/interfaces/topics/MarkdownTool.ts'
import type { ItensTopicDTO } from '@/types/interfaces/topics/ItensTopicDTO.ts'

const toast = useMessage()
const topicService = new TopicService()

const emit = defineEmits(['change'])
const props = defineProps({
  isCleanForm: {
    type: Boolean,
    required: true
  }
})

const formData = reactive<FormData>({
  title: '',
  tags: [],
  description: ''
})

const options = ref<Category[]>([])
const isPreview = ref<boolean>(false)
const textareaRef = ref<HTMLTextAreaElement>()

const renderedMarkdown = computed(() => {
  if (!formData.description.trim())
    return '<p class="empty-content">Nenhum conteúdo para visualizar...</p>'

  try {
    return marked(formData.description)
  } catch (error) {
    console.error('Erro ao renderizar markdown:', error)
    return '<p class="error-content">Erro ao renderizar o markdown</p>'
  }
})

const markdownTools: MarkdownTool[] = [
  {
    name: 'bold',
    title: 'Negrito (Ctrl+B)',
    icon: 'fa-solid fa-bold',
    placeholder: 'texto em negrito'
  },
  {
    name: 'italic',
    title: 'Itálico (Ctrl+I)',
    icon: 'fa-solid fa-italic',
    placeholder: 'texto em itálico'
  },
  {
    name: 'h1',
    title: 'Título Principal',
    icon: 'fa-solid fa-heading',
    placeholder: 'Título Principal'
  },
  { name: 'h2', title: 'Subtítulo', icon: 'fa-solid fa-heading', placeholder: 'Subtítulo' },
  { name: 'h3', title: 'Seção', icon: 'fa-solid fa-heading', placeholder: 'Seção' },
  { name: 'ul', title: 'Lista', icon: 'fa-solid fa-list-ul', placeholder: 'item da lista' },
  {
    name: 'ol',
    title: 'Lista Numerada',
    icon: 'fa-solid fa-list-ol',
    placeholder: 'item numerado'
  },
  { name: 'link', title: 'Link', icon: 'fa-solid fa-link', placeholder: 'texto do link' },
  { name: 'image', title: 'Imagem', icon: 'fa-solid fa-image', placeholder: 'descrição da imagem' },
  { name: 'code', title: 'Código', icon: 'fa-solid fa-code', placeholder: 'código' },
  { name: 'quote', title: 'Citação', icon: 'fa-solid fa-quote-left', placeholder: 'citação' }
]

const handleChange = () => {
  emit('change', formData)
}

const setPreview = (preview: boolean) => {
  isPreview.value = preview
}

const insertMarkdown = (type: string, placeholder?: string) => {
  const textarea = textareaRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = formData.description.substring(start, end)
  const text = selectedText || placeholder || ''

  let markdownText = ''
  let cursorOffset = 0

  switch (type) {
    case 'bold':
      markdownText = `**${text}**`
      cursorOffset = selectedText ? 0 : -2
      break
    case 'italic':
      markdownText = `*${text}*`
      cursorOffset = selectedText ? 0 : -1
      break
    case 'h1':
      markdownText = `# ${text}`
      cursorOffset = selectedText ? 0 : 0
      break
    case 'h2':
      markdownText = `## ${text}`
      cursorOffset = selectedText ? 0 : 0
      break
    case 'h3':
      markdownText = `### ${text}`
      cursorOffset = selectedText ? 0 : 0
      break
    case 'ul':
      markdownText = `- ${text}`
      cursorOffset = selectedText ? 0 : 0
      break
    case 'ol':
      markdownText = `1. ${text}`
      cursorOffset = selectedText ? 0 : 0
      break
    case 'link':
      markdownText = `[${text || 'texto do link'}](url)`
      cursorOffset = selectedText ? -5 : -4
      break
    case 'image':
      markdownText = `![${text || 'alt text'}](url)`
      cursorOffset = selectedText ? -5 : -4
      break
    case 'code':
      markdownText = `\`${text}\``
      cursorOffset = selectedText ? 0 : -1
      break
    case 'quote':
      markdownText = `> ${text}`
      cursorOffset = selectedText ? 0 : 0
      break
  }

  formData.description = formData.description.substring(0, start) + markdownText + formData.description.substring(end)

  setTimeout(() => {
    const newPosition = start + markdownText.length + cursorOffset
    textarea.setSelectionRange(newPosition, newPosition)
    textarea.focus()
  })

  handleChange()
}

const loadCategories = async () => {
  try {
    const responseAPI: ResponseAPI<ItensTopicDTO | string> = await topicService.getItensToFormTopic()

    if (responseAPI.getError()) {
      toast.error(responseAPI.getResponse() as string)
      return
    }

    const response = responseAPI.getResponse() as ItensTopicDTO

    options.value = (response.tags).map((item: string) => ({
      label: item,
      value: item
    })) as Category[]
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
  }
}

onMounted(() => {
  loadCategories()
})

watch(() => props.isCleanForm, () => {
  formData.title = ''
  formData.description = ''
  formData.tags = []
})
</script>

<style scoped>
.form-topic-container {
  padding: 1.5rem;
  max-width: 100%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.grid-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.card-content {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.editor-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-tabs {
  display: flex;
  background: #f3f4f6;
  border-radius: 0.375rem;
  padding: 0.125rem;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #6b7280;
}

.tab-button.active {
  background: white;
  color: #374151;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.markdown-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.375rem;
  margin-top: 0.75rem;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toolbar-btn:hover {
  background: #e5e7eb;
}

.editor-content {
  flex: 1;
  padding: 0;
}

.content-editor {
  width: 100%;
  min-height: 500px;
  padding: 1.5rem;
  border: none;
  resize: none;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.content-editor:focus {
  outline: none;
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
