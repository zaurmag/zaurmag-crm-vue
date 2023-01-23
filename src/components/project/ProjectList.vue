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

      <tbody v-if="loader">
        <tr>
          <td colspan="8">
            <div class="placeholder-glow px-3">
              <div
                v-for="i in pageSize"
                :key="i"
                class="row gx-2 mb-2"
              >
                <div
                  v-for="n in 8"
                  :key="n"
                  :class="n === 3 || n === 4 ? 'col-2' : n === 5 ? 'col-3' : 'col-1'"
                >
                  <div class="placeholder placeholder w-100 d-block" />
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <template v-if="projects && projects.length">
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
      ref="confirm"
      title="Вы уверены?"
      text="Операцию нельзя будет отменить."
      @resolve="removeConfirm"
    />
  </teleport>
</template>

<script>
import AppType from '@/components/ui/AppType.vue'
import AppConfirm from '@/components/ui/AppConfirm.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ProjectList',
  components: {
    AppType,
    AppConfirm
  },
  props: {
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
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10
    }
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const store = useStore()
    const confirm = ref(false)
    const projectID = ref()
    const checkbox = ref([])

    const remove = id => {
      projectID.value = id
      confirm.value.confirm = true
    }

    const removeConfirm = async () => {
      try {
        await store.dispatch('project/delete', projectID.value)
        await store.dispatch('project/load')
        confirm.value.confirm = false
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

    return {
      confirm,
      remove,
      removeConfirm,
      checkbox,
      allCheckbox
    }
  }
}
</script>
