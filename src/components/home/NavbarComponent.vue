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
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar tópicos..."
            v-model="search"
            class="search-input"
          />
          <ul v-if="searchResults.length" class="search-results">
            <li v-for="topic in searchResults" :key="topic.id">
              {{ topic.title }}
            </li>
          </ul>
          <p v-else-if="search">Nenhum resultado encontrado.</p>
        </div>

        <span class="bell-icon">🔔</span>
      </div>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import debounce from 'lodash.debounce'
import TopicService from '@/services/TopicService'

const search = ref('')
const searchResults = ref<Array<any>>([])

const topicService = new TopicService()

const debouncedSearch = debounce(async (query: string) => {
  console.log("Oi")
  // if (!query.trim()) {
  //   searchResults.value = []
  //   return
  // }
  // const response = await topicService.searchTopic(query)
  // if (!response.getError()) {
  //   searchResults.value = response.getResponse() || []
  // } else {
  //   searchResults.value = []
  // }
}, 1000)

watch(search, (newValue) => {
  debouncedSearch(newValue)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #1e2a46;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  z-index: 50;
}

.navbar-left .brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: white;
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
  color: white;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #cccccc;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 4px 8px;
  background-color: #121b33;
  color: white;
}

.search-input {
  background: transparent;
  border: none;
  color: white;
  outline: none;
  width: 180px;
}

.search-icon {
  margin-right: 4px;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #1e2a46;
  border: 1px solid #444;
  border-radius: 4px;
  margin-top: 4px;
  list-style: none;
  padding: 4px 0;
  max-height: 200px;
  overflow-y: auto;
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
