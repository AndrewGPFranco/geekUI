<template>
  <div class="forgot-password-container">
    <div class="content-wrapper">
      <FormSendForgotPassword />

      <!-- Background decorative elements -->
      <div class="bg-decoration">
        <div class="bg-circle bg-circle-top"></div>
        <div class="bg-circle bg-circle-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormSendForgotPassword from '@/components/auth/FormSendForgotPassword.vue'

// Definir metadados para SEO (equivalente ao metadata do Next.js)
defineOptions({
  name: 'ForgotPasswordPage'
})

// Se estiver usando vue-meta ou similar para SEO
// useMeta({
//   title: 'Geek - Esqueci a Senha',
//   meta: [
//     { name: 'description', content: 'Solicite o link para alteração da senha' }
//   ]
// })
</script>

<style scoped>
.forgot-password-container {
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
  .bg-circle {
    width: 16rem;
    height: 16rem;
  }
}
</style>
