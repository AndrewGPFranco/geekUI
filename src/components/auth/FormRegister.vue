<template>
  <section>
    <n-form :rules="rules" :model="model">
      <n-grid :span="24" :x-gap="24">
        <n-form-item-gi :span="12" label="Nome" path="nameInput">
          <n-input v-model="model.name" placeholder="Informe seu primeiro nome" type="text" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Nome Completo" path="fullNameInput">
          <n-input v-model="model.fullName" placeholder="Digite seu nome completo" type="text" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Email" path="emailInput">
          <n-input v-model="model.email" placeholder="Informe seu email" type="text" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Senha" path="passwordInput">
          <n-input v-model="model.password" placeholder="Digite sua senha" type="password" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Data de Nascimento" path="dateOfBirthInput">
          <n-date-picker v-model="model.dateOfBirth" type="datetime" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" label="Username" path="usernameInput">
          <n-input v-model="model.username" placeholder="Digite um username" type="text" />
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="Cargos" path="rolesInput">
          <n-transfer
            style="width: 100%"
            :options="generalOptions"
            v-model="model.roles"
          />
        </n-form-item-gi>

        <n-form-item-gi>
          <n-button type="primary">
            Cadastrar-se
          </n-button>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItemGi, NInput, NGrid, NDatePicker, NTransfer, NButton } from 'naive-ui'

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

const model = ref({
  name: '',
  email: '',
  password: '',
  fullName: '',
  roles: [],
  username: '',
  dateOfBirth: null
})
</script>
