<template>
  <div class="f-upload">
    <div class="f-upload__area">
      <svg-icon
        name="image"
        class="f-upload__image"
      />
      <h5 class="h6 f-upload__title">Перетащите файл сюда</h5>
      <p class="f-upload__desc">или</p>
      <span class="btn btn-primary btn-sm px-3">Загрузите</span>
    </div>
  </div>
</template>

<script></script>

<style scoped lang="sass">
.f-upload
	$self: &

	background-color: rgba($gray-100, .5)
	border-radius: $border-radius
	border: 2px dashed $gray-300
	padding: 20px
	text-align: center
	cursor: pointer

	&__image
		font-size: 60px
		margin-bottom: 15px
		color: $gray-400

	&__title
		font-weight: 600

	&__desc
		margin-bottom: 10px

	@include media-breakpoint-up(lg)
		padding: 40px
		transition: background-color, border-color, .3s ease

		&__image
			font-size: 90px
			transition: color .3s ease

		&:hover
			background-color: $gray-100
			border-color: $gray-400

			#{$self}
				&__image
					color: $gray-500
</style>
