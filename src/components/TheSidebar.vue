<template>
  <aside class="sidebar" :class="{'is-compact': toggleSb}" id="sidebarMenu">
    <button
      class="btn-round p-0 sidebar__collapse-btn"
      :class="{'is-active': toggleSb}"
      type="button"
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      data-bs-title="Свернуть"
      @click="toggleSbHandler"
      v-tooltip="{title: toogleBtnTooltip, placement: 'right'}"
      :key="toogleBtnTooltip"
    >
      <app-icon name="arrow-bar-left" />
      <app-icon name="arrow-bar-right" />
    </button>

    <app-logo url="/" classList="sidebar__logo mb-25" />
    <app-nav />
  </aside>
</template>

<script setup>
import AppLogo from '@/components/AppLogo.vue'
import AppNav from '@/components/AppNav.vue'
import { ref } from 'vue'

// eslint-disable-next-line no-undef
defineProps({
  toggleClass: {
    type: Boolean,
    required: false,
    default: true
  }
})

const toggleSb = ref(false)
const toogleBtnTooltip = ref('свернуть')
const body = document.body
const toggleSbHandler = () => {
  toggleSb.value = !toggleSb.value

  if (toggleSb.value) {
    body.classList.add('is-sb-collapsed')
    toogleBtnTooltip.value = 'развернуть'
  } else {
    body.classList.remove('is-sb-collapsed')
    toogleBtnTooltip.value = 'свернуть'
  }
}
</script>
