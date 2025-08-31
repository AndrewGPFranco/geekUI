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
    
    <!-- Background decorative elements -->
    <div class="bg-decoration">
      <div class="bg-circle bg-circle-top"></div>
      <div class="bg-circle bg-circle-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NText } from 'naive-ui'
import FormLogin from '../components/auth/FormLogin.vue'

// Definir metadados para SEO (equivalente ao metadata do Next.js)
defineOptions({
  name: 'LoginPage'
})

// Se estiver usando vue-meta ou similar para SEO
// useMeta({
//   title: 'Geek - Login',
//   meta: [
//     { name: 'description', content: 'Faça login para acessar sua conta' }
//   ]
// })
</script>

<style scoped>
.login-container {
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

.bg-decoration {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  filter: blur(3rem);
  opacity: 0.6;
}

.bg-circle-top {
  top: -10rem;
  right: -8rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%);
}

.bg-circle-bottom {
  bottom: -10rem;
  left: -8rem;
  background: linear-gradient(135deg, rgba(244, 114, 182, 0.2) 0%, rgba(239, 68, 68, 0.2) 100%);
}

/* Responsividade */
@media (max-width: 640px) {
  .title {
    font-size: 1.5rem;
  }
  
  .bg-circle {
    width: 16rem;
    height: 16rem;
  }
}
</style>