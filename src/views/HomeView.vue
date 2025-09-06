<template>
  <div v-if="hydrated" class="home-container">
    <div v-if="!token" class="auth-buttons">
      <n-space size="medium">
        <n-button type="primary" size="large" @click="goToLogin" class="auth-button">
          <template #icon>
            <i class="pi pi-sign-in"></i>
          </template>
          Login
        </n-button>

        <n-button type="default" size="large" @click="goToRegister" class="auth-button">
          <template #icon>
            <i class="pi pi-user-plus"></i>
          </template>
          Registrar-se
        </n-button>
      </n-space>
    </div>

    <div v-else class="authenticated-section">
      <div class="welcome-message">
        <n-alert type="success" show-icon>
          <template #icon>
            <i class="pi pi-check-circle"></i>
          </template>
          Bem-vindo de volta!
        </n-alert>
      </div>

      <n-space size="medium" class="user-actions">
        <n-button type="primary" size="large" @click="goToTopics" class="action-button">
          <template #icon>
            <i class="pi pi-book"></i>
          </template>
          Tópicos
        </n-button>

        <n-button
          type="error"
          size="large"
          @click="handleLogout"
          :loading="isLoggingOut"
          class="logout-button"
        >
          <template #icon>
            <i class="pi pi-sign-out"></i>
          </template>
          Logout
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/AuthService'
import { NButton, NSpace, NAlert, useMessage } from 'naive-ui'

const router = useRouter()
const message = useMessage()

const hydrated = ref(false)
const isLoggingOut = ref(false)
const token = ref<boolean>(false)

const authService = new AuthService()

const goToLogin = () => router.push('/auth/login')
const goToRegister = () => router.push('/auth/register')
const goToTopics = () => router.push('/topics/all')

const handleLogout = async () => {
  try {
    isLoggingOut.value = true
    await authService.logout()
    message.success('Logout realizado com sucesso!')
    await router.push('/auth/login')
  } catch (error) {
    message.error('Erro ao fazer logout')
    console.error('Logout error:', error)
  } finally {
    isLoggingOut.value = false
  }
}

onMounted(() => {
  hydrated.value = true
  token.value = localStorage.getItem('token') !== null
})
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  width: 100%;
  height: 100%;
}

.auth-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.authenticated-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 24rem;
  width: 100%;
}

.welcome-message {
  width: 100%;
}

.user-actions {
  width: 100%;
  justify-content: center;
}

.auth-button {
  min-width: 10rem;
  height: 3rem !important;
  font-weight: 600 !important;
}

.action-button {
  min-width: 8rem;
  height: 2.75rem !important;
  font-weight: 600 !important;
}

.logout-button {
  min-width: 8rem;
  height: 2.75rem !important;
  font-weight: 600 !important;
}

.auth-button:first-child {
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%) !important;
  border: none !important;
}

.auth-button:first-child:hover {
  background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%) !important;
}

@media (max-width: 640px) {
  .home-container {
    padding: 1rem;
  }

  .auth-buttons {
    gap: 1rem;
  }

  .authenticated-section {
    gap: 1.5rem;
  }

  .user-actions :deep(.n-space) {
    flex-direction: column;
    width: 100%;
  }

  .user-actions :deep(.n-space > *) {
    width: 100%;
  }
}
</style>
