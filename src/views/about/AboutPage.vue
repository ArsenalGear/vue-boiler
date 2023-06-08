<script setup lang="ts">
import HelloWorld from '@/views/home/components/hello-world.vue'
import BaseButton from '@/components/UI/BaseButton/BaseButton.vue'
import FormButton from '@/components/UI/FormButton/FormButton.vue'
import MyButton from '@/components/UI/MyButton.vue'
import FormInput from '@/components/UI/FormInput/FormInput.vue'
import BaseSelect from '@/components/UI/BaseSelect/BaseSelect.vue'
import { mapGetters, mapState, mapMutations } from '@/hooks/useGetters'
import {
  // computed,
  ref,
  onMounted,
  onBeforeMount,
  reactive,
  watch
} from 'vue'
import router from '@/router'
const { countUp, getTheme } = mapGetters()
const { switchTheme, switchThemeShort } = mapMutations()
import { useStore } from 'vuex'
const store = useStore()
const { theme, count } = mapState() //важно использовать в компонентах геттеры а не стейт напрямую
//initial data
const formState = reactive({ gender: 'option2' })

const switchThemeLong = () => {
  switchTheme(`${getTheme.value === 'light' ? 'dark' : 'light'}`) //через геттер
}
const LogOut = () => {
  console.log('store', store)
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
// mounted
// methods $emit

watch(
  () => formState,
  () => console.log(formState),
  { deep: true }
)

const handleUpdate = (value: string) => {
  console.log('Update event emitted with value:', value)
  formState.gender = value
}
</script>

<template>
  <div class="about">
    <FormButton>FormButton active</FormButton>
    <FormInput placeholder="sdf" name="sdf" />
    <BaseSelect
      :selected-option="formState.gender"
      :list="[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]"
      @change="handleUpdate"
    />

    <FormButton disabled="true">FormButton active disabled</FormButton>
    <FormButton class="cancel">FormButton cancel</FormButton>
    <BaseButton>Войти BaseButton</BaseButton>
    <MyButton :disabled="false" @click="switchTheme(getTheme === 'light' ? 'dark' : 'light')">
      {{ getTheme.value }}
    </MyButton>

    <h1>This is an about page</h1>

    <img alt="Vue logo" src="@/assets/images/logo.png" />
    <HelloWorld color="red" msg="Welcome to Your Vue3 Boilerplate" />
  </div>
  <div id="nav">
    <pre>themeColor: {{ theme.themeColor }}</pre>
    <router-link to="/"> Home </router-link> |
    <router-link to="/about"> About </router-link>
    <MyButton :disabled="false" @click="(e) => switchThemeLong(e, 1)">
      <!--      @click="$store.commit('switchTheme', theme.themeColor === 'light' ? 'dark' : 'light')" нативно-->
      switchTheme
    </MyButton>

    <MyButton :disabled="false" @click="switchTheme(getTheme === 'light' ? 'dark' : 'light')">
      {{ getTheme.value }}
    </MyButton>
    <MyButton :disabled="false" @click="switchThemeShort"> switchThemeShort </MyButton>
    <pre>{{ count }}</pre>
    <pre>{{ countUp }}</pre>
    <pre>refValue: {{ refValue }}</pre>
    <pre>reactiveUser: {{ reactiveValue.reactiveUser }}</pre>

    <MyButton :disabled="false" @click="LogOut"> выйти </MyButton>
    <MyButton :disabled="false" @click="notFOund"> выйти </MyButton>
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
