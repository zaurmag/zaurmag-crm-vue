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
              <img class="profile__avatar-img" :src="user.imgUrl || '/images/user.png'" :alt="user.name" />
              <button
                class="btn btn-light rounded-circle profile__avatar-edit"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#uploadFile"
              >
                <app-icon name="pencil" />
              </button>
            </div>
            <h2 class="h5 profile__name">{{ user.name }}</h2>
          </template>

          <form action="#" @submit.prevent="onSubmit">
            <div class="row gy-25 gy-lg-0">
              <div class="col-md-6">
                <div class="card shadow-sm-soft h-100">
                  <div class="card-header">
                    <h3 class="m-0 card-header-title h6">Основная информация</h3>
                  </div>
                  <div class="card-body">
                    <div class="mb-3">
                      <label class="form-label" for="name">Имя</label>
                      <input
                        :class="['form-control', 'py-2', {'is-invalid': nError}]"
                        id="name"
                        type="text"
                        v-model="name"
                        @blur="nBlur"
                      >
                      <div class="invalid-feedback d-block fz-12" v-if="nError">{{ nError }}</div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label" for="email">E-mail</label>
                      <input
                        :class="['form-control', 'py-2', {'is-invalid': eError}]"
                        id="email"
                        type="email"
                        v-model="email"
                        @blur="eBlur"
                      >
                      <div class="invalid-feedback d-block fz-12" v-if="eError">{{ eError }}</div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label" for="phone">Телефон</label>
                      <input
                        :class="['form-control', 'py-2', {'is-invalid': pnError}]"
                        id="phone"
                        type="text"
                        v-model="phone"
                        @blur="pnBlur"
                      >
                      <div class="invalid-feedback d-block fz-12" v-if="pnError">{{ pnError }}</div>
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
              <textarea class="form-control py-2 d-none" v-model="description" cols="10" rows="5"></textarea>
              <div class="w-editor">
                <div class="w-editor__container">
                  <quill-editor
                    theme="snow"
                    toolbar="minimal"
                    contentType="html"
                    v-model:content="description"
                    placeholder="Напишите кратко о себе"
                  />
                  </div>
                </div>
            </div>
            <div class="progress h-auto d-inline-block">
              <button
                class="btn btn-primary py-2 px-3"
                :class="{ 'progress-bar progress-bar-striped progress-bar-animated': isSubmitting }"
                type="submit"
                :disabled="isToManyAttempts"
              >
                Сохранить
              </button>
            </div>
            <div class="invalid-feedback d-block fz-12" v-if="isToManyAttempts">Вы делаете слишком много попыток!</div>
          </form>
        </the-profile>
    </div>
    </div>
  </app-page>

  <teleport to="body">
    <app-bs-modal id="uploadFile" title="Загрузить файл">
      <file-upload />

      <template #footer>
        <button class="btn btn-primary" type="button">Ok</button>
        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Отмена</button>
      </template>
    </app-bs-modal>
  </teleport>
</template>

<script>
import TheProfile from '@/components/profile/TheProfile'
import { useEditProfileForm } from '@/use/edit-profile-form'
import { getUser } from '@/use/user'
import FileUpload from '@/components/ui/FileUpload'

export default {
  name: 'EditProfile',
  setup () {
    const user = getUser()

    return {
      user,
      ...useEditProfileForm(user)
    }
  },
  components: {
    TheProfile,
    FileUpload
  }
}
</script>
