import { deleteMethod, get } from '@/api/config'
import { TPageData } from '@/components/UI/BaseTable/types'
import { TRepositories, TRepositoriesList } from '@/views/repositories/types'

export const getRepositoriesAPI = async (page: number, size: number) => {
  return await get(`/endpoints?type=GIT&page=${page}&size=${size}`).then((response) => {
    return {
      data: response.data,
      totalPages: response.headers['x-total-count']
    }
  })
}

export const deleteRepoAPI = async (id: string) => {
  return await deleteMethod(`/endpoints/${id}`).then((response) => {
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
      await getRepositoriesAPI(page - 1, pageData.itemsPerPage)

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

export const deleteRepo = async (id: string, setOverlayText: any) => {
  try {
    await setOverlayText('deleteRepo')
    await deleteRepoAPI(id)
  } catch (e) {
    console.log('e', e)
  } finally {
    await setOverlayText('empty')
  }
}
