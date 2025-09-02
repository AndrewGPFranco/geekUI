<template>
  <section>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const rolesTypes = ["LEITOR", "ESCRITOS", "MODERADOR", "ADMINISTRADOR"];

const nome = ref<string>('')
const email = ref<string>('')
const senha = ref<string>('')
const roles = ref<string>('')
const nomeCompleto = ref<string>('')
const dataNascimento = ref<string>('')
const identificador = ref<string>('')

</script>
