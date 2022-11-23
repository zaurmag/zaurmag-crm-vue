<template>
  <div class="profile">
    <header class="profile__header" :style="`background-image: url(${headerImg})`">
      <div class="profile__back-profile">
        <slot name="headerBackProfile" />
      </div>
      <div class="profile__edit">
        <slot name="headerEdit" />
      </div>
      <div class="profile__short-info">
        <slot name="headerShortInfo" />
      </div>
    </header>
    <div class="profile__content">
      <slot name="default" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  headerImg: {
    type: String,
    required: true
  }
})
</script>
