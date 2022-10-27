<template>
  <file-pond
    name="fileUpload"
    ref="pond"
    credits=""
    :allow-multiple="false"
    :files="myFiles"
    imageResizeTargetWidth="400"
    imageResizeTargetHeight="400"
    allowImageResize="true"
    allowImageCrop="true"
    imageCropAspectRatio="16:9"
    label-idle="Перенесите файлы сюда..."
    accepted-file-types="image/jpeg, image/png"
    @addfile="addFile"
  />
</template>

<script setup>
import { ref, defineEmits, defineProps, computed, watch } from 'vue'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import { initializeApp } from 'firebase/app'
import { getStorage, ref as fbRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

// Emits
const emits = defineEmits(['progress', 'uploadCancel', 'uploadSuccess'])

// Props
const props = defineProps({
  cancel: {
    type: Boolean,
    required: false,
    default: false
  },
  save: {
    type: Boolean,
    required: false,
    default: false
  }
})

// Create component FilePond
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageCrop
)

// Firebase configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: 'zaurmagcrm',
  storageBucket: 'zaurmagcrm.appspot.com',
  messagingSenderId: '',
  appId: ''
}

// Initialize Firebase
const fbCloud = initializeApp(firebaseConfig)
const storage = getStorage(fbCloud)

const pond = ref(null)
const myFiles = ref([])
const progress = ref(null)
const uploadTask = ref(null)
const spaceRef = ref(null)
const cancel = computed(() => props.cancel)
const save = computed(() => props.save)

watch(cancel, val => {
  if (val) {
    pond.value.removeFiles({ revert: true })

    if (uploadTask.value) {
      uploadTask.value.cancel()
    }
  }
})

watch(save, val => {
  if (val) {
    uploadTask.value.resume()

    if (uploadTask.value) {
      uploadTask.value.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          emits('progress', progress.value)
        },
        error => {
          console.error(error)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.value.snapshot.ref)
            emits('uploadSuccess', downloadURL)
          } catch (e) {
            switch (e.code) {
              case 'storage/object-not-found':
                console.error('File doesn\'t exist')
                break

              case 'storage/unauthorized':
                console.error('User doesn\'t have permission to access the object')
                break

              case 'storage/canceled':
                console.error('User canceled the upload')
                break
            }
          }
        }
      )
    }
  }
})

const addFile = () => {
  const { file } = pond.value.getFile()
  spaceRef.value = fbRef(storage, `/users/zaurmag/images/${file.name}`)

  uploadTask.value = uploadBytesResumable(spaceRef.value, file)
  uploadTask.value.pause()
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
