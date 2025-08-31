<template>
  <section>
    <h1>
      <div v-if="topic">
        {{ topic }}
      </div>
      <div v-else>
        <h1>Nada</h1>
      </div>
    </h1>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import TopicService from '@/services/TopicService'

const route = useRoute()
const topic = ref<unknown>(null)

const tokenUUID = route.params.uuid

const topicService = new TopicService()

const fetchTopic = async (uuid: unknown) => {
  if (!uuid) return

  try {
    const mapResult = await topicService.getTopicByID(uuid)

    if (!mapResult.getError()) {
      if (mapResult.getResponse() !== null) {
        const response = mapResult.getResponse()

        if (response && typeof response !== 'string' && 'title' in response) {
          topic.value = response.title
        }
      }
    }
  } catch (error) {
    console.error('Erro ao buscar tópico:', error)
  }
}

onMounted(() => {
  fetchTopic(tokenUUID)
})

watch(() => route.params.uuid, (newUUID) => {
  if (newUUID) {
    topic.value = null
    fetchTopic(newUUID)
  }
})
</script>

<style scoped>
section {
  padding: 1rem;
}

h1 {
  margin: 0;
}
</style>
