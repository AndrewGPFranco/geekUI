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
              <select
                id="category"
                v-model="formData.category"
                class="form-select"
                @change="handleChange"
              >
                <option value="">Selecione uma categoria</option>
                <option
                  v-for="category in categories"
                  :key="category.value"
                  :value="category.value"
                >
                  {{ category.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="tags">Tags</label>
              <div class="tag-input-container">
                <input
                  id="tags"
                  v-model="tagInput"
                  type="text"
                  placeholder="Adicionar tag..."
                  class="form-input tag-input"
                  @keyup.enter="handleTagKeyPress"
                />
                <button
                  type="button"
                  class="btn btn-outline btn-sm"
                  @click="addTag"
                >
                  <i class="pi pi-tag" />
                </button>
              </div>

              <div class="tags-display" v-if="formData.tags.length > 0">
                <span
                  v-for="tag in formData.tags"
                  :key="tag"
                  class="tag-badge"
                  @click="removeTag(tag)"
                >
                  {{ tag }} ×
                </span>
              </div>
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
              class="preview-area"
              v-html="renderMarkdown(formData.content)"
            />

            <textarea
              v-else
              v-model="formData.content"
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
import { ref, reactive, onMounted } from 'vue'

interface FormData {
  title: string
  category: string
  tags: string[]
  content: string
}

interface Category {
  value: string
  label: string
}

interface MarkdownTool {
  name: string
  title: string
  icon: string
  placeholder?: string
}

const emit = defineEmits<{
  change: [data: FormData]
  save: [data: FormData]
}>()

const formData = reactive<FormData>({
  title: '',
  category: '',
  tags: [],
  content: ''
})

const isPreview = ref(false)
const tagInput = ref('')
const categories = ref<Category[]>([])

const markdownTools: MarkdownTool[] = [
  { name: 'bold', title: 'Negrito', icon: 'pi pi-code', placeholder: 'texto em negrito' },
  { name: 'italic', title: 'Itálico', icon: 'pi pi-code', placeholder: 'texto em itálico' },
  { name: 'h1', title: 'Título Principal', icon: 'pi pi-code', placeholder: 'Título Principal' },
  { name: 'h2', title: 'Subtítulo', icon: 'pi pi-code', placeholder: 'Subtítulo' },
  { name: 'h3', title: 'Seção', icon: 'pi pi-code', placeholder: 'Seção' },
  { name: 'ul', title: 'Lista', icon: 'pi pi-code', placeholder: 'item da lista' },
  { name: 'ol', title: 'Lista Numerada', icon: 'pi pi-code', placeholder: 'item numerado' },
  { name: 'link', title: 'Link', icon: 'pi pi-code', placeholder: 'texto do link' },
  { name: 'image', title: 'Imagem', icon: 'pi pi-code', placeholder: 'descrição da imagem' },
  { name: 'code', title: 'Código', icon: 'pi pi-code', placeholder: 'código' },
  { name: 'quote', title: 'Citação', icon: 'pi pi-code', placeholder: 'citação' }
]

const handleChange = () => {
  emit('change', { ...formData })
}

const handleTagKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    addTag()
  }
}

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !formData.tags.includes(tag)) {
    formData.tags.push(tag)
    tagInput.value = ''
    handleChange()
  }
}

const removeTag = (tagToRemove: string) => {
  formData.tags = formData.tags.filter(tag => tag !== tagToRemove)
  handleChange()
}

const setPreview = (preview: boolean) => {
  isPreview.value = preview
}

const insertMarkdown = (type: string, placeholder?: string) => {
  const textarea = document.querySelector('.content-editor') as HTMLTextAreaElement
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = formData.content.substring(start, end)
  const text = selectedText || placeholder || ''

  let markdownText = ''

  switch (type) {
    case 'bold':
      markdownText = `**${text}**`
      break
    case 'italic':
      markdownText = `*${text}*`
      break
    case 'h1':
      markdownText = `# ${text}`
      break
    case 'h2':
      markdownText = `## ${text}`
      break
    case 'h3':
      markdownText = `### ${text}`
      break
    case 'ul':
      markdownText = `- ${text}`
      break
    case 'ol':
      markdownText = `1. ${text}`
      break
    case 'link':
      markdownText = `[${text || 'texto do link'}](url)`
      break
    case 'image':
      markdownText = `![${text || 'alt text'}](url)`
      break
    case 'code':
      markdownText = `\`${text}\``
      break
    case 'quote':
      markdownText = `> ${text}`
      break
  }

  formData.content = formData.content.substring(0, start) + markdownText + formData.content.substring(end)
  handleChange()
}

const renderMarkdown = (content: string): string => {
  return content.replace(/\n/g, '<br>')
}

const loadCategories = async () => {
  try {
    categories.value = [
      { value: 'anime', label: 'Anime' },
      { value: 'manga', label: 'Mangá' },
      { value: 'jogos', label: 'Jogos' },
      { value: 'noticias', label: 'Notícias' },
      { value: 'reviews', label: 'Reviews' },
      { value: 'listas', label: 'Listas' }
    ]
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
  }
}

onMounted(() => {
  loadCategories()
})

defineExpose({
  getFormData: () => formData,
  resetForm: () => {
    Object.assign(formData, {
      title: '',
      category: '',
      tags: [],
      content: ''
    })
  }
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

.tag-input-container {
  display: flex;
  gap: 0.5rem;
}

.tag-input {
  flex: 1;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.tag-badge {
  background: #f3f4f6;
  color: #374151;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tag-badge:hover {
  background: #e5e7eb;
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

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline {
  background: white;
  border-color: #d1d5db;
  color: #374151;
}

.btn-outline:hover {
  background: #f9fafb;
}

.btn-sm {
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
}
</style>
