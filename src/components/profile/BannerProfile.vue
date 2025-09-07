<template>
  <section class="banner">
    <div class="container">
      <div class="links-actions">
        <n-button
          size="large"
          @click="handleLogout"
          class="action-link"
        >
          <template #icon>
            <i class="pi pi-sign-out"></i>
          </template>
          Logout
        </n-button>
      </div>

      <div class="container-user">
        <div class="img-profile-wrapper">
          <img src="../../../public/scylla.webp" alt="Perfil" class="img-profile" />
          <div class="status-indicator"></div>
        </div>

        <div class="container-user-info">
          <h1 class="username">{{ user?.username }}</h1>

          <div class="container-description">
            <div v-if="!isEditingDescription" class="description-display">
              <div class="description-content">
                <p v-if="user?.description" class="user-description">
                  {{ user.description }}
                </p>
                <p v-else class="user-description placeholder">
                  <i class="pi pi-info-circle"></i>
                  Adicione uma descrição para seu perfil
                </p>
              </div>
              <button
                @click="startDescriptionEdit"
                class="edit-description-btn"
                :title="user?.description ? 'Editar descrição' : 'Adicionar descrição'"
                :disabled="isLoading"
              >
                <i :class="user?.description ? 'pi pi-pen-to-square' : 'pi pi-plus'"></i>
              </button>
            </div>

            <div v-else class="description-edit-container">
              <div class="input-wrapper">
                <n-input
                  ref="descriptionInput"
                  v-model:value="editingDescription"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  :maxlength="MAX_DESCRIPTION_LENGTH"
                  :placeholder="getDescriptionPlaceholder()"
                  :status="getInputStatus()"
                  @keyup.enter.ctrl="saveDescription"
                  @keyup.escape="cancelDescriptionEdit"
                  @blur="handleInputBlur"
                  class="description-input"
                />
                <div class="char-count" :class="getCharCountClass()">
                  {{ editingDescription.length }}/{{ MAX_DESCRIPTION_LENGTH }}
                </div>
              </div>

              <div class="validation-message" v-if="validationMessage">
                <i class="pi pi-exclamation-triangle"></i>
                <span>{{ validationMessage }}</span>
              </div>

              <div class="action-buttons">
                <n-button
                  @click="saveDescription"
                  type="primary"
                  size="small"
                  :loading="isLoading"
                  :disabled="!canSaveDescription"
                  class="save-btn"
                >
                  <template #icon>
                    <i class="pi pi-check"></i>
                  </template>
                  {{ isLoading ? 'Salvando...' : 'Salvar' }}
                </n-button>
                <n-button
                  @click="cancelDescriptionEdit"
                  quaternary
                  size="small"
                  :disabled="isLoading"
                  class="cancel-btn"
                >
                  <template #icon>
                    <i class="pi pi-times"></i>
                  </template>
                  Cancelar
                </n-button>
              </div>

              <div class="editing-tips">
                <small>
                  <i class="pi pi-lightbulb"></i>
                  Use Ctrl+Enter para salvar, Esc para cancelar
                </small>
              </div>
            </div>
          </div>

          <div class="user-info">
            <div class="info-item">
              <i class="pi pi-calendar"></i>
              <span>Membro desde {{ DateUtils.formatRegistrationDate(user?.registrationDate) }}</span>
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
import router from '@/router'
import AuthService from '@/services/AuthService.ts'
import UserService from '@/services/UserService.ts'
import { NInput, NButton, useMessage } from 'naive-ui'
import { ref, nextTick, onMounted, computed, watch } from 'vue'
import type { InfosUser } from '@/types/interfaces/InfosUser.ts'
import DateUtils from '@/utils/DateUtils.ts'

const MAX_DESCRIPTION_LENGTH = 200
const MIN_DESCRIPTION_LENGTH = 1

const toast = useMessage()

const descriptionInput = ref()

const userService = new UserService()
const authService = new AuthService()

const isLoading = ref<boolean>(false)
const user = ref<InfosUser | null>(null)
const isEditingDescription = ref<boolean>(false)
const editingDescription = ref<string>('')
const originalDescription = ref<string>('')
const validationMessage = ref<string>('')
const hasUnsavedChanges = ref<boolean>(false)

const canSaveDescription = computed(() => {
  const trimmed = editingDescription.value.trim()
  return trimmed.length >= MIN_DESCRIPTION_LENGTH &&
    trimmed.length <= MAX_DESCRIPTION_LENGTH &&
    trimmed !== originalDescription.value.trim() &&
    !validationMessage.value
})

watch(editingDescription, (newValue) => {
  validateDescription(newValue)
  hasUnsavedChanges.value = newValue.trim() !== originalDescription.value.trim()
})

const validateDescription = (value: string) => {
  validationMessage.value = ''
  const trimmed = value.trim()

  if (trimmed.length === 0 && originalDescription.value.trim().length > 0) {
    return
  }

  if (trimmed.length > 0 && trimmed.length < MIN_DESCRIPTION_LENGTH) {
    validationMessage.value = `A descrição deve ter pelo menos ${MIN_DESCRIPTION_LENGTH} caractere`
  } else if (trimmed.length > MAX_DESCRIPTION_LENGTH) {
    validationMessage.value = `A descrição não pode ter mais de ${MAX_DESCRIPTION_LENGTH} caracteres`
  }
}

