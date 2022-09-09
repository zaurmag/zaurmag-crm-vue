<template>
  <div class="page page--empty">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <app-logo theme="dark" classList="logo--lg mb-20 justify-content-center" />
          <div class="card shadow-sm-soft">
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
import AppLogo from '@/components/AppLogo'

export default {
  name: 'EmptyLayout',
  components: {
    AppMessage,
    AppLogo
  }
}
</script>
