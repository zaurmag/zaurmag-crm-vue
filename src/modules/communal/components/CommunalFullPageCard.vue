<template>
  <div class="col-xxl col-lg-6 col-md-4 col-sm-6">
    <app-card
      :class="`h-100 card--${color}`"
      class-list-body="p-25"
    >
      <h3
        class="card-subtitle"
        v-html="title"
      />
      <p v-if="prev">
        Предыдущие:
        <span class="fz-16">{{ $currency(prev, { style: 'decimal' }) }}</span>
      </p>
      <p v-if="current">
        Текущие:
        <span class="fz-16">{{ $currency(current, { style: 'decimal' }) }}</span>
      </p>
      <p v-if="diff !== current">
        Разница:
        <span class="fz-16">{{ $currency(diff, { style: 'decimal' }) }}</span>
      </p>
      <p v-if="people">
        Количество человек:
        <span class="fz-16">{{ people }}</span>
      </p>
      <p v-if="rate">
        Тариф:
        <span class="fz-16">{{ $currency(rate) }}</span>
      </p>
      <p
        v-if="amount"
        class="m-0"
      >
        Сумма:
        <span class="fw-medium fz-16">{{ $currency(amount) }}</span>
      </p>
    </app-card>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  color: {
    type: String,
    required: false,
    default: 'primary'
  },
  title: {
    type: String,
    required: true
  },
  prev: {
    type: Number,
    required: false,
    default: 0
  },
  current: {
    type: Number,
    required: false,
    default: 0
  },
  people: {
    type: Number,
    required: false,
    default: 0
  },
  diff: {
    type: Number,
    required: false,
    default: 0
  },
  rate: {
    type: Number,
    required: false,
    default: 0
  },
  amount: {
    type: Number,
    required: false,
    default: 0
  }
})
</script>
