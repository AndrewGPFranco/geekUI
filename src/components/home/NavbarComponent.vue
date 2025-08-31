<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="brand">
        <img src="/logo.png" alt="Logo do site" class="logo" />
        <span class="brand-title">Geek | Community</span>
      </router-link>
    </div>

    <section class="navbar-right">
      <div class="nav-links">
        <router-link to="/topics/all">TÓPICOS</router-link>
        <router-link to="/category">CATEGORIAS</router-link>
        <router-link to="/profile">PERFIL</router-link>
        <router-link to="/app">APP</router-link>
      </div>

      <div class="nav-actions">
        <n-select
          v-model:value="selectedTopic"
          placeholder="Buscar por um tópico"
          :options="optionsRef"
          clearable
          remote
          filterable
          label-field="label"
          value-field="value"
          @update:value="handleUpdateValue"
          :on-search="debouncedSearch"
        />

        <i class="pi pi-bell" style="font-size: 1.5em; cursor: pointer"></i>
      </div>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { NSelect } from 'naive-ui'
import { onUnmounted, ref } from 'vue'
import debounce from 'lodash.debounce'
import type { SelectOption } from 'naive-ui'
import TopicService from '@/services/TopicService'
import router from '@/router'

const optionsRef = ref<SelectOption[]>([])
const selectedTopic = ref<string | null>(null)

const topicService = new TopicService()

const handleSearch = async (query: string) => {
  if (!query.trim()) {
    optionsRef.value = []
    return
  }
  try {
    const response = await topicService.searchTopic(query)
    if (!response.getError()) {
      const data = response.getResponse() || []
      optionsRef.value = Array.isArray(data)
        ? data.map((input) => ({
          label: input.title,
          value: input.id
        }))
        : []
    } else {
      optionsRef.value = []
    }
  } catch (error) {
    console.error('Error searching topics:', error)
    optionsRef.value = []
  }
}

const debouncedSearch = debounce(handleSearch, 300)

const handleUpdateValue = async (value: string) => {
  if (value !== null)
    await router.push("/topics/" + value)
}

onUnmounted(() => {
  debouncedSearch.cancel()
})
</script>


<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  color: black;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);;
  align-items: center;
  padding: 0 24px;
  z-index: 50;
  border-bottom: 1px solid black;
}

.navbar-left .brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: black;
}

.logo {
  width: 56px;
  height: 56px;
}

.brand-title {
  font-size: 18px;
  font-weight: 500;
}

.navbar-right {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 24px;
  font-size: 14px;
}

.nav-links a {
  text-decoration: none;
  color: black;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #454545;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-results li {
  padding: 4px 8px;
  cursor: pointer;
}

.search-results li:hover {
  background: #2a3b6f;
}

.bell-icon {
  cursor: pointer;
  font-size: 20px;
}
</style>
