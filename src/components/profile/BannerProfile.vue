<template>
  <section class="banner">
    <div class="container">
      <div class="links-actions">
        <router-link :to="{name: 'profile'}" class="action-link">
          <i class="pi pi-share-alt"></i>
          <span>Compartilhar</span>
        </router-link>
        <router-link :to="{name: 'profile'}" class="action-link">
          <i class="pi pi-cog"></i>
          <span>Configurações</span>
        </router-link>
        <router-link :to="{name: 'profile'}" class="action-link link-edit-profile">
          <i class="pi pi-pen-to-square"></i>
          <span>Editar Perfil</span>
        </router-link>
      </div>

      <div class="container-user">
        <div class="img-profile-wrapper">
          <img src="../../../public/scylla.webp" alt="Perfil" class="img-profile" />
          <div class="status-indicator"></div>
        </div>

        <div class="container-user-info">
          <h1 class="username">{{ user?.username }}</h1>
          <div class="container-description">
            <div v-if="!isEditDescription" class="description-display">
              <p class="user-description">{{ user?.description }}</p>
              <button
                @click="showInputDescription"
                class="edit-description-btn"
                title="Editar descrição"
              >
                <i class="pi pi-pen-to-square"></i>
              </button>
            </div>

            <div v-else class="description-edit-container">
              <div class="input-wrapper">
                <n-input
                  ref="descriptionInput"
                  v-model:value="description"
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 3 }"
                  :maxlength="200"
                  placeholder="Defina sua nova descrição..."
                  @keyup.enter.ctrl="changeDescription"
                  @keyup.escape="cancelEdit"
                />
                <div class="char-count">
                  {{ description.length }}/200
                </div>
              </div>
              <div class="action-buttons">
                <n-button
                  @click="changeDescription"
                  type="primary"
                  size="small"
                  :loading="isLoading"
                  :disabled="!description.trim() || description.length > 200"
                >
                  <template #icon>
                    <i class="pi pi-check"></i>
                  </template>
                  Salvar
                </n-button>
                <n-button
                  @click="cancelEdit"
                  quaternary
                  size="small"
                  :disabled="isLoading"
                >
                  <template #icon>
                    <i class="pi pi-times"></i>
                  </template>
                  Cancelar
                </n-button>
              </div>
            </div>
          </div>
          <div class="user-info">
            <div class="info-item">
              <i class="pi pi-calendar"></i>
              <span>Membro desde 2020</span>
            </div>
            <div class="info-item">
              <i class="pi pi-star-fill"></i>
              <span>Nível 15</span>
            </div>
            <div class="info-item">
              <i class="pi pi-tag"></i>
              <span>{{ user?.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { NInput, NButton, useMessage } from 'naive-ui'
import UserService from '@/services/UserService.ts'
import type { InfosUser } from '@/types/interfaces/InfosUser.ts'

const toast = useMessage()
const descriptionInput = ref()
const userService = new UserService()
const isLoading = ref<boolean>(false)
const user = ref<InfosUser | null>(null)
const isEditDescription = ref<boolean>(false)

const description = ref<string>('')

const showInputDescription = async () => {
  isEditDescription.value = true

  await nextTick()
  descriptionInput.value?.focus()
}

const cancelEdit = () => {
  description.value = ''
  isEditDescription.value = false
}

const changeDescription = async () => {
  if (!description.value.trim() || description.value.length > 200) {
    toast.warning('Por favor, insira uma descrição válida (1-200 caracteres)')
    return
  }

  isLoading.value = true

  try {
    const responseAPI = await userService.changeDescription(description.value.trim())

    if (responseAPI.getError()) {
      toast.error(String(responseAPI.getResponse()))
      return
    }

    description.value = ''
    isEditDescription.value = false
    user.value = (await userService.getInfosUser()).getResponse()
    toast.success('Descrição atualizada com sucesso!')
  } catch (error) {
    console.error(error)
    toast.error('Erro ao atualizar descrição')
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  user.value = (await userService.getInfosUser()).getResponse()
})
</script>

<style scoped>
.banner {
  margin-bottom: 2rem;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    135deg,
    #f8fafc 0%,
    #e2e8f0 50%,
    #cbd5e1 100%
  );
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 2.5rem;
  min-height: 220px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.container:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.links-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.action-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.action-link:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.action-link i {
  font-size: 0.875rem;
}

.link-edit-profile {
  background: linear-gradient(135deg, #059669, #047857) !important;
  color: white !important;
  border-color: #047857 !important;
}

.link-edit-profile:hover {
  background: linear-gradient(135deg, #047857, #065f46) !important;
  transform: translateY(-1px);
}

.container-user {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-top: 1rem;
  margin-bottom: -40px;
}

.img-profile-wrapper {
  position: relative;
  flex-shrink: 0;
}

.img-profile {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  object-fit: cover;
  transition: transform 0.3s ease;
}

.img-profile:hover {
  transform: scale(1.05);
}

.status-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #10b981, #059669);
  border: 3px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container-user-info {
  flex: 1;
  padding-top: 0.5rem;
}

.container-description {
  margin-bottom: 1rem;
}

.description-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
  flex: 1;
}

.edit-description-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.7;
}

.edit-description-btn:hover {
  opacity: 1;
  background: #f9fafb;
  border-color: #9ca3af;
  color: #374151;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.description-edit-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-wrapper {
  position: relative;
}

.input-wrapper :deep(.n-input) {
  border-radius: 12px;
}

.input-wrapper :deep(.n-input__textarea-el) {
  font-size: 1.125rem;
  line-height: 1.5;
  padding: 0.75rem;
  resize: none;
}

.char-count {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 0.75rem;
  color: #9ca3af;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 6px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.action-buttons :deep(.n-button) {
  border-radius: 8px;
  font-weight: 500;
}

.username {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
}

.user-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
}

.info-item i {
  color: #9ca3af;
  font-size: 0.75rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
    min-height: auto;
  }

  .links-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-link span {
    display: none;
  }

  .action-link {
    justify-content: center;
    padding: 0.5rem;
    min-width: 44px;
  }

  .container-user {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 0;
  }

  .img-profile {
    width: 100px;
    height: 100px;
  }

  .username {
    font-size: 1.5rem;
  }

  .user-info {
    justify-content: center;
  }

  .description-display {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .action-buttons {
    flex-direction: column;
    width: 100%;
  }

  .action-buttons :deep(.n-button) {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .links-actions {
    flex-direction: row;
    justify-content: space-around;
  }

  .user-info {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
