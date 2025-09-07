<template>
  <main class="topic-all-container">
    <BannerProfile />
  </main>
</template>
<script setup lang="ts">
import BannerProfile from '@/components/profile/BannerProfile.vue'
</script>

<style scoped>
.topic-all-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
}
</style>
