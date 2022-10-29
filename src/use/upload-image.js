import { ref } from 'vue'
import { useStore } from 'vuex'
import { hideBsModal } from '@/use/bs-modal'
import { getUser } from '@/use/user'

export function useUploadImage (modalId) {
  const store = useStore()
  const progressModal = ref(null)
  const cancel = ref(false)
  const save = ref(false)
  const user = getUser()

  const cancelUpload = () => {
    progressModal.value = null
    cancel.value = true

    hideBsModal(modalId, () => {
      cancel.value = false
      save.value = false
    })
  }

  const progressUpload = (value) => {
    progressModal.value = value
  }

  const complete = async image => {
    const url = modalId === 'uploadAvatar' ? 'imgUrl' : 'headerUrl'

    await store.dispatch('users/update', {
      id: user.value.id,
      [url]: image
    })
  }

  return {
    cancelUpload,
    progressUpload,
    progressModal,
    cancel,
    save,
    complete
  }
}
