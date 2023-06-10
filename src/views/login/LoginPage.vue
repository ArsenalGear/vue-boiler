<script setup lang="ts">
import * as Yup from 'yup'
import { onMounted, reactive, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { useStore } from 'vuex'

import BaseButton from '@/components/UI/BaseButton/BaseButton.vue'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import FormInput from '@/components/UI/FormInput/FormInput.vue'
import { FormData } from '@/views/login/types'
const store = useStore()

useHead({
  title: 'Главная страница',
  meta: [
    {
      name: 'description',
      content: 'Описание'
    }
  ]
})

const formData: FormData = reactive({
  isButtonDisabled: true,
  username: 'admin',
  password: 'admin'
})

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
})

const isSubmitButtonDisable = (): void => {
  schema
    .isValid(formData)
    .then((valid) => {
      formData.isButtonDisabled = !valid
    })
    .catch((error) => {
      console.error(error)
    })
}

const submitForm = (event: Event): void => {
  event.preventDefault()
  if (!formData.isButtonDisabled) {
    store.dispatch('auth/getTokenAPI', formData)
  }
}

onMounted(() => {
  isSubmitButtonDisable()
})

watch(() => formData, isSubmitButtonDisable, { deep: true })
</script>

<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-wrapper-block">
        <div class="login__left-block">
          <div class="login__logo-wrapper">
            <img alt="logo" src="@/assets/images/logo.png" />
          </div>
          <div class="login__user-logo-wrapper"></div>
        </div>
        <div class="login__right-block">
          <div class="login__form-block">
            <form @submit.prevent>
              <BaseText :style="{ color: '#19212f' }" type="h1">{{ $t('title') }}</BaseText>
              <div class="form-item-wrapper">
                <FormInput
                  name="username"
                  :style="{
                    background: '#ffffff',
                    border: 'unset',
                    height: '2.5rem',
                    borderRadius: '0.5rem'
                  }"
                  :placeholder="$t('placeholders.username')"
                  :value="formData.password"
                  @input="(value) => (formData.username = value)"
                />
              </div>
              <div class="form-item-wrapper">
                <FormInput
                  name="password"
                  :style="{
                    background: '#ffffff',
                    border: 'unset',
                    height: '2.5rem',
                    borderRadius: '0.5rem'
                  }"
                  :placeholder="$t('placeholders.password')"
                  :value="formData.password"
                  @input="(value) => (formData.password = value)"
                />
              </div>
              <BaseButton
                :disabled="formData.isButtonDisabled"
                type="button"
                :style="{ alignSelf: 'end' }"
                @click="submitForm"
                >{{ $t('title') }}
              </BaseButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/functions';
.login {
  display: flex;
  width: 100%;
  min-width: 1023px;
  height: 100vh;
  max-height: 100%;

  &-wrapper {
    height: 100%;
    width: 100%;
    padding: 0 6.25rem;
    display: flex;
    justify-content: center;
    flex-grow: 0;
    background-image: linear-gradient(
      233.98deg,
      rgb(210, 218, 236) 0%,
      rgb(239, 237, 230) 47.79%,
      rgb(250, 249, 249) 92.69%
    );
    &-block {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-grow: 0;
      max-width: rem(1400);
    }
  }

  &__left-block {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
    height: 100%;
  }

  &__right-block {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
  }

  &__logo-wrapper {
    position: absolute;
    left: 4.85rem;
    top: 6.1875rem;
    transform: translate(-50%, -50%);
  }

  &__user-logo-wrapper {
    width: 100%;
    height: 100%;
    max-width: 32.5rem;
    max-height: 27.875rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/login-image.png');
  }

  &__form-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 52%;

    & form {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
