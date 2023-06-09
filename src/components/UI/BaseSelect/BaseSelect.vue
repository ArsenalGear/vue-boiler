<script setup lang="ts">
import { reactive, watch, ref, toRefs, onMounted, onBeforeUnmount } from 'vue'

import { mapState } from '@/hooks/useVuex'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'

type TOptionItem = { value: string; label: string }
type TList = { list: TOptionItem[]; selectedOption: string }

const props = defineProps<TList>()
const emit = defineEmits(['change'])
const { theme } = mapState()
const palette = reactive(getInitialTheme())
const { list } = toRefs(props)
const isOpen = ref(false)

const handleClickOutside = (event: { target: any }) => {
  const target = event.target
  const dropdown = document.querySelector('.custom-dropdown')

  if (dropdown && !dropdown.contains(target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

// <!--      //todo onBeforeUnmount-->
onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: { value: string }) => {
  isOpen.value = false
  // <!--      //todo emit-->
  emit('change', option.value)
}

watch(
  () => theme.value.themeColor,
  () => handleThemeChange(palette)
)
</script>

<template>
  <div class="custom-dropdown">
    <div class="selected-option" @click="toggleDropdown">
      {{ selectedOption || $t('chooseList') }}
      <!--      //todo class-->
      <span :class="{ arrow: true, 'arrow-up': isOpen }"></span>
    </div>
    <ul v-if="isOpen" class="dropdown-options">
      <li
        v-for="option in list"
        :key="option.value"
        :class="{
          active: option.value === selectedOption
        }"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.custom-dropdown {
  position: relative;
  display: inline-block;
  font: rem(14) / rem(16) Roboto-Regular;
}

.selected-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: rem(10) rem(14);
  color: v-bind('palette.textColor');
  border: 1px solid v-bind('palette.formInputBorder');
  border-radius: 10px;
  background: v-bind('palette.formSelectBackground');
  cursor: pointer;

  & .arrow-up {
    transform: rotate(180deg);
  }

  &:hover {
    border: 1px solid v-bind('palette.formInputBorderHover');
  }
}

.arrow {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 5px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: v-bind('palette.formSelectIcon') transparent transparent transparent;
  vertical-align: middle;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: v-bind('palette.formInputBackground');
  //border: 1px solid v-bind('palette.formInputBorder');
  border-top: none;
  border-radius: 8px;
  box-shadow: rgba(31, 65, 104, 0.1) 0px 4px 16px;
}

.dropdown-options li {
  padding: rem(7) rem(14);
  margin: rem(5) 0;
  cursor: pointer;
  color: v-bind('palette.textColor');

  &.active {
    background: v-bind('palette.formSelectLiSelected');
  }
}

.dropdown-options li:hover {
  background-color: v-bind('palette.formSelectLiHover');
  color: v-bind('palette.white');
}
</style>
