<template>
  <div class="card">
    <h1>Страница отправки БД в Firebase</h1>

    <button class="btn primary" @click="start" type="button">Start</button>
    <button class="btn danger" type="button" @click="stop">Stop</button>

  </div>
</template>

<script>
import { products } from '../../db.json'
import { useStore } from 'vuex'

export default {
  name: "test",
  setup() {
    const store = useStore()

    const start = () => {
      const data = products.map(p => {
        delete p.id

        return p
      })

      let index = 1
      window.interval = setInterval(async () => {
        await store.dispatch('products/add', products[index])
        console.log(index)

        if (!products[index]) {
          stop()
        }
        index++
      }, 1000)
    }

    const stop = () => {
      clearInterval(window.interval)
      console.log('ClearInterval')
    }

    return {
      start,
      stop
    }
  }
}
</script>

<style scoped>

</style>
