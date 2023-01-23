<template>
  <div class="profile">
    <header
      class="profile__header"
      :style="`background-image: url(${headerImg})`"
    >
      <div
        v-if="$slots.headerBackProfile"
        class="profile__back-profile"
      >
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
// eslint-disable-next-line no-undef
defineProps({
  headerImg: {
    type: String,
    required: true
  }
})
</script>

<style lang="sass" scoped>
.profile
	&__header
		position: relative
		display: flex
		align-items: flex-end
		justify-content: center
		border-radius: 10px
		background-color: $blue-400
		background-size: cover

	&__edit,
	&__back-profile
		position: absolute
		bottom: 20px

	&__back-profile
		left: 20px

	&__edit
		right: 20px

	&__short-info
		transform: translateY(40%)
		text-align: center

	&__name
		&.h5
			margin: 0
			font-weight: 500

	&__content
		margin-top: 100px

::v-deep
	.profile
		&__avatar
			flex-shrink: 0
			position: relative
			margin: 0 auto 10px
			width: 118px
			height: 118px

			&-img
				border-radius: 50%
				border: 5px solid $white
				width: 100%
				height: 100%

			&-edit
				position: absolute
				right: 0
				bottom: 0
				padding: 0
				width: 38px
				height: 38px

			&-indicator
				position: absolute
				right: 0
				bottom: 0
				z-index: 10
				border: 3px solid $white
				transform: translate(-50%, -50%)

		&__contact
			line-height: 1.65

			&-item
				display: flex
				align-items: center
				padding-top: 7px
				padding-bottom: 7px

				a
					color: $dark
					text-decoration: none

					@include media-breakpoint-up(lg)
						&:hover
							color: $primary

				.icon
					margin-right: 10px
					color: $gray-500
					font-size: 16px
					width: 20px

		&__edit,
		&__back-profile
			.btn
				font-size: 13px

				@include media-breakpoint-down(lg)
					padding: 0
					height: 40px
					width: 40px

					.icon
						font-size: 18px

		// Nav
		&__nav
			.nav-link
				text-align: left
				line-height: normal

				&.active
					background-color: transparent
					color: $primary
</style>
