<template>
  <div class="table-responsive">
    <table v-if="projects && projects.length" class="table align-middle table-borderless card-table mb-0">
      <thead class="table-light">
        <tr>
          <th class="table-cell-check">
            <div class="form-check">
              <input
                class="form-check-input float-none"
                type="checkbox"
                v-model="allCheckbox"
              >
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
        <tr v-for="(project, index) in projects" :key="project.id">
          <td>
            <div class="form-check">
              <input
                class="form-check-input float-none"
                type="checkbox"
                v-model="checkbox"
                :value="project.id"
              >
            </div>
          </td>
          <td>{{ index + 1 }}</td>
          <td style="min-width: 215px">
            <router-link
              class="table-cell-title-link is-transition"
              :to="{name: 'Project', params: { id: project.id }}"
            >
              {{ project.title }}
            </router-link>
          </td>
          <td>{{ $dateF(project.date) }}</td>
          <td style="min-width: 380px">{{ project.desc }}</td>
          <td><app-type :type="project.type" /></td>
          <td>{{ $currency(project.amount) }}</td>
          <td style="min-width: 140px">
            <button
              class="btn btn-outline-primary btn-sm py-1 fz-12"
              type="button"
              @click="$router.push(`/project/${project.id}`)"
            >Открыть</button>
            <button
              class="btn text-danger ms-1 fz-16 p-1"
              type="button"
              v-tooltip="{ title: 'Удалить' }"
              @click="remove(project.id)"
            >
              <svg class="icon icon-trash">
                <use xlink:href="#trash"></use>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="p-30 text-center fz-14 text-dark" v-else-if="!loader">Записей пока нет.</p>
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppType from '@/components/ui/AppType'
import AppConfirm from '@/components/ui/AppConfirm'

export default {
  name: 'ProjectList',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  emits: ['selected'],
  setup (props, { emit }) {
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
      } catch (e) {}
    }

    const allCheckbox = computed({
      get () {
        emit('selected', checkbox.value)
        return checkbox.value.length === props.projects.length
      },
      set (val) {
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
  },
  components: {
    AppType,
    AppConfirm
  }
}
</script>
