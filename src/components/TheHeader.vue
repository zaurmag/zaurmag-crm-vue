<template>
  <header class="header sticky-top">
    <div class="header__left d-flex align-items-center">
      <div class="text-secondary">
        {{ $dateF(date, { format: 'datetime', month: 'long' }) }}
      </div>
    </div>
    <div
      v-if="user"
      class="header__right"
    >
      <div class="header__user-dropdown dropdown">
        <app-button
          class-list-btn="dropdown-toggle btn-light"
          :attrs-wrapper="{ 'data-bs-toggle': 'dropdown' }"
        >
          <img
            class="rounded-circle img-fluid me-2"
            :src="user.imgUrl || '/images/user.png'"
            width="32"
            :alt="user.name"
          />
          <span>{{ user.name }}</span>
        </app-button>
        <ul class="dropdown-menu shadow-sm-soft w-100">
          <li>
            <router-link
              v-if="typeof user.id !== 'undefined'"
              class="dropdown-item"
              :to="{
                name: 'UsersPage',
                params: { id: user.id }
              }"
            >
              Мой профиль
            </router-link>
          </li>
          <li>
            <button
              class="dropdown-item btn-link"
              type="button"
              @click="logout"
            >
              Выход
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// eslint-disable-next-line no-undef
defineProps({
  tooltipTlt: {
    type: String,
    required: false
  }
})

const date = ref(Date())
const interval = ref(null)
const store = useStore()
const router = useRouter()

onMounted(() => {
  interval.value = setInterval(() => {
    date.value = Date()
  }, 1000)
})

onBeforeMount(() => {
  clearInterval(interval.value)
})

const logout = () => {
  store.dispatch('auth/logout')
  router.push('/sign-in?message=auth')
}

const user = computed(() => store.getters['users/user'])
</script>

<style scoped lang="sass">
.header
	align-items: center
	background-color: $white
	border-bottom: 1px solid $gray-200
	display: grid
	grid-template-columns: auto auto
	justify-content: space-between

	@include media-breakpoint-up(lg)
		padding: 8px 30px
		min-height: 65px

	@include media-breakpoint-down(lg)
		padding-left: 58px
		padding-right: 15px
		min-height: 60px

		&__user-dropdown
			.btn
				span
					width: 50px
					text-overflow: ellipsis
					overflow: hidden
					white-space: nowrap
</style>
