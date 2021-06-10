<template>
  <app-modal :title="title" @close="$emit('reject')">
    <p>{{ text }}</p>

    <template #footer>
      <button class="btn btn-danger" type="button" @click="$emit('confirm')">Да</button>
      <button class="btn btn-secondary" type="button" data-bs-dismiss="modal" @close="$emit('reject')">Отмена</button>
    </template>
  </app-modal>
</template>

<script>
import AppModal from '@/components/ui/AppModal'

export default {
  name: 'AppConfirm',
  props: ['title', 'text'],
  emits: ['reject', 'confirm'],
  components: {
    AppModal
  }
}
</script>

<style scoped>

</style>
