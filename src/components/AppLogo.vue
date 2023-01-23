<template>
  <div :class="['logo', { 'logo--dark': theme === 'dark' }, classList]">
    <img
      v-if="theme === 'dark'"
      class="logo__img"
      src="/images/logo/wallet-gray.png"
      alt="ZmCrm"
    />
    <img
      v-else
      class="logo__img"
      src="/images/logo/wallet.png"
      alt="ZmCrm"
    />
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
    validator(value) {
      return ['dark', 'primary'].includes(value)
    }
  },
  classList: {
    type: String,
    required: false
  }
})
</script>

<style lang="sass">
.logo
	$self: &

	display: flex
	align-items: center
	text-decoration: none
	cursor: default

	&__text
		margin-left: 15px
		font-weight: 700
		font-size: 24px
		line-height: 1
		color: $primary

	&__img
		width: 25px
		height: auto

		@include media-breakpoint-up(lg)
			transition: opacity .3s ease

	&--dark
		#{$self}
			&__text
				color: $gray-700

	&--lg
		font-weight: 800
		font-size: 30px

		#{$self}
			&__img
				width: 35px
</style>
