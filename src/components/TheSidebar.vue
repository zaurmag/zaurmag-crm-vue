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
      <svg class="icon icon-arrow-bar-left">
        <use xlink:href="#arrow-bar-left"></use>
      </svg>
      <svg class="icon icon-arrow-bar-right">
        <use xlink:href="#arrow-bar-right"></use>
      </svg>
    </button>

    <app-logo url="/" classList="sidebar__logo mb-25" />
    <app-nav />
  </aside>
</template>

<script setup>
import AppLogo from '@/components/ui/AppLogo'
import AppNav from '@/components/AppNav'
import { defineProps, ref } from 'vue'

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
