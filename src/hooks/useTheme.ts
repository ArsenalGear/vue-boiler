import { light } from '@/constants/light'
import { dark } from '@/constants/dark'
import store from '@/store'

type ResultMode = {
  [key: string]: string
}

type Palette = {
  [key: string]: string
}

export function handleThemeChange(palette: Palette): void {
  const getTheme = store.getters.getTheme
  const resultMode: ResultMode = getTheme === 'light' ? light : dark
  for (const key in palette) {
    if (Object.prototype.hasOwnProperty.call(resultMode, key)) {
      palette[key] = resultMode[key]
    }
  }
}

export function getInitialTheme() {
  const getTheme = store.getters.getTheme
  const resultMode: ResultMode = getTheme === 'light' ? light : dark
  const res: Palette = {}
  Object.keys(light).forEach((e) => (res[e] = resultMode[e]))
  return res
}
