<script setup lang="ts">
import { ref, toRefs, onMounted, onBeforeUnmount } from 'vue'

import themeMixin from '@/mixins/themeMixin'

type TOptionItem = { value: string; label: string }
type TList = { list: TOptionItem[]; selectedOption: string }

const props = defineProps<TList>()
const emit = defineEmits(['change'])
const { palette } = themeMixin()
const { list } = toRefs(props)
const isOpen = ref(false)

const selectOption = (option: { value: string }) => {
  isOpen.value = false
  emit('change', option.value)
}

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

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
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
  border-radius: rem(10);
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
  margin-left: rem(5);
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
  border-top: none;
  border-radius: rem(8);
  box-shadow: rgba(31, 65, 104, 0.1) 0 rem(4) rem(16);
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