const getInputStatus = () => {
  if (validationMessage.value) return 'error'
  if (editingDescription.value.length > MAX_DESCRIPTION_LENGTH * 0.9) return 'warning'
  return undefined
}

const getCharCountClass = () => ({
  'char-count-warning': editingDescription.value.length > MAX_DESCRIPTION_LENGTH * 0.8,
  'char-count-danger': editingDescription.value.length > MAX_DESCRIPTION_LENGTH * 0.95
})

const getDescriptionPlaceholder = () => {
  return user.value?.description
    ? 'Edite sua descrição...'
    : 'Conte um pouco sobre você... (Ex: Desenvolvedor apaixonado por tecnologia)'
}

const startDescriptionEdit = async () => {
  originalDescription.value = user.value?.description || ''
  editingDescription.value = originalDescription.value
  isEditingDescription.value = true

  await nextTick()
  descriptionInput.value?.focus()

  if (editingDescription.value) {
    descriptionInput.value?.select()
  }
}

const handleLogout = async () => {
  try {
    await authService.logout()
    await router.push({ name: 'login' })
  } catch (error) {
    toast.error('Erro ao fazer logout')
    console.error('Logout error:', error)
  }
}

const cancelDescriptionEdit = () => {
  if (hasUnsavedChanges.value) {
    const confirmCancel = window.confirm(
      'Você tem alterações não salvas. Deseja realmente cancelar?'
    )
    if (!confirmCancel) return
  }

  editingDescription.value = ''
  originalDescription.value = ''
  isEditingDescription.value = false
  validationMessage.value = ''
  hasUnsavedChanges.value = false
}

const handleInputBlur = () => {
  setTimeout(() => {
    if (!document.activeElement?.closest('.description-edit-container')) {
      if (!hasUnsavedChanges.value) {
        cancelDescriptionEdit()
      }
    }
  }, 150)
}

const saveDescription = async () => {
  if (!canSaveDescription.value) {
    toast.warning('Verifique os dados inseridos')
    return
  }

  const trimmedDescription = editingDescription.value.trim()
  isLoading.value = true

  try {
    const responseAPI = await userService.changeDescription(trimmedDescription)

    if (responseAPI.getError()) {
      const errorMessage = String(responseAPI.getResponse())
      toast.error(errorMessage)
      return
    }

    const userResponse = await userService.getInfosUser()
    if (!userResponse.getError()) {
      user.value = userResponse.getResponse()
    }

    editingDescription.value = ''
    originalDescription.value = ''
    isEditingDescription.value = false
    hasUnsavedChanges.value = false
    validationMessage.value = ''

    toast.success(
      trimmedDescription
        ? 'Descrição atualizada com sucesso!'
        : 'Descrição removida com sucesso!'
    )
  } catch (error) {
    console.error('Erro ao atualizar descrição:', error)
    toast.error('Erro inesperado ao atualizar descrição. Tente novamente.')
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    const response = await userService.getInfosUser()
    if (!response.getError()) {
      user.value = response.getResponse()
    }
  } catch (error) {
    console.error('Erro ao carregar informações do usuário:', error)
    toast.error('Erro ao carregar informações do perfil')
  }
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

.action-link i {
  font-size: 0.875rem;
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

.username {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
}

.container-description {
  margin-bottom: 1.5rem;
}

.description-display {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(209, 213, 219, 0.5);
  transition: all 0.2s ease;
}

.description-display:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(156, 163, 175, 0.7);
}

.description-content {
  flex: 1;
}

.user-description {
  font-size: 1.125rem;
  color: #374151;
  margin: 0;
  font-weight: 400;
  line-height: 1.6;
}

.user-description.placeholder {
  color: #9ca3af;
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.edit-description-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.edit-description-btn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
  color: #374151;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-description-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.description-edit-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #d1d5db;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.input-wrapper {
  position: relative;
}

.input-wrapper :deep(.n-input) {
  border-radius: 10px;
}

.input-wrapper :deep(.n-input__textarea-el) {
  font-size: 1.125rem;
  line-height: 1.5;
  padding: 0.875rem;
  resize: none;
  font-family: inherit;
}

.input-wrapper :deep(.n-input--focus) {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.char-count {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-size: 0.75rem;
  color: #9ca3af;
  background: rgba(255, 255, 255, 0.95);
  padding: 3px 8px;
  border-radius: 6px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(229, 231, 235, 0.7);
  font-weight: 500;
}

.validation-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(254, 226, 226, 0.8);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.875rem;
}

.validation-message i {
  font-size: 0.75rem;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.action-buttons :deep(.n-button) {
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.save-btn:not(:disabled) {
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.25);
}

.editing-tips {
  padding-top: 0.5rem;
  border-top: 1px solid rgba(229, 231, 235, 0.7);
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.editing-tips i {
  font-size: 0.75rem;
  color: #fbbf24;
}

.user-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
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

  .description-edit-container {
    padding: 0.75rem;
  }

  .action-buttons {
    flex-direction: column;
    width: 100%;
  }

  .action-buttons :deep(.n-button) {
    width: 100%;
  }

  .editing-tips {
    font-size: 0.75rem;
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

  .char-count {
    position: static;
    align-self: flex-end;
    margin-top: 0.5rem;
  }
}
</style>
