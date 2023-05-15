<template>
  <app-page-header title="Dashboard">
    <div class="row g-3">
      <div
        v-for="link in links"
        :key="link.name"
        class="col"
      >
        <router-link
          class="btn btn-primary d-flex btn-lg"
          :to="{ name: link.name }"
        >
          {{ link.title }}
        </router-link>
      </div>
    </div>
  </app-page-header>
</template>

<script setup>
import { useLinksFromRoutes } from '@/use/links-from-routes'
import { useStore } from 'vuex'

const store = useStore()
const isAdmin = store.getters['users/isAdmin']
const links = useLinksFromRoutes()
</script>
