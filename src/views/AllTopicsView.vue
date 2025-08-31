<template>
  <main class="topic-all-container">
    <h1 class="page-title">Tópicos</h1>
    <TopicList />
  </main>
</template>

<script setup lang="ts">
import TopicList from '@/components/topics/TopicList.vue'
</script>

<style scoped>
.topic-all-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-title {
  font-size: 1.875rem;
  color: white;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .topic-all-container {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 640px) {
  .topic-all-container {
    padding: 1rem 0.75rem;
  }

  .page-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
}
</style>
