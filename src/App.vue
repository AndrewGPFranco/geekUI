<template>
  <n-message-provider>
    <n-modal-provider>
      <div class="app-container">
        <NavbarComponent />

        <div class="content-wrapper">
          <MenuComponent />
          <main class="main-content">
            <router-view />
          </main>
        </div>

        <FooterComponent />
      </div>
    </n-modal-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import AuthService from '@/services/AuthService.ts'
import { NMessageProvider, NModalProvider } from 'naive-ui'
import MenuComponent from '@/components/home/MenuComponent.vue'
import NavbarComponent from '@/components/home/NavbarComponent.vue'
import FooterComponent from '@/components/home/FooterComponent.vue'
import { onMounted } from 'vue'
import router from '@/router'

const authService = new AuthService()

const updateUserLogged = async () => {
  await authService.updateUserLogged()
}

const validToken = async () => {
  const isValid = await authService.validToken()

  if (isValid !== null) {
    if (!isValid) {
      await authService.logout()
      await router.push({ name: 'login' })
    }
  }
}

onMounted(async () => {
  await updateUserLogged()
  await validToken()
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  display: flex;
  flex: 1;
  padding-top: 80px;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  display: flex;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  flex-direction: column;
  transition: margin-left 0.3s ease-in-out;
  min-height: 0;
}

.main-content > * {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding-top: 70px;
  }

  .main-content {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding-top: 60px;
  }
}
</style>
