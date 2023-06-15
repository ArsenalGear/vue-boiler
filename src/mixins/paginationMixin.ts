import { reactive } from 'vue'

import { TPageData } from '@/components/UI/BaseTable/types'
const paginationMixin = () => {
  const pageData: TPageData = reactive<TPageData>({
    totalItems: 0,
    itemsPerPage: 15,
    currentPage: 1
  })

  return {
    pageData
  }
}

export default paginationMixin
