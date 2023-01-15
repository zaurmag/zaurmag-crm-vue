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
					<template #headerEdit>
						<router-link
							v-if="user.id"
							class="btn btn-light py-2"
							:to="{ name: 'EditProfile', params: { id: user.id } }"
						>
							<app-icon name="pencil-square" class-list="me-lg-2" />
							<span class="d-none d-lg-inline">Редактировать</span>
						</router-link>
					</template>

					<template #headerShortInfo>
						<div class="profile__avatar">
							<img
								class="profile__avatar-img"
								:src="user.imgUrl || '/images/user.png'"
								alt="Заур Магомедов"
							/>
							<app-indicator
								size="xl"
								class-list="profile__avatar-indicator bg-success"
							/>
						</div>
						<h2 class="h5 profile__name">{{ user.name }}</h2>
					</template>

					<div class="row gy-25 gy-lg-0">
						<div class="col-xl-4 col-md-5">
							<app-card title="Контактная информация" class-list="h-100">
								<ul class="profile__contact">
									<li v-if="user.address" class="profile__contact-item">
										<app-icon name="building" />
										{{ user.address }}
									</li>
									<li v-if="user.phone" class="profile__contact-item">
										<app-icon name="phone" />
										<a class="is-transition" :href="`tel:${user.phone}`">{{
											user.phone
										}}</a>
									</li>
									<li v-if="user.email" class="profile__contact-item">
										<app-icon name="envelope" />
										<a class="is-transition" :href="'mailto:' + user.email">{{
											user.email
										}}</a>
									</li>
								</ul>
							</app-card>
						</div>
						<div v-if="user.description" class="col-xl-8 col-md-7">
							<app-card title="О себе" class-list="h-100">
								<div v-html="user.description" />
							</app-card>
						</div>
					</div>
				</the-profile>
			</div>
		</div>
	</app-page-header>
</template>

<script setup>
import TheProfile from '@/components/profile/TheProfile.vue'
import { getUser } from '@/use/user'

const user = getUser()
</script>
