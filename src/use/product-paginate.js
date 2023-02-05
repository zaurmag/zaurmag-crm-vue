import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import chunk from 'lodash.chunk'

export function useProductPaginate(products, size) {
  const router = useRouter()
  const route = useRoute()
  const page = ref(route.query.p ? +route.query.p : 1)
  const pageSize = ref(size)

  const _setPage = () => router.replace({ query: { p: page.value } })

  onMounted(_setPage)
  watch(page, _setPage)

  const paginateItems = computed(() => chunk(products.value, pageSize.value)[page.value - 1])

  const changePageSize = value => {
    pageSize.value = Number(value)
  }

  return {
    page,
    paginateItems,
    changePageSize
  }
}
