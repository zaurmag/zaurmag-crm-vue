<template>
  <the-page>
    <the-sidebar />

    <div
      v-if="isOverlay"
      :class="['overlay', { 'is-active': sidebarState }]"
      @click="closeSidebarHandler"
    />

    <the-content
      class="content content--right"
      :class="{ 'is-full': sidebarState }"
    >
      <the-header :tooltip-tlt="sidebarState ? 'Развернуть' : 'Свернуть'" />

      <the-main>
        <router-view />
      </the-main>

      <the-footer />
    </the-content>
  </the-page>

  <teleport to="body">
    <app-message />
  </teleport>
</template>

<script setup>
import ThePage from '@/components/ThePage.vue'
import TheMain from '@/components/TheMain.vue'
import TheContent from '@/components/TheContent.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import AppMessage from '@/components/ui/AppMessage.vue'
import enquire from 'enquire.js'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

const store = useStore()
const sidebarState = computed(() => store.getters.sidebar)
const isOverlay = ref(false)
enquire.register('screen and (max-width: 992px)', {
  match() {
    isOverlay.value = true
  },
  unmatch() {
    isOverlay.value = false
  }
})

const closeSidebarHandler = () => {
  store.commit('setSidebar', false)
}
</script>

<style scoped lang="sass">
.overlay
	position: fixed
	left: 0
	right: 0
	top: 0
	bottom: 0
	z-index: 100
	display: none
	background-color: rgba($black, 60%)
	//opacity: 0
	//transition: opacity 0.2s ease

	&.is-active
		display: block
		//opacity: 1
</style>
