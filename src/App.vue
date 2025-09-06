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
  min-height: calc(100vh - 80px - 60px);
  display: flex;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  flex-direction: column;
  align-items: center;
  width: calc(100vw - 250px);
  max-width: calc(100vw - 250px);
}

@media (max-width: 1024px) {
  .main-content {
    margin-left: 250px;
    width: calc(100vw - 250px);
    max-width: calc(100vw - 250px);
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    width: 100vw;
    max-width: 100vw;
  }

  .content-wrapper {
    padding-top: 70px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 12px;
    width: 100vw;
    max-width: 100vw;
  }

  .content-wrapper {
    padding-top: 60px;
  }
}

.main-content > * {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .content-wrapper.menu-collapsed .main-content {
    margin-left: 0;
  }

  .content-wrapper.menu-expanded .main-content {
    margin-left: 240px;
  }
}

.main-content {
  transition: margin-left 0.3s ease-in-out;
}

.main-content {
  padding-bottom: 32px;
}
</style>
