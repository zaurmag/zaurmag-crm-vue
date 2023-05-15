<template>
  <app-page-header title="Рефактор БД">
    <div class="d-flex align-items-center">
      <button
        class="btn btn-success"
        type="button"
        @click="start"
      >
        Start
      </button>
      <button
        class="btn btn-danger ms-2"
        type="button"
        @click="stop"
      >
        Stop
      </button>
    </div>
  </app-page-header>
</template>

<script setup>
import axios from '@/axios/dbase'
import { ref } from 'vue'
// import { users } from '@/assets/zaurmagcrm-default-rtdb-export.json'
const interval = ref(null)
const users = {
  lJko4saf0actOVdADbKG9BUfLYf2: {
    info: {},
    projects: {
      'key-1': {
        amount: '2500',
        date: '2021-01-07',
        desc: 'Вторая часть 50% за верстку страницы услуг по вывозу мусора',
        title: 'Проект 1',
        type: 'income'
      },
      'key-2': {
        amount: '2500',
        date: '2021-01-07',
        desc: 'Вторая часть 50% за верстку страницы услуг по вывозу мусора',
        title: 'Проект 2',
        type: 'income'
      },
      'key-3': {
        amount: '2500',
        date: '2021-01-07',
        desc: 'Вторая часть 50% за верстку страницы услуг по вывозу мусора',
        title: 'Проект 3',
        type: 'income'
      },
      'key-4': {
        amount: '2500',
        date: '2021-01-07',
        desc: 'Вторая часть 50% за верстку страницы услуг по вывозу мусора',
        title: 'Проект 4',
        type: 'income'
      },
      'key-5': {
        amount: '2500',
        date: '2021-01-07',
        desc: 'Вторая часть 50% за верстку страницы услуг по вывозу мусора',
        title: 'Проект 5',
        type: 'income'
      }
    }
  }
}

const projects = users.lJko4saf0actOVdADbKG9BUfLYf2.projects
const userId = 'lJko4saf0actOVdADbKG9BUfLYf2'

const stop = () => {
  clearInterval(interval.value)
  console.log('Операция завершена!')
}

const start = () => {
  const projectsArray = Object.keys(projects).map(key => {
    // projects[key].userId = 'lJko4saf0actOVdADbKG9BUfLYf2'

    return projects[key]
  })

  let index = -1
  interval.value = setInterval(async () => {
    try {
      index++

      if (!projectsArray[index]) {
        stop()
      }

      await axios.post(`/projects/${userId}.json`, projectsArray[index])
    } catch (e) {
      console.error(e)
    }
  }, 1000)
}
</script>
