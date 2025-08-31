<template>
  <aside class="menu">
    <nav class="menu-nav">
      <router-link to="/" class="menu-link">
        <span class="menu-icon">🏠</span>
        <span class="menu-text">Início</span>
      </router-link>

      <router-link to="/profile" class="menu-link">
        <span class="menu-icon">👤</span>
        <span class="menu-text">Perfil</span>
      </router-link>

      <hr class="menu-divider" />

      <router-link to="/" class="menu-link">
        <span class="menu-icon">⚛️</span>
        <span class="menu-text">App</span>
      </router-link>

      <router-link to="/topic/all" class="menu-link">
        <span class="menu-icon">📖</span>
        <span class="menu-text">Tópicos</span>
      </router-link>

      <router-link to="/category" class="menu-link">
        <span class="menu-icon">🗂️</span>
        <span class="menu-text">Categorias</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
// Sem lógica complexa aqui, é só estrutura de menu
</script>

<style scoped>
.menu {
  position: fixed;
  top: 80px; /* ajuste se necessário para Navbar */
  left: 0;
  width: 250px;
  height: calc(100vh - 80px);
  background: linear-gradient(to bottom, #121b33, #0f1626);
  color: white;
  padding: 24px 16px;
  border-right: 1px solid #444;
  display: flex;
  flex-direction: column;
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
  color: white;
  font-weight: 500;
  transition: background 0.2s;
}

.menu-link:hover {
  background-color: #1f2a50;
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
