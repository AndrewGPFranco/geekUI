<template>
  <div class="register-container">
    <div class="content-wrapper">
      <FormRegister />

      <div class="footer-section">
        <n-text depth="3" class="footer-text">
          Já tem uma conta?
          <router-link to="/auth/login" class="login-link">
            Faça login aqui
          </router-link>
        </n-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NText } from 'naive-ui'
import FormRegister from '@/components/auth/FormRegister.vue'
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.content-wrapper {
  width: 100%;
  max-width: 42rem;
  position: relative;
  z-index: 10;
}

.footer-section {
  margin-top: 2rem;
  text-align: center;
}

.footer-text {
  font-size: 0.875rem;
}

.login-link {
  font-weight: 500;
  color: #0d9488;
  text-decoration: none;
  transition: color 0.2s ease;
}

.login-link:hover {
  color: #14b8a6;
}

@media (max-width: 768px) {
  .content-wrapper {
    max-width: 100%;
  }
}
</style>
