<template>
  <router-link
    :to="`/topics/${topic.id}`"
    :aria-label="`Ler artigo: ${topic.title}`"
    class="topic-link"
  >
    <n-card class="topic-card" hoverable>
      <div class="card-image-wrapper">
        <img :src="imageSrc" :alt="topic.title" class="card-image" />
        <div class="image-overlay"></div>
        <div class="shine-effect"></div>
        <div class="category-badge">
          <i class="fa fa-bookmark"></i>
          <span>Artigo</span>
        </div>
      </div>

      <div class="card-content">
        <div class="card-title-wrapper">
          <h3 class="card-title">{{ truncatedTitle }}</h3>
        </div>

        <div class="card-footer">
          <div class="read-more">
            <span class="read-text">Ler artigo</span>
            <div class="arrow-container">
              <i class="fa fa-arrow-right arrow-icon"></i>
            </div>
          </div>

          <div class="card-meta">
            <span class="reading-time">
              <i class="fa-solid fa-pencil"></i>
              {{ topic.usernameCreator }}
            </span>
          </div>
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
  return props.topic.title.length > 55
    ? props.topic.title.slice(0, 55) + '...'
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
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  padding: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.topic-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
  rgba(99, 102, 241, 0.02) 0%,
  rgba(168, 85, 247, 0.02) 50%,
  rgba(236, 72, 153, 0.02) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.topic-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.15),
  0 0 0 1px rgba(99, 102, 241, 0.1),
  0 4px 18px rgba(0, 0, 0, 0.12);
  border-color: rgba(99, 102, 241, 0.15);
}

.topic-card:hover::before {
  opacity: 1;
}

.card-image-wrapper {
  position: relative;
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  height: 220px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: brightness(1.05) saturate(1.1) contrast(1.02);
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
    rgba(0, 0, 0, 0.02) 60%,
    rgba(0, 0, 0, 0.08) 100%
  );
  transition: opacity 0.3s ease;
  z-index: 2;
}

.category-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6366f1;
  z-index: 4;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.category-badge i {
  font-size: 0.7rem;
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
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  transform: translateX(-100%) translateY(-100%) rotate(45deg);
  transition: transform 0.8s ease;
  z-index: 3;
}

.topic-card:hover .card-image {
  transform: scale(1.08);
}

.topic-card:hover .shine-effect {
  transform: translateX(100%) translateY(100%) rotate(45deg);
}

.topic-card:hover .category-badge {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
  transform: translateY(-2px);
}

.card-content {
  position: relative;
  z-index: 2;
  background: #ffffff;
}

.card-title-wrapper {
  padding: 24px 24px 16px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: #1e293b;
  margin: 0 0 12px 0;
  transition: all 0.3s ease;
  letter-spacing: -0.02em;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

.topic-card:hover .card-title {
  color: #6366f1;
  transform: translateY(-1px);
}

.topic-card:hover {
  opacity: 1;
  color: #475569;
}

.card-footer {
  padding: 0 24px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #6366f1;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.read-text {
  transition: color 0.3s ease;
}

.arrow-container {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
}

.arrow-icon {
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reading-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 500;
}

.reading-time i {
  font-size: 0.75rem;
  opacity: 0.8;
}

.topic-card:hover .read-more {
  color: #4f46e5;
  transform: translateY(-1px);
}

.topic-card:hover .arrow-container {
  transform: translateX(6px) scale(1.1);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
  background: linear-gradient(135deg, #4f46e5, #9333ea);
}

.topic-card:hover .arrow-icon {
  transform: translateX(2px);
}

.topic-card:hover .reading-time {
  color: #64748b;
}

@media (max-width: 768px) {
  .card-title {
    font-size: 1.3rem;
  }

  .card-title-wrapper {
    padding: 20px 20px 12px;
  }

  .card-footer {
    padding: 0 20px 20px;
  }

  .card-image-wrapper {
    height: 200px;
  }

  .category-badge {
    top: 12px;
    left: 12px;
    padding: 5px 10px;
  }
}

@media (max-width: 480px) {
  .topic-card {
    border-radius: 20px;
  }

  .card-image-wrapper {
    border-radius: 20px 20px 0 0;
    height: 180px;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .read-more {
    align-self: stretch;
    justify-content: space-between;
  }
}

.topic-link:focus-visible .topic-card {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}
</style>
