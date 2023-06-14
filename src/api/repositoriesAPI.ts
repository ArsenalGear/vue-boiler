import { deleteMethod, get, post, put } from '@/api/config'
import { TPageData } from '@/components/UI/BaseTable/types'
import { TFormDataRepo, TRepositories, TRepositoriesList } from '@/views/repositories/types'

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

export const addRepoAPI = (data: TFormDataRepo) =>
  post(`/endpoints/git`, data).then((response) => response.data)

export const editRepoAPI = (data: TFormDataRepo) =>
  put(`/endpoints`, data).then((response) => response.data)

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

export const addRepo = async (formData: TFormDataRepo, setOverlayText: any) => {
  try {
    await setOverlayText('createRepo')
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const { isButtonDisabled, ...rest } = formData
    await addRepoAPI(rest)
  } catch (e) {
    console.log('e', e)
  } finally {
    await setOverlayText('empty')
  }
}

export const editRepo = async (formData: TFormDataRepo, setOverlayText: any) => {
  try {
    await setOverlayText('editRepo')
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const { isButtonDisabled, ...rest } = formData
    await editRepoAPI(rest)
  } catch (e) {
    console.log('e', e)
  } finally {
    await setOverlayText('empty')
  }
}
