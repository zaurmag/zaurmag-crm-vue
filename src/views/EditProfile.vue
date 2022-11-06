<template>
  <app-breadcrumb />

  <app-page v-if="user">
    <div class="row justify-content-center">
      <div class="col-xxl-10">
        <the-profile :headerImg="user.headerUrl || '/images/profile/header.jpg'">
          <template #headerEdit>
            <app-button
              classListBtn="btn-light py-2"
              :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': '#uploadHeader' }"
              :icon="{ name: 'image', placement: 'prepend', classList: 'me-lg-2' }"
            >
              <span class="d-none d-lg-inline">Загрузить картинку</span>
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
                    <div class="mb-3">
                      <label class="form-label" for="city">Адрес</label>
                      <input
                        :class="['form-control', 'py-2', {'is-invalid': aError}]"
                        id="city"
                        type="text"
                        v-model="address"
                        @blur="aBlur"
                      >
                      <div class="invalid-feedback d-block fz-12" v-if="aError">{{ aError }}</div>
                    </div>

                    <p class="form-label">О себе</p>
                    <textarea
                      class="form-control py-2 d-none"
                      v-model="description"
                      cols="10"
                      rows="5"
                    ></textarea>
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
                        <div class="mb-3">
                          <label class="form-label" for="password">Пароль</label>
                          <input
                            class="form-control py-2"
                            :class="{'is-invalid': chPassError}"
                            id="password"
                            type="password"
                            v-model="chPass"
                            @blur="chBlurPass"
                          >
                          <div class="invalid-feedback d-block fz-12" v-if="chPassError">{{ chPassError }}</div>
                        </div>
                        <div class="mb-3">
                          <label class="form-label" for="password2">Повторить пароль</label>
                          <input
                            class="form-control py-2"
                            :class="{'is-invalid': chPassError2}"
                            id="password2"
                            type="password"
                            v-model="chPass2"
                            @blur="chBlurPass2"
                          >
                          <div class="invalid-feedback d-block fz-12" v-if="chPassError2">{{ chPassError2 }}</div>
                        </div>
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
                      <div class="mb-4 mw-lg-50">
                        <label class="form-label">Введите слово "DELETE" для подтверждения</label>
                        <input
                          class="form-control"
                          :class="{'is-invalid': delAccError}"
                          v-model="delAcc"
                          @blur="delAccBlur"
                          type="text"
                        />
                        <div class="invalid-feedback d-block fz-12" v-if="delAccError">{{ delAccError }}</div>
                      </div>
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
import { useChangePasswordForm } from '@/use/change-password-form'
import { useDeleteAccountForm } from '@/use/delete-account-form'
import { useUploadImage } from '@/use/upload-image'
import { getUser } from '@/use/user'
import breadcrumbs from '@/use/breadcrumb'
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
      ...useChangePasswordForm(user.value.email),
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
