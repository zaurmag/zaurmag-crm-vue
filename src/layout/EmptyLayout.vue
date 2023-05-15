<template>
  <the-page class="page--empty">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <app-logo
            theme="dark"
            class-list="logo--lg mb-20 justify-content-center"
          />
          <app-card class-list-body="p-0">
            <router-view />
          </app-card>
        </div>
      </div>
    </div>
  </the-page>

  <teleport to="body">
    <app-message />
  </teleport>
</template>

<script setup>
import ThePage from '@/components/ThePage.vue'
import AppMessage from '@/components/ui/AppMessage.vue'
import AppLogo from '@/components/AppLogo.vue'
</script>
