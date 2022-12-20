<template>
  <div class="page">
    <the-sidebar :toggleClass="isCompactSb" />
    <div class="content content--right" :class="{'is-full': isCompactSb}">
      <the-header :tooltipTlt="isCompactSb ? 'Развернуть' : 'Свернуть'" @toggle="isCompactSb = !isCompactSb" />
      <main class="main">
        <router-view />
      </main>
      <the-footer />
    </div>
  </div>

  <teleport to="body" v-if="isOverlay">
    <div :class="['overlay', {'is-active': isCompactSb} ]" @click="isCompactSb = false"></div>
  </teleport>

  <teleport to="body">
    <app-message />
  </teleport>
</template>

<script setup>
import TheSidebar from '@/components/TheSidebar.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import AppMessage from '@/components/ui/AppMessage.vue'
import enquire from 'enquire.js'
import { ref } from 'vue'

const isCompactSb = ref(false)
const isOverlay = ref(false)
enquire.register('screen and (max-width: 992px)', {
  match () {
    isOverlay.value = true
  },
  unmatch () {
    isOverlay.value = false
  }
})
</script>
