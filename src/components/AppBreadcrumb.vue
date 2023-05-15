<template>
  <nav
    v-if="breadcrumbs.routes.length"
    aria-label="breadcrumb"
  >
    <ul class="breadcrumb">
      <li
        v-for="route in breadcrumbs.routes"
        :key="route.link"
        class="breadcrumb-item"
      >
        <template v-if="route.label === ''">
          <div
            style="width: 100px"
            class="d-inline-flex align-items-center h-100 placeholder-glow"
          >
            <span
              class="placeholder placeholder d-block w-100"
              style="height: 8px; min-height: auto"
            />
          </div>
        </template>

        <template v-else>
          <router-link
            v-if="!route.current"
            :to="{ path: route.link }"
          >
            {{ route.label }}
          </router-link>
          <span v-else>{{ route.label }}</span>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import breadcrumbs from '@/use/breadcrumb'
</script>
