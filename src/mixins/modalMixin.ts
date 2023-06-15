import { reactive } from 'vue'
const modalMixin = () => {
  const modalData: { type: string } = reactive<{ type: string }>({
    type: ''
  })

  return {
    modalData
  }
}

export default modalMixin
