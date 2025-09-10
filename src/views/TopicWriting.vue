<template>
  <div class="article-editor">
    <nav class="navbar">
      <div class="navbar-brand">
        <i class="pi pi-file" />
        <span class="brand-text">Editor de Artigos</span>
      </div>

      <div class="navbar-actions">
        <button
          class="btn btn-primary"
          :disabled="isBlocksButton"
          @click="handleSave"
          title="Salvar artigo atual"
        >
          <i class="pi pi-spin" v-if="isBlocksButton" />
          <i class="pi pi-save" v-else />
          <span>Salvar</span>
        </button>
      </div>
    </nav>

    <main class="main-content">
      <FormTopic @change="handleChanges" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopicService from '@/services/TopicService.ts'
import FormTopic from '@/components/topics/FormTopic.vue'
import type { FormData } from '@/types/interfaces/topics/FormData.ts'

const topicService = new TopicService();
const isBlocksButton = ref<boolean>(true)

const handleSave = async () => {
  const resultAPI = await topicService.createNewTopic(data.value)
  console.log(resultAPI.getResponse());
}

const data = ref<FormData>();

const handleChanges = async (formData: FormData) => {
  if (!formData.title || !formData.description || formData.tags.length < 1) return;
  isBlocksButton.value = false;
  data.value = formData;
}
</script>

<style scoped>
.article-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #2c3e50;
}

.navbar-brand i {
  font-size: 1.25rem;
  color: #3498db;
}

.brand-text {
  font-size: 1.125rem;
}

.navbar-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  min-width: 120px;
  justify-content: center;
}

.btn:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-primary {
  background-color: #059669;
  color: white;
  border: 1px solid #059669;
}

.btn-primary:hover:not(:disabled) {
  background-color: #047857;
  border-color: #047857;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.main-content {
  flex: 1;
  padding: 1rem;
  background-color: #fefefe;
  max-width: 100%;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 1rem;
    flex-direction: column;
    gap: 1rem;
    position: relative;
  }

  .navbar-brand {
    align-self: flex-start;
  }

  .navbar-actions {
    width: 100%;
    justify-content: center;
  }

  .btn {
    flex: 1;
    max-width: 140px;
  }

  .brand-text {
    font-size: 1rem;
  }

  .main-content {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .btn span {
    display: none;
  }

  .btn {
    min-width: auto;
    padding: 0.625rem;
  }

  .navbar-actions {
    gap: 0.5rem;
  }
}
</style>
