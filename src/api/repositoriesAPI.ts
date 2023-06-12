import { get } from '@/api/config'
import { TPageData } from '@/components/UI/BaseTable/types'
import { TRepositories, TRepositoriesList } from '@/views/repositories/types'

export const getRepositories = async (page: number, size: number) => {
  return await get(`/endpoints?type=GIT&page=${page}&size=${size}`).then((response) => {
    return {
      data: response.data,
      totalPages: response.headers['x-total-count']
    }
  })
}

export const getRepo = async (
  page: number,
  repositories: TRepositoriesList,
  setOverlayText: any,
  pageData: TPageData
) => {
  try {
    await setOverlayText('getRepo')
    const { data, totalPages }: { data: TRepositories[]; totalPages: number } =
      await getRepositories(page - 1, pageData.itemsPerPage)

    return {
      data,
      totalPages
    }
  } catch (e) {
    console.log('e', e)
  } finally {
    await setOverlayText('empty')
  }
}
