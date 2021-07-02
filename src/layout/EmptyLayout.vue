<template>
  <div class="page bg-light">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card shadow-sm">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>

  <teleport to="body">
    <app-message />
  </teleport>
</template>

<script>
import AppMessage from '@/components/ui/AppMessage'

export default {
  name: 'EmptyLayout',
  components: {
    AppMessage
  }
}
</script>

<style scoped>

</style>
