import { Ref, onMounted, onUnmounted, ref } from 'vue'

const popupMixin = () => {
  const button: Ref<HTMLElement | null> = ref(null)
  const popup: Ref<HTMLElement | null> = ref(null)

  const isPopupVisible = ref(false)
  const popupTop = ref(0)
  const popupLeft = ref(0)
  const screenWidth = ref(0)

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
    if (!button.value) return
    const buttonRect = button.value.getBoundingClientRect()
    popupLeft.value = buttonRect.left - buttonRect.width - 140
    screenWidth.value = window.innerWidth
  }

  const calculatePopupPosition = (y: number) => {
    if (!button.value) return
    const buttonRect = button.value.getBoundingClientRect()

    popupTop.value = y - 10
    popupLeft.value = buttonRect.left - buttonRect.width - 140
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
