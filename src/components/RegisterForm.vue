<template>
  <form
    action="#"
    @submit.prevent="onSubmit"
  >
    <form-control
      id="name"
      v-model="name"
      label="Ваше имя"
      placeholder="Например, Иван"
      :blur="nBlur"
      :error="nError"
      class-list-input="form-control-lg"
    />

    <form-control
      id="email"
      v-model="email"
      label="E-mail"
      type="email"
      :error="eError"
      :blur="eBlur"
      class-list-input="form-control-lg"
      placeholder="email@address.com"
    />

    <form-control
      id="password"
      v-model="password"
      label="Пароль"
      type="password"
      :error="pError"
      :blur="pBlur"
      class-list-input="form-control-lg"
      placeholder="Не менее 6-ти знаков"
    />

    <form-control
      id="password"
      v-model="password2"
      label="Повторить пароль"
      type="password"
      :error="p2Error"
      :blur="p2Blur"
      class-list-input="form-control-lg"
      placeholder="Не менее 6-ти знаков"
    />

    <app-button
      class-list-wrapper="w-100"
      class-list-btn="btn-primary btn-lg w-100"
      type="submit"
      :animate="{ loading: isSubmitting }"
    >
      Создать аккаунт
    </app-button>
  </form>
</template>

<script>
import { useRegisterForm } from '@/use/register-form'

export default {
  name: 'RegisterForm',
  emits: ['complete'],
  setup(_, { emit }) {
    return {
      ...useRegisterForm(emit)
    }
  }
}
</script>
