import { TPopUpData } from '@/components/custom/BasePopup/types'

export const calculatePopupPosition = (y: number, button: any, popUpData: TPopUpData) => {
  if (!button.value) return
  const buttonRect = button.value.getBoundingClientRect()
  const inWidth = window.innerWidth > 1200 ? 150 : 100
  popUpData.popupTop = y - 10
  popUpData.popupTopFrozen = y - 10
  popUpData.popupLeft = buttonRect.left - buttonRect.width - inWidth
}

// export const handleResize = () => {
//   const buttonRect = propsButton.value.getBoundingClientRect()
//   const inWidth = window.innerWidth > 1200 ? 150 : 100
//   const inHeight =
//     window.innerWidth > 1200
//       ? Number(popUpData.value.popupTop)
//       : Number(popUpData.value.popupTop) - 100
//   emit('popupLeft', buttonRect.left - buttonRect.width - inWidth)
//   emit('popupTopFrozen', inHeight)
//   emit('screenWidth', window.innerWidth)
// }
