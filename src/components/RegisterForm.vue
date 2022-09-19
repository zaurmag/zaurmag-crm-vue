<template>
  <form action="#" @submit.prevent="onSubmit">
    <div class="mb-3">
      <label class="form-label" for="name">Ваше имя</label>
      <input class="form-control form-control-lg" :class="{'is-invalid': nError}" id="name" type="text" placeholder="Например, Иван" v-model="name" @blur="nBlur">
      <div class="invalid-feedback d-block fz-12" v-if="nError">{{ nError }}</div>
    </div>
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
    <div class="mb-3">
      <label class="form-label" for="password">Повторить пароль</label>
      <div class="form__password">
        <input class="form-control form-control-lg" :class="{'is-invalid': p2Error}" id="password2" type="password" placeholder="Не менее 6-ти знаков" v-model="password2" @blur="p2Blur">
        <a class="form__password-toggle" href="#" ref="togglePass2">
          <svg class="icon icon-eye">
            <use xlink:href="#eye"></use>
          </svg>
        </a>
      </div>
      <div class="invalid-feedback d-block fz-12" v-if="p2Error">{{ p2Error }}</div>
    </div>
    <button class="btn btn-primary btn-lg w-100" type="submit">Создать аккаунт</button>
  </form>
</template>

<script>
import { useRegisterForm } from '@/use/register-form'
import { onMounted, ref } from 'vue'
import togglePassword from '@/utils/toggle-password'

export default {
  name: 'RegisterForm',
  emits: ['complete'],
  setup (_, { emit }) {
    const togglePass = ref(null)
    const togglePass2 = ref(null)

    onMounted(() => {
      togglePassword(togglePass.value)
      togglePassword(togglePass2.value)
    })

    return {
      ...useRegisterForm(emit),
      togglePass,
      togglePass2
    }
  }
}
</script>
