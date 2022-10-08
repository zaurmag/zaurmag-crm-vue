<template>
  <app-breadcrumb current="Заур Магомедов" />

  <app-page v-if="user">
    <div class="row justify-content-center">
      <div class="col-xxl-10">
        <div class="profile">
          <header class="profile__header" :style="`background-image: url(${user.profileHeader})`">
            <div class="profile__edit">
              <router-link class="btn btn-light py-2" :to="`/edit-profile/${user.id}`">
                <svg class="icon icon-pencil-square me-lg-2">
                  <use xlink:href="#pencil-square"></use>
                </svg>
                <span class="d-none d-lg-inline">Редактировать</span>
              </router-link>
            </div>
            <div class="profile__short-info">
              <div class="profile__avatar">
                <img class="profile__avatar-img" :src="user.imgUrl" alt="Заур Магомедов">
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
                      {{ user.address }}
                    </li>
                    <li class="profile__contact-item">
                      <svg class="icon icon-phone">
                        <use xlink:href="#phone"></use>
                      </svg>
                      <a class="is-transition" :href="`tel:${user.phone}`">{{ user.phone }}</a>
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
                  <div v-html="user.description" />
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
