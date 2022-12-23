<template>
  <div class="table-responsive">
    <table class="table align-middle table-borderless card-table mb-0">
      <thead class="table-light">
        <tr>
          <th class="table-cell-check">
            <div class="form-check">
              <input class="form-check-input float-none" type="checkbox" v-model="allCheckbox" />
            </div>
          </th>
          <th>#</th>
          <th>Дата платежа</th>
          <th style="min-width: 100px">Электр., квт/ч</th>
          <th style="min-width: 100px">Газ, м<sup>3</sup></th>
          <th style="min-width: 100px">Вода, м<sup>3</sup></th>
          <th style="min-width: 100px">Мусор</th>
          <th>Сумма</th>
          <th style="min-width: 120px">Статус</th>
          <th style="min-width: 150px">Действие</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="loader">
          <td colspan="10">
            <app-loader-row-placeholder cols="10" />
          </td>
        </tr>

        <template v-else-if="items.length">
          <tr v-for="(item, index) in items" :key="item.id">
            <td>
              <div class="form-check">
                <input class="form-check-input float-none" type="checkbox">
              </div>
            </td>
            <td>{{ index + 1 }}</td>
            <td><router-link class="table-cell-title-link is-transition" :to="{ name: 'CommunalPage', params: { id: item.id } }">
              {{ $dateF(item.date) + ' г.' }}</router-link>
            </td>
            <td>{{ item.electr.current }}</td>
            <td>{{ item.gas.current }}</td>
            <td>{{ item.water.current }}</td>
            <td>{{ item.trash.amount }}</td>
            <td>{{ $currency(item.amount) }}</td>
            <td>
              <app-indicator :classList="['me-2', `${item.status ? 'bg-success' : 'bg-warning'}`]" />
              {{ item.status ? 'Оплачено' : 'Не оплачено' }}
            </td>
            <td>
              <router-link class="btn btn-outline-primary btn-sm py-1 fz-12" :to="{ name: 'CommunalPage', params: { id: item.id } }">Подробнее</router-link>
              <button class="btn text-danger ms-1 fz-16 p-1" type="button" data-bs-toggle="tooltip" data-bs-title="Удалить">
                <svg class="icon icon-trash">
                  <use xlink:href="#trash"></use>
                </svg>
              </button>
            </td>
          </tr>
        </template>

        <tr v-else>
          <td colspan="10">
            <p class="mt-30 text-center text-secondary">Записей пока нет.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AppLoaderRowPlaceholder from '@/components/ui/AppLoaderRowPlaceholder.vue'

// eslint-disable-next-line no-undef
defineProps({
  items: {
    type: Array,
    required: true,
    default () {
      return []
    }
  },
  loader: {
    type: Boolean,
    required: true,
    default: false
  }
})
</script>
