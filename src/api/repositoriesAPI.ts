import { get } from '@/api/config'

export const getRepositories = async (page: number, size: number) => {
  return await get(`/endpoints?type=GIT&page=${page}&size=${size}`).then((response) => {
    return {
      data: response.data,
      totalPages: response.headers['x-page-count']
    }
  })
}

type TPageData = {
  totalItems: number | string
  itemsPerPage: number
  currentPage: number
}

type TRepositories = {
  id: string
  name: string
  token: string
  type: string
  url: string
  username: string
}

export const getRepo = async (
  page: number,
  repositories: { data: TRepositories[] },
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
