<template>
  <aside class="menu">
    <nav class="menu-nav">
      <router-link :to="{name: 'home'}" class="menu-link">
        <span class="menu-icon">
          <i class="fa-solid fa-house"></i>
        </span>
        <span class="menu-text">Início</span>
      </router-link>

      <router-link :to="{name: 'profile'}" class="menu-link" v-if="isLogged">
        <span class="menu-icon">
          <i class="fa-solid fa-user"></i>
        </span>
        <span class="menu-text">Perfil</span>
      </router-link>

      <hr class="menu-divider" />

      <router-link :to="{name: 'all-topics'}" class="menu-link">
        <span class="menu-icon">
          <i class="fa-solid fa-book-open"></i>
        </span>
        <span class="menu-text">Tópicos</span>
      </router-link>

      <router-link :to="{name: 'write-topic'}" class="menu-link" v-if="isWriter">
        <span class="menu-icon">
          <i class="fa-solid fa-pencil"></i>
        </span>
        <span class="menu-text">Escrever Tópico</span>
      </router-link>

      <router-link :to="{name: 'categories'}" class="menu-link">
        <span class="menu-icon">
          <i class="fa-solid fa-list"></i>
        </span>
        <span class="menu-text">Categorias</span>
      </router-link>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth-store'
import { computed } from 'vue'

const authStore = useAuthStore()

const isWriter = computed(() =>
  !!authStore.user?.roles?.includes('Escritor')
)

const isLogged = computed(() => authStore.isLogged)
</script>

<style scoped>
.menu {
  position: fixed;
  top: 80px;
  left: 0;
  width: 250px;
  height: calc(100vh - 80px);
  color: black;
  padding: 24px 16px;
  border-right: 1px solid #444;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  z-index: 40;
}

.menu-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: black;
  font-weight: 500;
  transition: background 0.2s;
}

.menu-link:hover {
  background-color: #95a3cf;
}

.menu-icon {
  font-size: 18px;
}

.menu-text {
  font-size: 14px;
}

.menu-divider {
  border: none;
  height: 1px;
  background-color: #444;
  margin: 8px 0;
}
</style>
