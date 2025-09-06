<template>
  <div class="login-container">
    <div class="content-wrapper">
      <div class="header-section">
        <h1 class="title">Bem-vindo de volta!</h1>
        <p class="subtitle">Faça login para acessar sua conta</p>
      </div>

      <FormLogin />

      <div class="footer-section">
        <n-text depth="3" class="footer-text">
          Não tem uma conta?
          <router-link to="/auth/register" class="register-link">
            Cadastre-se aqui
          </router-link>
        </n-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NText } from 'naive-ui'
import FormLogin from '../components/auth/FormLogin.vue'
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.content-wrapper {
  width: 100%;
  max-width: 28rem;
  position: relative;
  z-index: 10;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.subtitle {
  color: #4b5563;
  margin: 0;
  font-size: 1rem;
}

.footer-section {
  margin-top: 2rem;
  text-align: center;
}

.footer-text {
  font-size: 0.875rem;
}

.register-link {
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s ease;
}

.register-link:hover {
  color: #1d4ed8;
}

@media (max-width: 640px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>
