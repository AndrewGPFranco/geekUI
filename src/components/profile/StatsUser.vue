<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-content">
        <i class="pi pi-file-edit stat-icon"></i>
        <div class="stat-value">{{ postsPublished }}</div>
        <div class="stat-label">Posts Publicados</div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <i class="pi pi-users stat-icon"></i>
        <div class="stat-value">{{ 0 }}</div>
        <div class="stat-label">Seguidores</div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <i class="pi pi-star-fill stat-icon"></i>
        <div class="stat-value">{{ 0 }}</div>
        <div class="stat-label">Reviews Escritas</div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <i class="pi pi-trophy stat-icon"></i>
        <div class="stat-value">{{ 0 }}</div>
        <div class="stat-label">Conquistas</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopicService from '@/services/TopicService.ts'
import { onMounted, ref } from 'vue'

const topicService = new TopicService()
const postsPublished = ref<number | null>(0);

onMounted(async () => {
  postsPublished.value = (await topicService.getAmountTopicsWrittenByUser()).getResponse()
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0 2rem 0;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
  0 1px 2px 0 rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #059669, #10b981, #34d399);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-4px);
  border-color: #10b981;
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-content {
  padding-top: 1rem;
}

.stat-icon {
  font-size: 2rem;
  color: #059669;
  margin: 0 auto 1rem auto;
  display: block;
  transition: all 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
  color: #047857;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  line-height: 1;
  transition: color 0.3s ease;
}

.stat-card:hover .stat-value {
  color: #059669;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Animação de entrada */
.stat-card {
  animation: fadeInUp 0.6s ease forwards;
}

.stat-card:nth-child(1) {
  animation-delay: 0.1s;
}

.stat-card:nth-child(2) {
  animation-delay: 0.2s;
}

.stat-card:nth-child(3) {
  animation-delay: 0.3s;
}

.stat-card:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Variações por tipo de estatística */
.stat-card:nth-child(1) .stat-icon {
  color: #3b82f6;
}

.stat-card:nth-child(1):hover .stat-icon,
.stat-card:nth-child(1):hover .stat-value {
  color: #2563eb;
}

.stat-card:nth-child(1):hover::before {
  background: linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd);
}

.stat-card:nth-child(2) .stat-icon {
  color: #8b5cf6;
}

.stat-card:nth-child(2):hover .stat-icon,
.stat-card:nth-child(2):hover .stat-value {
  color: #7c3aed;
}

.stat-card:nth-child(2):hover::before {
  background: linear-gradient(90deg, #8b5cf6, #a78bfa, #c4b5fd);
}

.stat-card:nth-child(3) .stat-icon {
  color: #f59e0b;
}

.stat-card:nth-child(3):hover .stat-icon,
.stat-card:nth-child(3):hover .stat-value {
  color: #d97706;
}

.stat-card:nth-child(3):hover::before {
  background: linear-gradient(90deg, #f59e0b, #fbbf24, #fde047);
}

.stat-card:nth-child(4) .stat-icon {
  color: #ef4444;
}

.stat-card:nth-child(4):hover .stat-icon,
.stat-card:nth-child(4):hover .stat-value {
  color: #dc2626;
}

.stat-card:nth-child(4):hover::before {
  background: linear-gradient(90deg, #ef4444, #f87171, #fca5a5);
}

/* Responsividade para telas pequenas */
@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin: 3rem 0 1.5rem 0;
  }

  .stat-card {
    padding: 1.25rem;
  }

  .stat-icon {
    font-size: 1.5rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .stat-label {
    font-size: 0.75rem;
  }
}
</style>
