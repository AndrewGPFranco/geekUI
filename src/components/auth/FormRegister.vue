<template>
  <section v-if="!uuidRegister">
    <n-form :rules="rules" :model="model">
      <n-grid :span="24" :x-gap="24">
        <n-form-item-gi :span="12" label="Nome" path="nameInput">
          <n-input v-model:value="model.nome" placeholder="Informe seu primeiro nome" type="text" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Nome Completo" path="fullNameInput">
          <n-input v-model:value="model.nomeCompleto" placeholder="Digite seu nome completo"
                   type="text" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Email" path="emailInput">
          <n-input v-model:value="model.email" placeholder="Informe seu email" type="text" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Senha" path="passwordInput">
          <n-input v-model:value="model.senha" placeholder="Digite sua senha" type="password" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Data de Nascimento" path="dateOfBirthInput">
          <n-date-picker
            v-model:value="model.dataNascimentoTimestamp"
            placeholder="Informe sua data de nascimento"
            type="date"
            style="width: 100%"
          />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Username" path="usernameInput">
          <n-input v-model:value="model.identificador" placeholder="Digite um username"
                   type="text" />
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="Cargos" path="rolesInput">
          <n-transfer
            style="width: 100%"
            :options="generalOptions"
            v-model:value="model.roles"
          />
        </n-form-item-gi>

        <n-form-item-gi :span="24" style="text-align: center">
          <n-button type="primary" :loading="isLoading" @click="handleRegister">
            Cadastrar-se
          </n-button>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </section>

  <section v-else
           style="max-width: 400px; margin: auto; padding: 2rem; background: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 1.5rem; align-items: center;">
    <div style="text-align: center;">
      <div
        style="width: 64px; height: 64px; background: #DBEAFE; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
        <n-icon size="32" color="#2563EB">
          <i class="pi pi-envelope" />
        </n-icon>
      </div>
      <h1 style="font-size: 1.5rem; font-weight: bold; color: #1F2937; margin-bottom: 0.5rem;">
        Verificação de Email</h1>
      <p style="color: #4B5563;">Digite o código de 6 dígitos enviado para seu email</p>
    </div>

    <n-input-otp
      v-model:value="otp"
      :length="6"
      :disabled="isCodeExpired || isLoading"
      style="justify-content: center;"
    />

    <div>
      <div
        :style="{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'all 0.2s',
        backgroundColor: isCodeExpired ? '#FEE2E2' : '#EFF6FF',
        color: isCodeExpired ? '#DC2626' : '#1D4ED8',
      }"
      >
        <n-icon size="16"><i class="pi pi-clock" />
        </n-icon>
        <span>
        {{ isCodeExpired ? 'Código Expirado' : `Tempo restante: ${formatTime(timeRemaining)}` }}
      </span>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%;">
      <n-button
        type="primary"
        block
        size="large"
        :disabled="isCodeExpired || otp.length !== 6"
        @click="validateCode"
      >
        {{ isCodeExpired ? 'Código Expirado' : 'Confirmar Código' }}
      </n-button>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import {
  NForm,
  NFormItemGi,
  NInput,
  NGrid,
  NDatePicker,
  NTransfer,
  NButton,
  NInputOtp,
  useMessage
} from 'naive-ui'
import AuthService from '@/services/AuthService.ts'
import type { UserRegisterInput } from '@/types/interfaces/UserRegisterInput.ts'
import ValidationUtils from '@/utils/ValidationUtils.ts'
import type ResponseAPI from '@/utils/ResponseAPI.ts'
import router from '@/router'

const toast = useMessage()
const authService = new AuthService()
const otp = ref<Array<string>>([])
const uuidRegister = ref<string>('')
let countdownInterval: number | null = null
const timeRemaining = ref<number>(600)
const isLoading = ref<boolean>(false)
const isCodeExpired = ref<boolean>(false)

const generalOptions = [
  {
    label: 'LEITOR',
    value: 'LEITOR'
  },
  {
    label: 'ESCRITOR',
    value: 'ESCRITOR'
  },
  {
    label: 'MODERADOR',
    value: 'MODERADOR'
  },
  {
    label: 'ADMINISTRADOR',
    value: 'ADMINISTRADOR'
  }
]

const rules = {
  nameInput: {
    required: true,
    message: 'É necessário informar seu nome'
  },
  fullNameInput: {
    required: true,
    message: 'É necessário informar seu nome completo'
  },
  emailInput: {
    required: true,
    message: 'É necessário informar seu email'
  },
  passwordInput: {
    required: true,
    message: 'É necessário informar uma senha'
  },
  dateOfBirthInput: {
    required: true,
    message: 'É necessário informar sua data de nascimento'
  },
  usernameInput: {
    required: true,
    message: 'É necessário informar um nome para usuário'
  },
  rolesInput: {
    required: true,
    message: 'É necessário informar ao menos um cargo'
  }
}

const model = ref<UserRegisterInput>({
  nome: '',
  email: '',
  senha: '',
  nomeCompleto: '',
  roles: [],
  identificador: '',
  dataNascimentoTimestamp: null,
  dataNascimento: null
})

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

const startCountdown = (): void => {
  timeRemaining.value = 600
  isCodeExpired.value = false

  countdownInterval = setInterval(() => {
    timeRemaining.value--

    if (timeRemaining.value <= 0) {
      isCodeExpired.value = true
      if (countdownInterval) {
        clearInterval(countdownInterval)
        countdownInterval = null
      }
      toast.warning('O código de verificação expirou. Solicite um novo código.')
    }
  }, 1000)
}

const stopCountdown = (): void => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
}

const handleRegister = async () => {
  isLoading.value = true
  const mapValidation = ValidationUtils.validaInputRegistroUsuario(model.value)

  if (mapValidation.get(true)) {
    if (!ValidationUtils.validPasswordWithRegex(model.value.senha)) {
      mapValidation.set(
        false,
        'A senha não esta de acordo com o padrão necessário!'
      )
    }
  }

  if (mapValidation.get(false)) {
    if (verificaQuantidadeCamposInvalidos(mapValidation.get(false)))
      toast.error(`Os campos: ${mapValidation.get(false)} estão inválidos!`)
    else
      toast.error(`O campo: ${mapValidation.get(false)} está inválido!`)

    isLoading.value = false
    return
  }

  const result = await authService.registrarUsuario(model.value)

  if (result.getError()) {
    toast.error(result.getResponse() as string)
    isLoading.value = false
    return
  }

  isLoading.value = false
  uuidRegister.value = result.getResponse() ?? ''
  startCountdown()
}

const verificaQuantidadeCamposInvalidos = (mensagem: string | undefined) => {
  if (mensagem !== undefined) return mensagem.split(',').length > 1
  return false
}

const validateCode = async () => {
  if (isCodeExpired.value) {
    toast.error('Código expirado! Solicite um novo código.')
    return
  }

  if (otp.value.length !== 6) {
    toast.error('É necessário informar os 6 dígitos!')
    return
  }

  const code = otp.value.join('')

  const result: ResponseAPI<boolean, string> = await authService.validateCode(
    code,
    uuidRegister.value
  )

  if (result.getError()) {
    toast.error(result.getResponse() as string)
    return
  }

  stopCountdown()
  toast.success('Conta registrada com sucesso!')
  await router.push('/auth/login')
}

onUnmounted(() => {
  stopCountdown()
})
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
