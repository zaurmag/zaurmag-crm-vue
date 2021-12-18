<template>
  <nav class="pagination" v-if="items > 1">
    <div class="row align-items-center gy-3 justify-content-between">
      <div class="col-sm-3">
        <div class="pagination__pagesize align-items-center">
          <div class="text-secondary me-2">Показать:</div>
          <select class="form-select form-select-sm" v-model="selectSize" @change="$emit('changeSize', selectSize)">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <div class="text-secondary ms-3">из</div>
          <div class="text-secondary ms-2">{{ count }}</div>
        </div>
      </div>
      <div class="col-sm-auto">
        <ul class="pagination__list">
          <li class="pagination__item" :class="{'is-disabled': modelValue === 1}">
            <a class="pagination__link" href="#" @click.prevent="$emit('update:modelValue', modelValue - 1)">Предыдущая</a>
          </li>
          <template
            v-for="p in items"
            :key="p"
          >
            <li v-if="(p === items && Math.abs(p - modelValue) > 3)">...</li>

            <li
              :class="['pagination__item', {'is-active': p === modelValue}]"
              v-if="p < 9 && modelValue < 9"
            >
              <a href="#" @click.prevent="$emit('update:modelValue', p)" class="pagination__link">{{ p }}</a>
            </li>
            <li
              :class="['pagination__item', {'is-active': p === modelValue}]"
              v-else-if="Math.abs(p - modelValue) < 3 || p === items || p === 1"
            >
              <a href="#" @click.prevent="$emit('update:modelValue', p)" class="pagination__link">{{ p }}</a>
            </li>

            <li v-if="p === 1 && Math.abs(p - modelValue) > 3">...</li>
          </template>
          <li class="pagination__item" :class="{'is-disabled': modelValue === items}">
            <a class="pagination__link" href="#" @click.prevent="$emit('update:modelValue', modelValue + 1)">Следующая</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'AppPagination',
  props: ['count', 'pages', 'modelValue'],
  emits: ['changeSize', 'update:modelValue'],
  setup (props) {
    const selectSize = ref(props.pages)

    return {
      items: computed(() => Math.ceil(props.count / selectSize.value)),
      selectSize
    }
  }
}
</script>

<style scoped>
  .form-select {
    max-width: 30%;
  }
</style>
