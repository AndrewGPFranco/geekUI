<template>
  <n-message-provider>
    <n-modal-provider>
      <div class="min-h-screen flex flex-col">
        <NavbarComponent />

        <div class="flex flex-1 pt-20">
          <MenuComponent />
          <main class="flex-1 pl-64 bg-[#1A2135] p-6">
            <router-view />
          </main>
        </div>

        <FooterComponent />
      </div>
    </n-modal-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import NavbarComponent from '@/components/home/NavbarComponent.vue'
import MenuComponent from '@/components/home/MenuComponent.vue'
import FooterComponent from '@/components/home/FooterComponent.vue'
</script>
