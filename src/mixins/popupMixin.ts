import { Ref, onMounted, onUnmounted, ref, computed } from 'vue'

const popupMixin = () => {
  const button: Ref<HTMLElement | null> = ref(null)
  const popup: Ref<HTMLElement | null> = ref(null)

  const isPopupVisible = ref(false)
  const popupTop = ref(0)
  const popupLeft = ref(0)
  const screenWidth = ref(0)

  const popupLeftValue = computed(() => {
    if (!button.value) return
    const buttonRect = button.value.getBoundingClientRect()
    const isAdaptive = window.innerWidth < 1199 ? 35 : 0
    console.log('123', isAdaptive)
    return buttonRect.left - buttonRect.width - 140 + isAdaptive
  })

  const showPopup = (y: number) => {
    isPopupVisible.value = true
    calculatePopupPosition(y)
  }

  const hidePopup = () => {
    isPopupVisible.value = false
  }

  const handleClickOutside = (event: Event) => {
    if (!event.target || !(event.target instanceof HTMLElement)) return

    if (!event.target.closest('.popup')) {
      hidePopup()
    }
  }

  const handleResize = () => {
    if (!popupLeftValue.value) return
    popupLeft.value = popupLeftValue.value
    screenWidth.value = window.innerWidth
  }

  const calculatePopupPosition = (y: number) => {
    if (!popupLeftValue.value) return
    popupTop.value = y - 10
    popupLeft.value = popupLeftValue.value
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('resize', handleResize)
  })

  return {
    button,
    popup,
    isPopupVisible,
    popupTop,
    popupLeft,
    showPopup,
    hidePopup,
    calculatePopupPosition
  }
}

export default popupMixin
