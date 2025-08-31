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

    <div class="bg-decoration">
      <div class="bg-circle bg-circle-top"></div>
      <div class="bg-circle bg-circle-bottom"></div>
      <div class="bg-circle bg-circle-center"></div>
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
  background: linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 50%, #ecfeff 100%);
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

.bg-decoration {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(3rem);
}

.bg-circle-top {
  top: -10rem;
  right: -8rem;
  width: 20rem;
  height: 20rem;
  background: linear-gradient(135deg, rgba(52, 211, 153, 0.2) 0%, rgba(13, 148, 136, 0.2) 100%);
}

.bg-circle-bottom {
  bottom: -10rem;
  left: -8rem;
  width: 20rem;
  height: 20rem;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%);
}

.bg-circle-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24rem;
  height: 24rem;
  background: linear-gradient(135deg, rgba(94, 234, 212, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
}

/* Responsividade */
@media (max-width: 768px) {
  .content-wrapper {
    max-width: 100%;
  }

  .bg-circle {
    width: 16rem !important;
    height: 16rem !important;
  }

  .bg-circle-center {
    width: 20rem !important;
    height: 20rem !important;
  }
}

@media (max-width: 640px) {
  .bg-circle {
    width: 12rem !important;
    height: 12rem !important;
  }

  .bg-circle-center {
    width: 16rem !important;
    height: 16rem !important;
  }
}
</style>
