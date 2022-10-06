<template>
  <app-breadcrumb current="Заур Магомедов" />

  <app-page v-if="user" :title="`Профиль пользователя ${user.name}`">
    <div class="row justify-content-center">
      <div class="col-xxl-10">
        <div class="profile">
          <header class="profile__header" style="background-image: url('/images/profile/header.jpg')">
            <div class="profile__edit">
              <a class="btn btn-light py-2" href="/edit-profile.html">
                <svg class="icon icon-pencil-square me-lg-2">
                  <use xlink:href="#pencil-square"></use>
                </svg>
                <span class="d-none d-lg-inline">Редактировать</span>
              </a>
            </div>
            <div class="profile__short-info">
              <div class="profile__avatar">
                <img class="profile__avatar-img" src="/images/zaurmag.png" alt="Заур Магомедов">
                <app-indicator size="xl" classList="profile__avatar-indicator bg-success" />
              </div>
              <h2 class="h5 profile__name">{{ user.name }}</h2>
            </div>
          </header>
          <div class="profile__content">
            <div class="row gy-25 gy-lg-0">
              <div class="col-xl-4 col-md-5">
                <app-card title="Контактная информация" classList="h-100">
                  <ul class="profile__contact">
                    <li class="profile__contact-item">
                      <svg class="icon icon-building">
                        <use xlink:href="#building"></use>
                      </svg>
                      г. Каспийск, рес. Дагестан
                    </li>
                    <li class="profile__contact-item">
                      <svg class="icon icon-phone">
                        <use xlink:href="#phone"></use>
                      </svg>
                      <a class="is-transition" href="tel:+79064495544">+ 7 (906) 449-55-44</a>
                    </li>
                    <li class="profile__contact-item">
                      <svg class="icon icon-envelope">
                        <use xlink:href="#envelope"></use>
                      </svg>
                      <a class="is-transition" :href="'mailto:' + user.email">{{ user.email }}</a>
                    </li>
                  </ul>
                </app-card>
              </div>
              <div class="col-xl-8 col-md-7">
                <app-card title="О себе" classList="h-100">
                  <p>Я программист - фронтенд-разработчик. Работаю удаленно в IT-компании. Постоянно учусь и развиваюсь в своей сфере. Здесь без этого нельзя. Веду свой блог <a href="https://zaurmag.ru" target="_blank">zaurmag.ru</a>.</p>
                  <p>Женат, имею троих детей - девочки. Все они школьники.</p>
                </app-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-page>
</template>

<script setup>
import AppBreadcrumb from '@/components/AppBreadcrumb'
import AppPage from '@/components/ui/AppPage'
import AppCard from '@/components/ui/AppCard'
import AppIndicator from '@/components/ui/AppIndicator'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()
const user = computed(() => store.getters['users/userById'](route.params.id))
onMounted(async () => {
  await store.dispatch('users/load')
})
</script>
