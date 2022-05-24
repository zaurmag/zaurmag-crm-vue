<template>
  <nav class="pagination" v-if="items > 1">
    <div class="row align-items-center gy-3 justify-content-between">
      <div class="col-sm-3">
        <div class="pagination__pagesize align-items-center">
          <div class="text-secondary me-2">Показать:</div>
            <AppSelect :options="optionsSize" v-model="selectSize" />
          <div class="text-secondary ms-3">из</div>
          <div class="text-secondary ms-2">{{ count }}</div>
        </div>
      </div>
      <div class="col-sm-auto">
        <ul class="pagination__list">
          <li class="pagination__item" :class="{'is-disabled': modelValue === 1}">
            <a class="pagination__link" href="#" @click.prevent="$emit('update:modelValue', modelValue - 1)">Предыдущая</a>
          </li>
          <template v-for="p in items" :key="p">
            <li
              class="pagination__item"
              :class="[{'is-active': p === modelValue}]"
              v-if="p <= 10"
            >
              <a href="#" @click.prevent="$emit('update:modelValue', p)" class="pagination__link">{{ p }}</a>
            </li>
          </template>
          <li v-if="items > 10">
            <a class="pagination__link" href="#" @click.prevent="$emit('update:modelValue', modelValue + 1)">...</a>
          </li>
          <li class="pagination__item" :class="{'is-disabled': modelValue === items}">
            <a class="pagination__link" href="#" @click.prevent="$emit('update:modelValue', modelValue + 1)">Следующая</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref, watch } from 'vue'
import AppSelect from '@/components/ui/AppSelect'

export default {
  name: 'AppPagination',
  props: ['count', 'pages', 'modelValue'],
  emits: ['changeSize', 'update:modelValue'],
  setup (props, { emit }) {
    const optionsSize = ref([
      {
        name: '10',
        value: '10'
      },
      {
        name: '20',
        value: '20'
      },
      {
        name: '50',
        value: '50'
      },
      {
        name: '100',
        value: '100'
      }
    ])
    const selectSize = ref(props.pages)

    watch(selectSize, size => {
      emit('changeSize', size.value)
    })

    return {
      items: computed(() => Math.ceil(props.count / selectSize.value.value)),
      selectSize,
      optionsSize
    }
  },
  components: {
    AppSelect
  }
}
</script>
