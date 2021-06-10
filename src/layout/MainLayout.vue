<template>
  <div class="page">
    <the-sidebar />
    <div class="content content--right">
      <the-header />
      <main class="main">
        <the-breadcrumb />
        <router-view />
      </main>
      <the-footer />
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import TheHeader from '@/components/TheHeader'
import TheBreadcrumb from '@/components/ui/TheBreadcrumb'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'MainLayout',
  components: {
    TheBreadcrumb,
    TheSidebar,
    TheHeader,
    TheFooter
  }
}
</script>

<style scoped>

</style>
