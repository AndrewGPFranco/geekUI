<template>
  <router-link
    :to="`/topics/${topic.id}`"
    :aria-label="`Ler artigo: ${topic.id}`"
    class="topic-link"
  >
    <n-card class="topic-card">
      <div class="card-image-wrapper">
        <img :src="imageSrc" :alt="topic.title" class="card-image" />
        <div class="image-overlay"></div>
        <div class="shine-effect"></div>
      </div>

      <div class="card-content">
        <div class="card-title-wrapper">
          <h3 class="card-title">{{ truncatedTitle }}</h3>
        </div>

        <div class="card-footer">
          <span class="read-more">
            <span class="read-text">Ler artigo</span>
            <div class="arrow-container">
              <i class="pi pi-chevron-right arrow-icon"></i>
            </div>
          </span>
        </div>
      </div>
    </n-card>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NCard } from 'naive-ui'
import type { TopicDTO } from '@/types/interfaces/TopicDTO'

const props = defineProps<{ topic: TopicDTO }>()

const truncatedTitle = computed(() => {
  return props.topic.title.length > 60
    ? props.topic.title.slice(0, 60) + '...'
    : props.topic.title
})

const imageSrc = '/scylla.webp'
</script>

<style scoped>
.topic-link {
  display: block;
  text-decoration: none;
  position: relative;
}

.topic-card {
  width: 100%;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  padding: 0;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06),
  0 0 0 1px rgba(148, 163, 184, 0.05);
}

.topic-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.topic-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25),
  0 0 0 1px rgba(59, 130, 246, 0.1),
  0 0 40px rgba(59, 130, 246, 0.1);
}

.topic-card:hover::before {
  opacity: 1;
}

.card-image-wrapper {
  position: relative;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  height: 200px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: brightness(0.9) saturate(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  transition: opacity 0.3s ease;
  z-index: 2;
}

.shine-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: translateX(-100%) translateY(-100%) rotate(45deg);
  transition: transform 0.6s ease;
  z-index: 3;
}

.topic-card:hover .card-image {
  transform: scale(1.1);
}

.topic-card:hover .shine-effect {
  transform: translateX(100%) translateY(100%) rotate(45deg);
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-title-wrapper {
  padding: 1.5rem 1.5rem 1rem;
}

.card-title {
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.4;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  transition: all 0.3s ease;
  letter-spacing: -0.025em;
}

.topic-card:hover .card-title {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transform: translateY(-2px);
}

.card-footer {
  padding: 0 1.5rem 1.5rem;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
}

.read-text {
  transition: color 0.3s ease;
}

.arrow-container {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.arrow-icon {
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.topic-card:hover .read-more {
  color: #e2e8f0;
  transform: translateY(-2px);
}

.topic-card:hover .arrow-container {
  transform: translateX(4px) scale(1.1);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.topic-card:hover .arrow-icon {
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .card-title {
    font-size: 1.25rem;
  }

  .card-title-wrapper {
    padding: 1.25rem 1.25rem 0.75rem;
  }

  .card-footer {
    padding: 0 1.25rem 1.25rem;
  }

  .card-image-wrapper {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .topic-card {
    border-radius: 16px;
  }

  .card-image-wrapper {
    border-radius: 16px 16px 0 0;
    height: 160px;
  }

  .card-title {
    font-size: 1.125rem;
  }
}
</style>
