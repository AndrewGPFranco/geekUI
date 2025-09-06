<template>
  <div class="form-send-forgot-container">
    <div class="content-wrapper">
      <div class="header-section">
        <h2 class="title">Alteração da Senha</h2>
      </div>

      <div class="form-container">
        <div class="form-background"></div>

        <div class="form-content">
          <n-form ref="formRef" :model="formData">
            <n-form-item path="email">
              <template #label>
                <div class="label-with-icon">
                  <i class="pi pi-lock label-icon"></i>
                  <span class="label-text">Email</span>
                </div>
              </template>

              <n-input
                v-model:value="formData.email"
                type="text"
                placeholder="Digite seu email"
                size="large"
                :disabled="isLoading"
                :status="emailStatus"
                class="custom-input"
                @input="validateEmail"
                @keyup="handleSubmit"
              />
            </n-form-item>

            <n-button
              type="primary"
              size="large"
              :loading="isLoading"
              :disabled="!isEmailValid"
              @click="handleSubmit"
              class="submit-button"
              block
            >
              <span v-if="!isLoading">Solicitar Link</span>
              <span v-else>Enviando...</span>
            </n-button>

            <div class="back-link-section">
              <router-link to="/auth/login" class="back-link">
                ← Voltar ao login
              </router-link>
            </div>
          </n-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, NForm, NFormItem, NInput, NButton } from 'naive-ui'
import AuthService from '@/services/AuthService'
import ValidationUtils from '@/utils/ValidationUtils'

const router = useRouter()
const message = useMessage()
const formRef = ref(null)

const formData = reactive({
  email: ''
})

const isLoading = ref(false)
const isEmailValid = ref(false)

const emailStatus = computed(() => {
  if (formData.email === '') return undefined
  return isEmailValid.value ? 'success' : 'error'
})

const authService = new AuthService()

watch(() => formData.email, (newEmail) => {
  validateEmail(newEmail)
})

const validateEmail = (email: string) => {
  isEmailValid.value = ValidationUtils.validEmailWithRegex(email || formData.email)
}

const handleSubmit = async () => {
  isLoading.value = true

  try {
    if (!ValidationUtils.validEmailWithRegex(formData.email)) {
      message.error('Digite um email válido!')
      isLoading.value = false
      return
    }

    const responseAPI = await authService.solicitarLinkParaNovaSenha(formData.email)

    if (responseAPI.getError()) {
      message.error(responseAPI.getResponse() as string)
      isLoading.value = false
      return
    }

    message.success(responseAPI.getResponse() as string)
    isLoading.value = false

    await router.push('/auth/login')
  } catch (error) {
    console.error(error)
    message.error('Erro interno do sistema')
    isLoading.value = false
  }
}
</script>

<style scoped>
.form-send-forgot-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.content-wrapper {
  width: 100%;
  max-width: 28rem;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.875rem;
  font-weight: 700;
  color: black;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.form-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
  0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.form-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 51, 234, 0.03) 100%);
  pointer-events: none;
  z-index: 1;
}

.form-content {
  position: relative;
  z-index: 2;
}

.label-with-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.label-icon {
  color: #6b7280;
  font-size: 1rem;
}

.label-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.custom-input {
  position: relative;
  z-index: 3;
}

.custom-input :deep(.n-input) {
  border-radius: 0.75rem;
  background-color: rgba(249, 250, 251, 0.8);
}

.custom-input :deep(.n-input__input-el) {
  height: 3.5rem;
  font-size: 1rem;
  background-color: transparent;
  transition: all 0.3s ease;
  position: relative;
  z-index: 4;
}

.custom-input :deep(.n-input__border) {
  border-color: #d1d5db;
  border-width: 2px;
  transition: all 0.3s ease;
}

.custom-input :deep(.n-input--focus .n-input__border) {
  border-color: #2563eb !important;
  border-width: 2px !important;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1) !important;
}

.custom-input:hover :deep(.n-input) {
  background-color: rgba(255, 255, 255, 0.9);
}

.submit-button {
  height: 3.5rem !important;
  background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%) !important;
  border: none !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  border-radius: 0.75rem !important;
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.3) !important;
  transition: all 0.3s ease !important;
  margin-top: 1.5rem;
  position: relative;
  z-index: 3;
  cursor: pointer;
}

.submit-button:hover:not([disabled]) {
  background: linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%) !important;
  box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.4) !important;
  transform: translateY(-2px);
}

.submit-button:disabled {
  opacity: 0.6 !important;
  cursor: not-allowed !important;
  transform: none !important;
}

.back-link-section {
  text-align: center;
  padding-top: 1rem;
  margin-top: 1rem;
  position: relative;
  z-index: 3;
}

.back-link {
  font-size: 0.875rem;
  color: #4b5563;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem;
}

.back-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

:deep(.n-form-item-label) {
  margin-bottom: 0.75rem !important;
  position: relative;
  z-index: 3;
}

:deep(.n-form-item) {
  position: relative;
  z-index: 3;
}

@media (max-width: 640px) {
  .title {
    font-size: 1.5rem;
  }

  .form-container {
    padding: 1.5rem;
    margin: 0 0.5rem;
  }

  .form-send-forgot-container {
    padding: 0.5rem;
  }
}

:deep(.n-button),
:deep(.n-input),
:deep(.router-link-active),
:deep(a) {
  position: relative;
  z-index: 10;
}
</style>
