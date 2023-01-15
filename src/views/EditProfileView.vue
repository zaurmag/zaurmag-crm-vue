<template>
	<app-breadcrumb />

	<app-page-header>
		<div class="row justify-content-center">
			<div class="col-xxl-10">
				<div
					v-if="!user"
					class="position-relative d-flex align-items-center"
					style="height: 400px"
				>
					<app-loader />
				</div>
				<the-profile
					v-else
					:header-img="user.headerUrl || '/images/profile/header.jpg'"
				>
					<template #headerBackProfile>
						<router-link
							class="btn btn-light py-2"
							:to="{ name: 'Profile', params: { id: user.id } }"
						>
							<app-icon name="box-arrow-in-left" />
							<span class="d-none d-lg-inline ms-lg-2"
								>Вернуться в профиль</span
							>
						</router-link>
					</template>

					<template #headerEdit>
						<app-button
							class-list-btn="btn-light py-2"
							:attrs="{
								'data-bs-toggle': 'modal',
								'data-bs-target': '#uploadHeader',
							}"
							:icon="{ name: 'image', placement: 'prepend' }"
						>
							<span class="d-none d-lg-inline ms-lg-2">Загрузить картинку</span>
						</app-button>
					</template>

					<template #headerShortInfo>
						<div class="profile__avatar">
							<img
								class="profile__avatar-img"
								:src="user.imgUrl || '/images/user.png'"
								:alt="user.name"
							/>
							<app-button
								class-list-btn="btn-light rounded-circle profile__avatar-edit"
								:attrs="{
									'data-bs-toggle': 'modal',
									'data-bs-target': '#uploadAvatar',
								}"
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
											<li
												v-for="(item, idx) in navMenu"
												:key="item.text"
												class="nav-item"
											>
												<button
													class="nav-link w-100"
													:class="[
														{ active: idx === 0 },
														{ 'text-danger': idx === navMenu.length - 1 },
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
								<div
									id="mainInfo"
									class="tab-pane fade show active"
									role="tabpanel"
								>
									<form action="#" @submit.prevent="onSubmit">
										<app-card title="Основная информация" class-list="h-100">
											<form-control
												id="name"
												v-model="name"
												label="Имя"
												:error="nError"
												@blur="nBlur"
											/>
											<form-control
												id="email"
												v-model="email"
												label="E-mail"
												type="email"
												:error="eError"
												@blur="eBlur"
											/>
											<form-control
												id="phone"
												v-model="phone"
												label="Телефон"
												:error="pnError"
												@blur="pnBlur"
											/>
											<form-control
												id="city"
												v-model="address"
												label="Адрес"
												:error="aError"
												@blur="aBlur"
											/>
											<p class="form-label">О себе</p>
											<form-control
												id="about"
												v-model="description"
												class-list-input="d-none"
											/>
											<w-editor
												v-model="description"
												class="mb-4"
												placeholder="Напишите кратко о себе"
											/>
											<app-button
												class-list-btn="btn-primary py-2 px-3"
												type="submit"
												:animate="{ loading: isSubmitting }"
												:attrs="{ disabled: isToManyAttempts }"
												>Сохранить</app-button
											>

											<div
												v-if="isToManyAttempts"
												class="invalid-feedback d-block fz-12"
											>
												Вы делаете слишком много попыток!
											</div>
										</app-card>
									</form>
								</div>
								<!-- Сменить пароль-->
								<div id="changePass" class="tab-pane fade" role="tabpanel">
									<app-card title="Сменить пароль" class-list="h-100">
										<form action="#" @submit.prevent="onSubmitPass">
											<div class="mw-lg-50">
												<form-control
													id="password"
													v-model="chPass"
													label="Пароль"
													type="password"
													:error="chPassError"
													@blur="chBlurPass"
												/>
												<form-control
													id="password2"
													v-model="chPass2"
													label="Повторить пароль"
													type="password"
													:error="chPassError2"
													@blur="chBlurPass2"
												/>
												<app-button
													class-list-btn="btn-primary py-2 px-3"
													:animate="{ loading: isSubmittingPass }"
													:attrs="{ disabled: isToManyAttemptsPass }"
													type="submit"
													>Сохранить</app-button
												>
												<div
													v-if="isToManyAttemptsPass"
													class="invalid-feedback d-block fz-12"
												>
													Вы делаете слишком много попыток!
												</div>
											</div>
										</form>
									</app-card>
								</div>
								<!-- Удалить аккаунт-->
								<div id="deleteAccount" class="tab-pane fade" role="tabpanel">
									<app-card title="Удалить аккаунт">
										<p>
											Вы действительно хотите удалить свою учетную запись?
											Операцию нельзя будет отменить!
										</p>
										<form action="#" @submit.prevent="onSubmitDelAcc">
											<form-control
												id="delAccount"
												v-model="delAcc"
												label='Введите слово "DELETE" для подтверждения'
												:error="delAccError"
												class-list-wrapper="mb-4 mw-lg-50"
												@blur="delAccBlur"
											/>
											<div class="text-end">
												<app-button
													class-list-btn="btn-danger px-3"
													type="submit"
													>Удалить</app-button
												>
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
	</app-page-header>

	<teleport to="body">
		<!-- Upload avatar -->
		<app-bs-modal
			v-if="user"
			id="uploadAvatar"
			title="Загрузить файл"
			:progress="prUplAvatar"
		>
			<p class="text-secondary text-center">
				Изображение должно быть квадратным, <br />размером 240x240 пикс.
			</p>
			<file-upload
				id="uploadAvatar"
				:cancel="cancelUplAvatar"
				:save="saveUplAvatar"
				:user-id="user.id"
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
			<p class="text-secondary text-center">
				Изображение должно быть прямоугольным, <br />
				размером 1100x160 пикс.
			</p>
			<file-upload
				id="uploadHeader"
				:cancel="cancelUplHeader"
				:save="saveUplHeader"
				:user-id="user.id"
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
import TheProfile from '@/components/profile/TheProfile.vue'
import FileUpload from '@/components/ui/FileUpload.vue'
import EditProfileModalFooter from '@/components/profile/EditProfileModalFooter.vue'
import { useEditProfileForm } from '@/use/edit-profile-form'
import { useChangePasswordForm } from '@/use/change-password-form'
import { useDeleteAccountForm } from '@/use/delete-account-form'
import { useUploadImage } from '@/use/upload-image'
import { getUser } from '@/use/user'
import { ref } from 'vue'

export default {
	name: 'EditProfile',
	components: {
		TheProfile,
		FileUpload,
		EditProfileModalFooter,
	},
	setup() {
		const user = getUser()
		const navMenu = ref([
			{
				text: 'Основная информация',
				target: '#mainInfo',
				icon: 'person',
			},
			{
				text: 'Сменить пароль',
				target: '#changePass',
				icon: 'key',
			},
			{
				text: 'Удалить аккаунт',
				target: '#deleteAccount',
				icon: 'trash',
			},
		])

		// Upload avatar refs
		const {
			cancelUpload: cUplAvatar,
			progressUpload: pUplAvatar,
			progressModal: prUplAvatar,
			cancel: cancelUplAvatar,
			save: saveUplAvatar,
			complete: completeAvatarUpload,
		} = useUploadImage('uploadAvatar')

		// Upload header refs
		const {
			cancelUpload: cUplHeader,
			progressUpload: pUplHeader,
			progressModal: prUplHeader,
			cancel: cancelUplHeader,
			save: saveUplHeader,
			complete: completeHeaderUpload,
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
			...useDeleteAccountForm(user),
		}
	},
}
</script>
