<template>
  <div class="forgot-password-container">
    <div class="content-wrapper">
      <FormChangePassword />
    </div>
  </div>
</template>

<script setup lang="ts">
import FormChangePassword from '@/components/auth/FormChangePassword.vue'
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
