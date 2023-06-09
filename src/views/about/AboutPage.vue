<script setup lang="ts">
import FormButton from '@/components/UI/FormButton/FormButton.vue'
import MyButton from '@/components/UI/MyButton.vue'
import BaseSelect from '@/components/UI/BaseSelect/BaseSelect.vue'
import { mapGetters, mapMutations } from '@/hooks/useVuex'
import { ref, onMounted, onBeforeMount, reactive, watch } from 'vue'
import router from '@/router'
const { getTheme } = mapGetters()
const { switchTheme, switchThemeShort } = mapMutations()
import { useStore } from 'vuex'
const store = useStore()

//initial data
const formState = reactive({ gender: 'option2' })

const switchThemeLong = () => {
  switchTheme(`${getTheme.value === 'light' ? 'dark' : 'light'}`) //через геттер
}
const LogOut = () => {
  store.commit('auth/setToken', '')
  store.commit('auth/setAuth', false)
  localStorage.clear()
  router.push('/login')
}
const notFOund = () => {
  router.push('/NotFoundAuthPage')
}
//отрабатывает в тот момент когда компонент смонтирован, самый часто используемый хук для запросов на сервер
onMounted(() => {
  // console.log(2, 'mounted!')
})

onBeforeMount(() => {
  // console.log(1, 'onBeforeMount!')
})

// const someReactiveRef = ref(getTheme.value)
const refValue = ref('refValue1') //initial data
const reactiveValue = reactive({ reactiveUser: 1 }) //initial data

watch(
  () => formState,
  () => console.log(formState),
  { deep: true }
)

const handleUpdate = (value: string) => {
  formState.gender = value
}
</script>

<template>
  <div class="about">
    <BaseSelect
      :selected-option="formState.gender"
      :list="[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]"
      @change="handleUpdate"
    />
    <br />
    <br />
    <p>кнопки</p>
    <FormButton disabled="true">FormButton active disabled</FormButton>
    <FormButton class="cancel">FormButton cancel</FormButton>
    <br />

    <br />

    <h1>This is an about page</h1>
  </div>
  <div id="nav">
    <router-link to="/"> Home </router-link> |
    <router-link to="/about"> About </router-link>
    <MyButton :disabled="false" @click="(e) => switchThemeLong(e, 1)">
      switchTheme func плохой способ</MyButton
    >

    <MyButton :disabled="false" @click="switchTheme(getTheme === 'light' ? 'dark' : 'light')">
      switchTheme native плохой способ
    </MyButton>
    <MyButton :disabled="false" @click="switchThemeShort">
      switchThemeShort mutation норм способ</MyButton
    >
    <pre>refValue: {{ refValue }}</pre>
    <pre>reactiveUser: {{ reactiveValue.reactiveUser }}</pre>

    <MyButton :disabled="false" @click="LogOut"> выйти </MyButton>
    <MyButton :disabled="false" @click="notFOund"> не найдено </MyButton>
  </div>
</template>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
