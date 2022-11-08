<template>
  <nav aria-label="breadcrumb" v-if="breadcrumbs.routes.length">
    <ul class="breadcrumb">
      <li class="breadcrumb-item" v-for="route in breadcrumbs.routes" :key="route.link">
        <template v-if="route.label === ''">
          <div style="width: 100px;" class="d-inline-flex align-items-center h-100 placeholder-glow">
            <span class="placeholder placeholder d-block w-100" style="height:8px; min-height: auto;"></span>
          </div>
        </template>

        <template v-else>
          <router-link :to="{path: route.link}" v-if="!route.current">{{ route.label }}</router-link>
          <span v-else>{{ route.label }}</span>
        </template>
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
