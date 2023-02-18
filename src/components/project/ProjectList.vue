<template>
  <div class="table-responsive">
    <table class="table align-middle table-borderless card-table mb-0">
      <thead class="table-light">
        <tr>
          <th class="table-cell-check">
            <div class="form-check">
              <input
                v-model="allCheckbox"
                class="form-check-input float-none"
                type="checkbox"
              />
            </div>
          </th>
          <th>#</th>
          <th>Наименование</th>
          <th>Дата</th>
          <th class="no-wrap">Описание</th>
          <th class="no-wrap">Тип операции</th>
          <th>Сумма</th>
          <th>Действие</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="loader">
          <td colspan="8">
            <app-loader-row-placeholder cols="10" />
          </td>
        </tr>

        <template v-else-if="projects.length > 0">
          <tr
            v-for="(project, index) in projects"
            :key="project.id"
          >
            <td>
              <div class="form-check">
                <input
                  v-model="checkbox"
                  class="form-check-input float-none"
                  type="checkbox"
                  :value="project.id"
                />
              </div>
            </td>
            <td>{{ index + 1 }}</td>
            <td style="min-width: 215px">
              <router-link
                class="table-cell-title-link is-transition"
                :to="{ name: 'Project', params: { id: project.id } }"
              >
                {{ project.title }}
              </router-link>
            </td>
            <td>{{ $dateF(project.date) }}</td>
            <td style="min-width: 380px">{{ project.desc }}</td>
            <td><app-type :type="project.type" /></td>
            <td>{{ $currency(project.amount) }}</td>
            <td style="min-width: 140px">
              <app-button
                class-list-btn="btn-outline-primary btn-sm py-1 fz-12"
                @click="$router.push(`/project/${project.id}`)"
              >
                Открыть
              </app-button>
              <app-button
                v-tooltip="{ title: 'Удалить' }"
                class-list-btn="text-danger ms-1 fz-16 p-1"
                :icon="{ name: 'trash', placement: 'prepend' }"
                @click="remove(project.id)"
              />
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="8">
            <p class="p-30 text-center text-dark">Записей пока нет.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <teleport to="body">
    <app-confirm
      id="removeConfirm"
      title="Вы уверены?"
      text="Операцию нельзя будет отменить."
      @resolve="removeConfirm"
    />
  </teleport>
</template>

<script setup>
import AppLoaderRowPlaceholder from '@/components/ui/AppLoaderRowPlaceholder.vue'
import AppType from '@/components/ui/AppType.vue'
import AppConfirm from '@/components/ui/AppConfirm.vue'
import { showBsModal, closeBsModal } from '@/use/bs-modal'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

// eslint-disable-next-line no-undef
const emit = defineEmits(['selected'])

// eslint-disable-next-line no-undef
const props = defineProps({
  projects: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  loader: {
    type: Boolean,
    required: true
  }
})

const store = useStore()
const projectID = ref()
const checkbox = ref([])

const remove = id => {
  projectID.value = id
  showBsModal('#removeConfirm')
}

const removeConfirm = async () => {
  try {
    await store.dispatch('project/delete', projectID.value)
    closeBsModal('#removeConfirm')
    await store.dispatch('project/load')
  } catch (e) {
    /* empty */
  }
}

const allCheckbox = computed({
  get() {
    emit('selected', checkbox.value)
    return checkbox.value.length === props.projects.length && props.projects.length !== 0
  },
  set(val) {
    checkbox.value = val ? props.projects.map(n => n.id) : []
  }
})
</script>
