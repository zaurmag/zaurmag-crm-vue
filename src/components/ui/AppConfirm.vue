<template>
  <app-modal ref="modal" :title="title">
    <p class="mb-0">{{ text }}</p>

    <template #footer>
      <button class="btn btn-success" type="button" @click="$emit('resolve')">Да</button>
      <button class="btn btn-secondary" type="button" @click="close">Отмена</button>
    </template>
  </app-modal>
</template>

<script>
import AppModal from '@/components/ui/AppModal'
import { ref, watch } from 'vue'

export default {
  name: 'AppConfirm',
  props: ['title', 'text'],
  emits: ['resolve'],
  setup () {
    const confirm = ref(false)
    const modal = ref(false)
    watch(confirm, val => {
      val ? modal.value.modal = true : modal.value.modal = false
    })
    const close = () => {
      confirm.value = false
    }

    return {
      close,
      modal,
      confirm
    }
  },
  components: {
    AppModal
  }
}
</script>

<style scoped>

</style>
