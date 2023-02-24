<template>
  <div class="f-upload">
    <div
      :class="['f-upload__upload-area', { 'f-upload__upload-area--drag-started': isDragStarted }]"
    >
      <svg-icon
        name="image"
        class="f-upload__image"
      />
      <input
        class="f-upload__input"
        type="file"
        title=""
        @change="uploadHandler"
        @dragenter="isDragStarted = true"
        @dragleave="isDragStarted = false"
      />
      <h5 class="h6 f-upload__title">Перетащите файл сюда</h5>
      <p class="f-upload__desc">или</p>
      <span class="btn btn-secondary btn-sm px-3">Загрузите</span>
    </div>

    <div class="f-upload__file-list">
      <div
        v-if="initialFile"
        class="f-upload__file"
      >
        <div class="f-upload__controls">
          <app-button
            class="f-upload__controls-btn"
            class-list-btn="btn-danger p-2"
            :icon="{ name: 'trash', placement: 'prepend' }"
            @click="removeFile"
          />
        </div>
        <img
          class="img-fluid"
          :src="initialFile"
          alt=""
        />
      </div>
      <template v-else-if="files.length">
        <div
          v-for="file in files"
          :key="file.name"
          class="f-upload__file"
        >
          <div class="f-upload__controls">
            <app-button
              v-if="progress !== 100"
              class="f-upload__controls-btn"
              class-list-btn="btn-primary p-2"
              :icon="{ name: 'upload', placement: 'prepend' }"
              @click="start(file)"
            />

            <app-button
              class="f-upload__controls-btn"
              class-list-btn="btn-danger p-2"
              :icon="{ name: 'trash', placement: 'prepend' }"
              @click="removeFile(file)"
            />
          </div>
          <img
            class="img-fluid"
            :src="getSrc(file)"
            :alt="file.name"
          />
          <div
            class="progress f-upload__progress"
            role="progressbar"
            :aria-label="file.name"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="f-upload__file-name">
              {{ file.name }}
            </div>
            <div
              :class="[
                'progress-bar',
                'progress-bar-animated',
                'bg-info',
                { 'progress-bar-striped': progress !== 100 }
              ]"
              :style="`width: ${progress}%`"
            >
              {{ progress }}%
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useUploadToFirebase } from '@/use/upload-to-firebase'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])

// eslint-disable-next-line no-undef
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
})

const store = useStore()
const files = ref([])
const initialFile = computed(() => props.modelValue)
const isDragStarted = ref(false)
const { start, progress, remove } = useUploadToFirebase(props.url, emit)

const uploadHandler = ({ currentTarget }) => {
  if (currentTarget.files) {
    files.value.push(...Array.from(currentTarget.files))

    currentTarget.value = ''
    isDragStarted.value = false
  }
}

const removeFile = async file => {
  if (file) {
    files.value = files.value.filter(f => f?.name !== file.name)
  } else {
    try {
      await remove(props.modelValue)
      await store.dispatch('communal/update', { id: props.id, image: '' })
    } catch (e) {
      /* empty */
    }
  }
}

const getSrc = file => URL.createObjectURL(file)
</script>

<style scoped lang="sass">
.f-upload
	$self: &

	&__upload-area
		position: relative
		padding: 20px
		text-align: center
		cursor: pointer
		background-color: rgba($gray-100, .5)
		border-radius: $border-radius
		border: 2px dashed $gray-300

		&--drag-started
			background-color: $gray-200
			border-color: $gray-500

			#{$self}
				&__image
					color: $gray-600

	&__input
		position: absolute
		left: 0
		right: 0
		top: 0
		bottom: 0
		z-index: 1
		opacity: 0
		cursor: pointer

	&__image
		font-size: 60px
		margin-bottom: 15px
		color: $gray-400

	&__title
		font-weight: 600

	&__desc
		margin-bottom: 10px

	&__file-list
		margin-top: 20px

	&__file
		position: relative

		&-name
			position: absolute
			left: 0
			top: 0
			padding: 0 10px
			color: $black
			font-size: 12px
			width: 100%
			height: 100%

		&:not(:last-child)
			margin-bottom: 10px

	&__progress
		position: absolute
		left: 0
		right: 0
		bottom: 0
		z-index: 5
		border-radius: 0
		height: 20px

	&__controls
		position: absolute
		right: 12px
		top: 12px
		z-index: 1
		display: flex
		align-items: center

		&-btn
			&:not(:last-child)
				margin-right: 10px

	@include media-breakpoint-up(lg)
		&__upload-area
			padding: 40px
			transition: background-color, border-color, .3s ease

			&:hover
				background-color: $gray-100
				border-color: $gray-400

				#{$self}
					&__image
						color: $gray-500

		&__image
			font-size: 90px
			transition: color .3s ease
</style>
