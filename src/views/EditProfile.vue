<template>
  <app-breadcrumb />

  <app-page v-if="user">
    <div class="row justify-content-center">
      <div class="col-xxl-10">
        <the-profile :headerImg="user.headerUrl || '/images/profile/header.jpg'">
          <template #headerEdit>
            <button class="btn btn-light py-2" type="button" data-bs-toggle="modal" data-bs-target="#uploadHeader">
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
                data-bs-target="#uploadAvatar"
              >
                <app-icon name="pencil" />
              </button>
            </div>
            <h2 class="h5 profile__name">{{ user.name }}</h2>
          </template>

          <form action="#" @submit.prevent="onSubmit">
            <div class="row gy-25 gy-lg-0">
              <div class="col-md-6">
                <app-card title="Основная информация" classList="h-100">
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
                </app-card>
              </div>
              <div class="col-md-6">
                <app-card title="Сменить пароль" classList="h-100">
                  <div class="mb-3">
                    <label class="form-label" for="password">Пароль</label>
                    <input class="form-control py-2" id="password" type="password">
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="password2">Повторить пароль</label>
                    <input class="form-control py-2" id="password2" type="password">
                  </div>
                </app-card>
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
    <!-- Upload avatar -->
    <app-bs-modal
      id="uploadAvatar"
      title="Загрузить файл"
      :progress="prUplAvatar"
    >
      <p class="text-secondary text-center">Изображение должно быть квадратным, <br />размером 240x240 пикс.</p>
      <file-upload
        id="uploadAvatar"
        :cancel="cancelUplAvatar"
        :save="saveUplAvatar"
        :userId="user.id"
        @progress="pUplAvatar"
        @uploadSuccess="completeAvatarUpload"
      />

      <template #footer>
        <edit-profile-modal-footer
          :progress="prUplAvatar"
          :cancel="cUplAvatar"
          :save="saveUplAvatar"
          @save="saveUplAvatar = true"
        />
      </template>
    </app-bs-modal>

    <!-- Upload header -->
    <app-bs-modal
      id="uploadHeader"
      title="Загрузить файл"
      :progress="prUplHeader"
    >
      <p class="text-secondary text-center">Изображение должно быть прямоугольным, <br /> размером 1100x160 пикс.</p>
      <file-upload
        id="uploadHeader"
        :cancel="cancelUplHeader"
        :save="saveUplHeader"
        :userId="user.id"
        @progress="pUplHeader"
        @uploadSuccess="completeHeaderUpload"
      />

      <template #footer>
        <edit-profile-modal-footer
          :progress="prUplHeader"
          :cancel="cUplHeader"
          :save="saveUplHeader"
          @save="saveUplHeader = true"
        />
      </template>
    </app-bs-modal>
  </teleport>
</template>

<script>
import TheProfile from '@/components/profile/TheProfile'
import FileUpload from '@/components/ui/FileUpload'
import EditProfileModalFooter from '@/components/profile/EditProfileModalFooter'
import { useEditProfileForm } from '@/use/edit-profile-form'
import { useUploadImage } from '@/use/upload-image'
import { getUser } from '@/use/user'
import breadcrumbs from '@/use/breadcrumb'

export default {
  name: 'EditProfile',
  setup () {
    const user = getUser()

    breadcrumbs.setCurrentBreadcrumbName(`редактирование: ${user.value.name}`)

    // Upload avatar refs
    const {
      cancelUpload: cUplAvatar,
      progressUpload: pUplAvatar,
      progressModal: prUplAvatar,
      cancel: cancelUplAvatar,
      save: saveUplAvatar,
      complete: completeAvatarUpload
    } = useUploadImage('uploadAvatar')

    // Upload header refs
    const {
      cancelUpload: cUplHeader,
      progressUpload: pUplHeader,
      progressModal: prUplHeader,
      cancel: cancelUplHeader,
      save: saveUplHeader,
      complete: completeHeaderUpload
    } = useUploadImage('uploadHeader')

    return {
      user,
      completeAvatarUpload,
      cUplAvatar,
      pUplAvatar,
      prUplAvatar,
      cancelUplAvatar,
      saveUplAvatar,
      cUplHeader,
      pUplHeader,
      prUplHeader,
      cancelUplHeader,
      saveUplHeader,
      completeHeaderUpload,
      ...useEditProfileForm(user)
    }
  },
  components: {
    TheProfile,
    FileUpload,
    EditProfileModalFooter
  }
}
</script>
