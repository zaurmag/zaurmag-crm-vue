<template>
  <app-breadcrumb />

  <app-page>
    <div class="row justify-content-center">
      <div class="col-xxl-10">
        <div class="position-relative d-flex align-items-center" v-if="!user" style="height: 400px">
          <app-loader />
        </div>
        <the-profile v-else :headerImg="user.headerUrl || '/images/profile/header.jpg'">
          <template #headerBackProfile>
            <router-link
              class="btn btn-light py-2"
              :to="{ name: 'Profile', params: { id: user.id } }"
            >
              <app-icon name="box-arrow-in-left" />
              <span class="d-none d-lg-inline ms-lg-2">Вернуться в профиль</span>
            </router-link>
          </template>

          <template #headerEdit>
            <app-button
              classListBtn="btn-light py-2"
              :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': '#uploadHeader' }"
              :icon="{ name: 'image', placement: 'prepend' }"
            >
              <span class="d-none d-lg-inline ms-lg-2">Загрузить картинку</span>
            </app-button>
          </template>

          <template #headerShortInfo>
            <div class="profile__avatar">
              <img class="profile__avatar-img" :src="user.imgUrl || '/images/user.png'" :alt="user.name" />
              <app-button
                classListBtn="btn-light rounded-circle profile__avatar-edit"
                :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': '#uploadAvatar' }"
                :icon="{ name: 'pencil', placement: 'prepend' }"
              />
            </div>
            <h2 class="h5 profile__name">{{ user.name }}</h2>
          </template>

          <div class="profile__content">
            <div class="row gy-lg-0 gy-4">
              <div class="col-lg-4">
                <app-card>
                  <nav class="profile__nav">
                    <ul class="nav nav-pills flex-column">
                      <li v-for="(item, idx) in navMenu" :key="item.text" class="nav-item">
                        <button
                          class="nav-link w-100"
                          :class="[
                            {'active': idx === 0},
                            {'text-danger': idx === navMenu.length - 1}
                            ]"
                          type="button"
                          data-bs-toggle="tab"
                          :data-bs-target="item.target"
                          role="tab"
                        >
                          <app-icon :name="item.icon" />
                          <span class="nav-text">{{ item.text }}</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </app-card>
              </div>
              <div class="tab-content col-lg-8 col-12">
                <!-- Основная информация-->
                <div class="tab-pane fade show active" role="tabpanel" id="mainInfo">
                  <form action="#" @submit.prevent="onSubmit">
                  <app-card title="Основная информация" classList="h-100">
                    <form-control
                      id="name"
                      label="Имя"
                      v-model="name"
                      @blur="nBlur"
                      :error="nError"
                    />
                    <form-control
                      id="email"
                      label="E-mail"
                      type="email"
                      v-model="email"
                      @blur="eBlur"
                      :error="eError"
                    />
                    <form-control
                      id="phone"
                      label="Телефон"
                      v-model="phone"
                      @blur="pnBlur"
                      :error="pnError"
                    />
                    <form-control
                      id="city"
                      label="Адрес"
                      v-model="address"
                      @blur="aBlur"
                      :error="aError"
                    />
                    <p class="form-label">О себе</p>
                    <form-control
                      id="about"
                      v-model="description"
                      classListInput="d-none"
                    />
                    <div class="w-editor mb-4">
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
                    <app-button
                      classListBtn="btn-primary py-2 px-3"
                      type="submit"
                      :animate="{ loading: isSubmitting }"
                      :attrs="{ disabled: isToManyAttempts }"
                    >Сохранить</app-button>

                    <div class="invalid-feedback d-block fz-12" v-if="isToManyAttempts">Вы делаете слишком много попыток!</div>
                  </app-card>
                  </form>
                </div>
                <!-- Сменить пароль-->
                <div class="tab-pane fade" role="tabpanel" id="changePass">
                  <app-card title="Сменить пароль" classList="h-100">
                    <form action="#" @submit.prevent="onSubmitPass">
                      <div class="mw-lg-50">
                        <form-control
                          id="password"
                          label="Пароль"
                          type="password"
                          v-model="chPass"
                          @blur="chBlurPass"
                          :error="chPassError"
                        />
                        <form-control
                          id="password2"
                          label="Повторить пароль"
                          type="password"
                          v-model="chPass2"
                          @blur="chBlurPass2"
                          :error="chPassError2"
                        />
                        <app-button
                          classListBtn="btn-primary py-2 px-3"
                          :animate="{ loading: isSubmittingPass }"
                          :attrs="{ disabled: isToManyAttemptsPass }"
                          type="submit"
                        >Сохранить</app-button>
                        <div
                          class="invalid-feedback d-block fz-12"
                          v-if="isToManyAttemptsPass"
                        >Вы делаете слишком много попыток!</div>
                      </div>
                    </form>
                  </app-card>
                </div>
                <!-- Удалить аккаунт-->
                <div class="tab-pane fade" role="tabpanel" id="deleteAccount">
                  <app-card title="Удалить аккаунт">
                    <p>Вы действительно хотите удалить свою учетную запись? Операцию нельзя будет отменить!</p>
                    <form action="#" @submit.prevent="onSubmitDelAcc">
                      <form-control
                        id="delAccount"
                        label='Введите слово "DELETE" для подтверждения'
                        v-model="delAcc"
                        @blur="delAccBlur"
                        :error="delAccError"
                        classListWrapper="mb-4 mw-lg-50"
                      />
                      <div class="text-end">
                        <app-button classListBtn="btn-danger px-3" type="submit">Удалить</app-button>
                      </div>
                    </form>
                  </app-card>
                </div>
              </div>
            </div>
          </div>
        </the-profile>
      </div>
    </div>
  </app-page>

  <teleport to="body">
    <!-- Upload avatar -->
    <app-bs-modal
      v-if="user"
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
      v-if="user"
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
import { useChangePasswordForm } from '@/use/change-password-form'
import { useDeleteAccountForm } from '@/use/delete-account-form'
import { useUploadImage } from '@/use/upload-image'
import { getUser } from '@/use/user'
import { ref } from 'vue'

export default {
  name: 'EditProfile',
  setup () {
    const user = getUser()
    const navMenu = ref([
      {
        text: 'Основная информация',
        target: '#mainInfo',
        icon: 'person'
      },
      {
        text: 'Сменить пароль',
        target: '#changePass',
        icon: 'key'
      },
      {
        text: 'Удалить аккаунт',
        target: '#deleteAccount',
        icon: 'trash'
      }
    ])

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
      navMenu,
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
      ...useEditProfileForm(user),
      ...useChangePasswordForm(),
      ...useDeleteAccountForm(user)
    }
  },
  components: {
    TheProfile,
    FileUpload,
    EditProfileModalFooter
  }
}
</script>
