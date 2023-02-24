import { initializeApp } from 'firebase/app'
import {
  getDownloadURL,
  getStorage,
  ref as fbRef,
  uploadBytesResumable,
  deleteObject
} from 'firebase/storage'
import { ref } from 'vue'

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

export const useUploadToFirebase = (url, emit) => {
  const fbCloud = initializeApp(firebaseConfig)
  const storage = getStorage(fbCloud)
  const uploadTask = ref(null)
  const spaceRef = ref(null)
  const progress = ref(0)
  const downloadURL = ref('')

  const upload = () => {
    uploadTask.value.resume()

    if (uploadTask.value) {
      uploadTask.value.on(
        'state_changed',
        snapshot => {
          progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        error => {
          console.error(error)
        },
        async () => {
          try {
            downloadURL.value = await getDownloadURL(uploadTask.value.snapshot.ref)
            emit('update:modelValue', downloadURL.value)
          } catch (e) {
            switch (e.code) {
              case 'storage/object-not-found':
                console.error("File doesn't exist")
                break

              case 'storage/unauthorized':
                console.error("User doesn't have permission to access the object")
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

  const start = (file, pause = false) => {
    spaceRef.value = fbRef(storage, url + file.name)
    uploadTask.value = uploadBytesResumable(spaceRef.value, file)

    if (pause) {
      uploadTask.value.pause()
    } else {
      upload()
    }
  }

  const cancel = () => {
    if (uploadTask.value) {
      uploadTask.value.cancel()
    }
  }

  const remove = async url => {
    const desertRef = fbRef(storage, url)

    try {
      await deleteObject(desertRef)
      emit('update:modelValue', '')
    } catch (e) {
      throw new Error(e)
    }
  }

  return {
    progress,
    downloadURL,
    start,
    cancel,
    upload,
    remove
  }
}
