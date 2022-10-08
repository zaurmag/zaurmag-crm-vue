<template>
  <app-breadcrumb current="Заур Магомедов" />

  <app-page v-if="user">
    <div class="row justify-content-center">
      <div class="col-xxl-10">
        <the-profile :headerImg="user.profileHeader">
          <template #headerEdit>
            <router-link class="btn btn-light py-2" :to="`/edit-profile/${user.id}`">
              <app-icon name="pencil-square" classList="me-lg-2" />
              <span class="d-none d-lg-inline">Редактировать</span>
            </router-link>
          </template>
          <template #headerShortInfo>
            <div class="profile__avatar">
              <img class="profile__avatar-img" :src="user.imgUrl" alt="Заур Магомедов">
              <app-indicator size="xl" classList="profile__avatar-indicator bg-success" />
            </div>
            <h2 class="h5 profile__name">{{ user.name }}</h2>
          </template>

          <div class="row gy-25 gy-lg-0">
            <div class="col-xl-4 col-md-5">
              <app-card title="Контактная информация" classList="h-100">
                <ul class="profile__contact">
                  <li class="profile__contact-item">
                    <app-icon name="building" />
                    {{ user.address }}
                  </li>
                  <li class="profile__contact-item">
                    <app-icon name="phone" />
                    <a class="is-transition" :href="`tel:${user.phone}`">{{ user.phone }}</a>
                  </li>
                  <li class="profile__contact-item">
                    <app-icon name="envelope" />
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
        </the-profile>
      </div>
    </div>
  </app-page>
</template>

<script setup>
import AppBreadcrumb from '@/components/AppBreadcrumb'
import TheProfile from '@/components/profile/TheProfile'
import AppPage from '@/components/ui/AppPage'
import AppCard from '@/components/ui/AppCard'
import AppIndicator from '@/components/ui/AppIndicator'
import AppIcon from '@/components/ui/AppIcon'
import { getUser } from '@/use/user'
const user = getUser()
</script>
