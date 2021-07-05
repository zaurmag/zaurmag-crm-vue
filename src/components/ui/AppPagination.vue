<template>
  <nav class="pagination" v-if="items > 1">
    <div class="row align-items-center gy-3">
      <div class="col-sm">
        <div class="pagination__pagesize">
          <div class="text-secondary me-2">Показать:</div>
          <select v-model="selectSize" @change="$emit('changeSize', selectSize)">
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
          <div class="text-secondary ms-3">из</div>
          <div class="text-secondary ms-2">20</div>
        </div>
      </div>
      <div class="col-sm-auto">
        <ul class="pagination__list">
          <li class="pagination__nav pagination__nav--start" :class="{'is-hidden': modelValue === 1}">
            <a class="pagination__link" href="#" @click.prevent="$emit('update:modelValue', modelValue - 1)">Предыдущая</a>
          </li>
          <li class="pagination__item" v-for="p in items" :key="p">
            <a href="#" @click.prevent="$emit('update:modelValue', p)" :class="['pagination__link', {'is-active': p === modelValue}]">{{ p }}</a>
          </li>
          <li class="pagination__nav pagination__nav--end" :class="{'is-hidden': modelValue === items}">
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

</style>
