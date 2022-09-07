<template>
  <app-page title="">
    <div class="profile">
      <header class="profile__header">
        <div class="profile__cover"></div>
        <div class="profile__short-info text-center">
          <img class="profile__avatar" src="/images/zaurmag.png" alt="Заур">
          <h2 class="h4 profile__name">Заур</h2>
        </div>
      </header>
    </div>
  </app-page>
</template>
<script>
import AppPage from '@/components/ui/AppPage'

export default {
  name: 'Profile',
  components: {
    AppPage
  }
}
</script>

<style scoped lang="sass">
  .profile
    &__cover
      background-color: #e7e7e7
      border-radius: 10px
      height: 160px
</style>
