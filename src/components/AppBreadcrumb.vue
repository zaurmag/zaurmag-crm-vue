<template>
  <nav aria-label="breadcrumb" v-if="breadcrumbs.routes.length">
    <ul class="breadcrumb">
      <li class="breadcrumb-item" v-for="route in breadcrumbs.routes" :key="route.link">
        <router-link :to="{path: route.link}" v-if="!route.current">{{ route.label }}</router-link>
        <span v-else>{{ route.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import breadcrumbs from '@/use/breadcrumb'

export default {
  name: 'AppBreadcrumb',
  setup () {
    return {
      breadcrumbs
    }
  }
}
</script>
