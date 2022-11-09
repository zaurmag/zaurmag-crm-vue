<template>
  <form action="#" @submit.prevent="onSubmit">
    <form-control
      id="name"
      label="Ваше имя"
      placeholder="Например, Иван"
      v-model="name"
      :blur="nBlur"
      :error="nError"
      classListInput="form-control-lg"
    />

    <form-control
      id="email"
      label="E-mail"
      type="email"
      :error="eError"
      :blur="eBlur"
      v-model="email"
      classListInput="form-control-lg"
      placeholder="email@address.com"
    />

    <form-control
      id="password"
      label="Пароль"
      type="password"
      :error="pError"
      :blur="pBlur"
      v-model="password"
      classListInput="form-control-lg"
      placeholder="Не менее 6-ти знаков"
    />

    <form-control
      id="password"
      label="Повторить пароль"
      type="password"
      :error="p2Error"
      :blur="p2Blur"
      v-model="password2"
      classListInput="form-control-lg"
      placeholder="Не менее 6-ти знаков"
    />

    <app-button
      classListWrapper="w-100"
      classListBtn="btn-primary btn-lg w-100"
      type="submit"
      :animate="{ loading: isSubmitting }"
    >Создать аккаунт</app-button>
  </form>
</template>

<script>
import { useRegisterForm } from '@/use/register-form'

export default {
  name: 'RegisterForm',
  emits: ['complete'],
  setup (_, { emit }) {
    return {
      ...useRegisterForm(emit)
    }
  }
}
</script>
