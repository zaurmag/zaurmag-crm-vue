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

<script>
import TheSidebar from '@/components/TheSidebar'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import AppMessage from '@/components/ui/AppMessage'
import { ref } from 'vue'
import enquire from 'enquire.js'

export default {
  name: 'MainLayout',
  setup () {
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

    return {
      isCompactSb,
      isOverlay
    }
  },
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    AppMessage
  }
}
</script>

<style scoped lang="sass">

</style>
