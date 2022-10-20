<template>
  <file-pond
    name="test"
    ref="pond"
    server="http://localhost:8080"
    label-idle="Перенесите файлы сюда..."
    :allow-multiple="false"
    accepted-file-types="image/jpeg, image/png"
    :files="myFiles"
    credits=""
    @addfile="addFile"
  />
</template>

<script setup>
import { ref } from 'vue'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)

const pond = ref(null)
const myFiles = ref([])
const addFile = () => {
  const { file } = pond.value.getFile()
  console.log(file)
}

// const label = `
//   <div class="f-upload">
//     <div class="f-upload__area">
//       <app-icon name="image" classList="f-upload__image" />
//       <h5 class="h6 f-upload__title">Перетащите файл сюда</h5>
//       <p class="f-upload__desc">или</p>
//       <span class="btn btn-primary">Загрузите</span>
//     </div>
//   </div>
// `
</script>
