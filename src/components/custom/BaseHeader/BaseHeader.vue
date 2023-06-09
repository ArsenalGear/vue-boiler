<script setup lang="ts">
import { watch, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import { mapGetters, mapMutations } from '@/hooks/useVuex'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import BaseSvg from '@/components/custom/BaseSvg/BaseSvg.vue'
import { LightTheme, DarkTheme } from '@/assets/images/imageConstants'
import BaseSelect from '@/components/UI/BaseSelect/BaseSelect.vue'
import router from '@/router'

const { locale } = useI18n({ useScope: 'global' })
const { switchThemeShort, 'auth/setToken': setToken, 'auth/setAuth': setAuth } = mapMutations()
const { getTheme } = mapGetters()
const palette = reactive(getInitialTheme())

const formState = reactive({ settings: '' })

const handleChangeSettings = (value: string) => {
  if (value === 'logout') {
    //todo store.commit
    // store.commit('auth/setToken', '')
    setToken('')
    setAuth(false)
    localStorage.clear()
    router.push('/login')
  } else {
    locale.value === 'en' ? (locale.value = 'ru') : (locale.value = 'en')
    localStorage.setItem('lang', locale.value as string)
  }
}

//todo getTheme.value
watch(
  () => getTheme.value,
  () => handleThemeChange(palette)
)
</script>

<template>
  <div
    class="header"
    :class="{
      header_dark: getTheme === 'dark'
    }"
  >
    <div class="header__inner">
      <div class="header__logo-block">
        <img v-if="getTheme === 'dark'" alt="logo" src="@/assets/images/logo_light.png" />
        <img v-else alt="logo" src="@/assets/images/logo.png" />
        <hr />
        <BaseText type="h3">{{ $t('dashboardTitle') }}</BaseText>
      </div>
      <div class="header__user-block">
        <div class="header__icon-block">
          <!--          //todo :icon-path="getTheme === 'dark' ? LightTheme : DarkTheme"-->
          <BaseSvg
            :opacity="0.3"
            :width="`24`"
            :height="`24`"
            :icon-path="getTheme === 'dark' ? LightTheme : DarkTheme"
            :icon-color="palette.textColor"
            @click="switchThemeShort"
          />
        </div>
        <div class="header__avatar-block">
          <img alt="logo" src="@/assets/images/user.png" />
        </div>

        <BaseSelect
          :selected-option="formState.settings"
          :list="[
            { value: 'changeLanguage', label: $t('changeLanguage') },
            { value: 'logout', label: $t('logout') }
          ]"
          @change="handleChangeSettings"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';

.header {
  display: flex;
  width: 100%;
  min-height: 13.25rem;
  padding: 1.5rem 1.5rem 0;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  background-image: linear-gradient(
    233.98deg,
    rgb(210, 218, 236) 0%,
    rgb(239, 237, 230) 47.79%,
    rgb(250, 249, 249) 92.69%
  );
  &_dark {
    background-image: linear-gradient(
      244.93deg,
      rgb(6, 67, 158) -25.11%,
      rgb(45, 145, 176) 107.26%
    );
  }

  &__avatar-block {
    position: relative;
    margin-right: 0.75rem;
    margin-left: 3.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;
    user-select: none;

    & img {
      width: rem(40);
      height: rem(40);
    }
  }

  &__user-block {
    display: flex;
    align-items: center;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2rem;
    width: 100%;
  }
  &__logo-block {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &__logo-block {
    display: flex;
    align-items: center;
  }
  & img {
    border-style: none;
    vertical-align: middle;
  }

  &__icon-block {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }

  & hr {
    margin: 0;
    flex-shrink: 0;
    border-width: 0 thin 0 0;
    border-style: solid;
    border-color: v-bind('palette.textColor');
    opacity: 0.2;
    height: 1rem;
  }
}
</style>