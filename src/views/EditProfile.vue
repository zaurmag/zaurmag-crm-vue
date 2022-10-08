<template>
  <app-breadcrumb v-if="user" :current="`Редактирование профиля ${user.name}`" />

  <app-page v-if="user">
    <div class="row justify-content-center">
      <div class="col-xxl-10">
        <the-profile :headerImg="user.profileHeader">
          <template #headerEdit>
            <button class="btn btn-light py-2" type="button" data-bs-toggle="modal" data-bs-target="#uploadFile">
              <app-icon name="image" classList="me-lg-2" />
              <span class="d-none d-lg-inline">Загрузить картинку</span>
            </button>
          </template>

          <template #headerShortInfo>
            <div class="profile__avatar">
              <img class="profile__avatar-img" :src="user.imgUrl" :alt="user.name" />
              <button class="btn btn-light rounded-circle profile__avatar-edit" type="button" data-bs-toggle="modal" data-bs-target="#uploadFile">
                <app-icon name="pencil" />
              </button>
            </div>
            <h2 class="h5 profile__name">{{ user.name }}</h2>
          </template>

          <form>
            <div class="row gy-25 gy-lg-0">
              <div class="col-md-6">
                <div class="card shadow-sm-soft h-100">
                  <div class="card-header">
                    <h3 class="m-0 card-header-title h6">Основная информация</h3>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label class="form-label" for="name">Имя</label>
                      <input class="form-control py-2" id="name" type="text" value="Заур Магомедов">
                    </div>
                    <div class="mb-3">
                      <label class="form-label" for="email">E-mail</label>
                      <input class="form-control py-2" id="email" type="email" value="demo@zaurmag.ru">
                    </div>
                    <div class="mb-3">
                      <label class="form-label" for="phone">Телефон</label>
                      <input class="form-control py-2" id="phone" type="text" value="+7 (906) 449-55-44">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card shadow-sm-soft h-100">
                  <div class="card-header">
                    <h3 class="m-0 card-header-title h6">Сменить пароль</h3>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label class="form-label" for="password">Пароль</label>
                      <input class="form-control py-2" id="password" type="password">
                    </div>
                    <div class="mb-3">
                      <label class="form-label" for="password2">Повторить пароль</label>
                      <input class="form-control py-2" id="password2" type="password">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-4">
              <label class="form-label">О себе</label>
              <textarea class="form-control py-2 d-none" cols="10" rows="5"></textarea>
              <div class="w-editor">
                <div class="w-editor__container">
                  <quill-editor
                    theme="snow"
                    toolbar="minimal"
                    contentType="html"
                    v-model:content="user.description"
                    placeholder="Напишите кратко о себе"
                  />
                  </div>
                </div>
            </div>
            <button class="btn btn-primary py-2 px-3" type="submit">Сохранить</button>
          </form>
        </the-profile>
    </div>
    </div>
  </app-page>
</template>

<script setup>
import TheProfile from '@/components/profile/TheProfile'
import { getUser } from '@/use/user'
const user = getUser()
</script>
