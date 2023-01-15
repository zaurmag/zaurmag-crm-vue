<template>
	<the-page>
		<the-sidebar :toggle-class="isCompactSb" />

		<the-content
			class="content content--right"
			:class="{ 'is-full': isCompactSb }"
		>
			<the-header
				:tooltip-tlt="isCompactSb ? 'Развернуть' : 'Свернуть'"
				@toggle="isCompactSb = !isCompactSb"
			/>

			<the-main>
				<router-view />
			</the-main>

			<the-footer />
		</the-content>
	</the-page>

	<teleport v-if="isOverlay" to="body">
		<div
			:class="['overlay', { 'is-active': isCompactSb }]"
			@click="isCompactSb = false"
		></div>
	</teleport>

	<teleport to="body">
		<app-message />
	</teleport>
</template>

<script setup>
import ThePage from '@/components/ThePage.vue'
import TheMain from '@/components/TheMain.vue'
import TheContent from '@/components/TheContent.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import AppMessage from '@/components/ui/AppMessage.vue'
import enquire from 'enquire.js'
import { ref } from 'vue'

const isCompactSb = ref(false)
const isOverlay = ref(false)
enquire.register('screen and (max-width: 992px)', {
	match() {
		isOverlay.value = true
	},
	unmatch() {
		isOverlay.value = false
	},
})
</script>
