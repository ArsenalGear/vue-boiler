<script setup lang="ts">
import { reactive, watch, ref, toRefs } from 'vue'
import { mapState } from '@/hooks/useGetters'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'

type TOptionItem = { value: string; label: string }
type TList = { list: TOptionItem[]; selectedOption: string }
const props = defineProps<TList>()

const emit = defineEmits(['change'])

const { theme } = mapState()
const palette = reactive(getInitialTheme())
const { list } = toRefs(props)
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: { value: string }) => {
  isOpen.value = false
  emit('change', option.value)
}

watch(
  () => theme.value.themeColor,
  () => handleThemeChange(palette)
)
</script>

<template>
  <div class="custom-dropdown">
    <pre>{{ selectedOption }}</pre>
    <div class="selected-option" @click="toggleDropdown">
      {{ selectedOption || 'Выберите из списка' }}
      <span class="arrow"></span>
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
  min-width: 200px;
  position: relative;
  display: inline-block;
  font: rem(14) / rem(16) Roboto-Regular;
}

.selected-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: rem(10);
  color: v-bind('palette.textColor');
  border: 1px solid v-bind('palette.formInputBorder');
  border-radius: 4px;
  background: v-bind('palette.formInputBackground');
  cursor: pointer;
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
  border: 1px solid v-bind('palette.formInputBorder');
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-options li {
  padding: 10px;
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
