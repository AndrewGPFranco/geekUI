<template>
  <div class="form-container">
    <div class="icon-container">
      <div class="icon-wrapper">
        <i class="pi pi-user" style="font-size: 2rem; color: white;"></i>
      </div>
    </div>

    <n-form ref="formRef" :model="formData" class="form-content">
      <n-form-item label="Email" path="email">
        <n-input
          v-model:value="formData.email"
          type="text"
          placeholder="seu@email.com"
          size="large"
          :disabled="isLoading"
          @input="validateEmail"
          :status="emailStatus"
          class="custom-input"
        />
      </n-form-item>

      <n-form-item label="Senha" path="senha">
        <n-input
          v-model:value="formData.senha"
          :type="isExibindoSenha ? 'text' : 'password'"
          placeholder="••••••••"
          size="large"
          :disabled="isLoading"
          class="custom-input"
        >
          <template #suffix>
            <n-button
              v-if="formData.senha.length > 0"
              text
              @click="toggleSenhaVisibility"
              class="password-toggle"
            >
              <i
                :class="isExibindoSenha ? 'pi pi-eye-slash' : 'pi pi-eye'"
                style="font-size: 1.2rem;"
              ></i>
            </n-button>
          </template>
        </n-input>
      </n-form-item>

      <div class="forgot-password">
        <router-link to="/auth/forgot-password" class="forgot-link">
          Esqueceu a senha?
        </router-link>
      </div>

      <n-button
        type="primary"
        size="large"
        :loading="isLoading"
        :disabled="!isEmailValid"
        @click="handleLogin"
        class="login-button"
        block
      >
        <span v-if="!isLoading">Entrar</span>
        <span v-else>Entrando...</span>
      </n-button>
    </n-form>
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
  email: '',
  senha: ''
})

const isLoading = ref(false)
const isEmailValid = ref(false)
const isExibindoSenha = ref(false)

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

const toggleSenhaVisibility = () => {
  isExibindoSenha.value = !isExibindoSenha.value
}

const handleLogin = async () => {
  isLoading.value = true
  try {
    const mapValidation = ValidationUtils.validaInputLogin(
      formData.email,
      formData.senha
    )

    if (mapValidation.get(false)) {
      message.error(String(mapValidation.get(false)))
      isLoading.value = false
      return
    }

    const responseAPI = await authService.login(
      formData.email,
      formData.senha
    )

    if (responseAPI.getError()) {
      message.error(String(responseAPI.getResponse()))
      isLoading.value = false
      return
    }

    await router.push('/')
  } catch (error) {
    console.error(error)
    message.error('Erro interno do sistema')
    isLoading.value = false
  }
}
</script>

<style scoped>
.form-container {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  width: 100%;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.icon-wrapper {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Estilização personalizada dos inputs */
.custom-input :deep(.n-input__input-el) {
  height: 3rem;
  font-size: 1rem;
}

.custom-input :deep(.n-input--focus .n-input__border) {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2) !important;
}

.custom-input :deep(.n-input__border) {
  border-color: #d1d5db;
  transition: all 0.2s ease;
}

.password-toggle {
  padding: 0 !important;
  margin-right: 0.5rem;
  color: #6b7280;
}

.password-toggle:hover {
  color: #374151;
}

.forgot-password {
  text-align: right;
  margin-top: -0.5rem;
}

.forgot-link {
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #1d4ed8;
}

.login-button {
  height: 3rem !important;
  background: linear-gradient(90deg, #2563eb 0%, #9333ea 100%) !important;
  border: none !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4) !important;
  transition: all 0.2s ease !important;
}

.login-button:hover:not([disabled]) {
  background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 100%) !important;
  box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.6) !important;
  transform: translateY(-1px);
}

.login-button:disabled {
  opacity: 0.5 !important;
  cursor: not-allowed !important;
}

:deep(.n-form-item-label) {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: #374151 !important;
}
</style>
