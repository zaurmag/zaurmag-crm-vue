<template>
  <form action="#" @submit.prevent="onSubmit">
    <div class="mb-3">
      <label class="form-label" for="email">E-mail</label>
      <input class="form-control form-control-lg" :class="{'is-invalid': eError}" id="email" type="email" placeholder="email@address.com" v-model="email" @blur="eBlur">
      <div class="invalid-feedback d-block fz-12" v-if="eError">{{ eError }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="password">Пароль</label>
      <div class="form__password">
        <input class="form-control form-control-lg" :class="{'is-invalid': pError}" id="password" type="password" placeholder="Не менее 6-ти знаков" v-model="password" @blur="pBlur">
        <a class="form__password-toggle" href="#" ref="togglePass">
          <svg class="icon icon-eye">
            <use xlink:href="#eye"></use>
          </svg>
        </a>
      </div>
      <div class="invalid-feedback d-block fz-12" v-if="pError">{{ pError }}</div>
    </div>

    <div class="progress h-auto">
      <button
        class="btn btn-primary btn-lg w-100"
        :class="{ 'progress-bar progress-bar-striped progress-bar-animated': loading }"
        type="submit"
      >Войти</button>
    </div>
  </form>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useLoginForm } from '@/use/login-form'
import togglePassword from '@/utils/toggle-password'

export default {
  name: 'AuthForm',
  setup () {
    const togglePass = ref(null)

    onMounted(() => {
      togglePassword(togglePass.value)
    })

    return {
      ...useLoginForm(),
      togglePass
    }
  }
}
</script>

<style scoped>

</style>
