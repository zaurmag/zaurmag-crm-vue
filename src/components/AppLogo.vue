<template>
  <div :class="['logo', { 'logo--dark': theme === 'dark' }, classList]">
    <img v-if="theme === 'dark'" class="logo__img" src="/images/logo/wallet-gray.png" alt="ZmCrm"/>
    <img v-else class="logo__img" src="/images/logo/wallet.png" alt="ZmCrm"/>
    <span class="logo__text">ZmCrm</span>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  theme: {
    type: String,
    required: false,
    default: 'primary',
    validator (value) {
      return ['dark', 'primary'].includes(value)
    }
  },
  classList: {
    type: String,
    required: false
  }
})
</script>
