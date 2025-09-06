<template>
  <div class="forgot-password-container">
    <div class="content-wrapper">
      <FormSendForgotPassword />
    </div>
  </div>
</template>

<script setup lang="ts">
import FormSendForgotPassword from '@/components/auth/FormSendForgotPassword.vue'
</script>

<style scoped>
.forgot-password-container {
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
  max-width: 28rem;
  position: relative;
  z-index: 10;
}
</style>
