<template>
  <form
    action="#"
    @submit.prevent="onSubmit"
  >
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

    <app-button
      class-list-btn="btn-primary btn-lg w-100"
      class-list-wrapper="w-100"
      type="submit"
      :animate="{ loading: isSubmitting }"
    >
      Войти
    </app-button>
  </form>
</template>

<script>
import { useLoginForm } from '@/use/login-form'

export default {
  name: 'AuthForm',
  setup() {
    return {
      ...useLoginForm()
    }
  }
}
</script>
