import { reactive } from 'vue'

import { TFormDataRepo, TRepositories, TRepositoriesList } from '@/views/repositories/types'
import { addRepoAPI, deleteRepoAPI, editRepoAPI, getRepositoriesAPI } from '@/api/repositoriesAPI'
import { TPageData } from '@/components/UI/BaseTable/types'

export function useRepo() {
  const formDataRepo: TFormDataRepo = reactive({
    name: '',
    url: '',
    token: '',
    username: '',
    id: '',
    type: 'GIT',
    isButtonDisabled: true
  })

  const deleteRepo = async (id: string, setOverlayText: any) => {
    try {
      await setOverlayText('deleteRepo')
      await deleteRepoAPI(id)
    } catch (e) {
      console.log('e', e)
    } finally {
      await setOverlayText('empty')
    }
  }

  const addRepo = async (formData: TFormDataRepo, setOverlayText: any) => {
    try {
      await setOverlayText('createRepo')
      // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
      const { isButtonDisabled, id, ...rest } = formData
      await addRepoAPI(rest)
    } catch (e) {
      console.log('e', e)
    } finally {
      await setOverlayText('empty')
    }
  }

  const getRepo = async (
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

  const editRepo = async (formData: TFormDataRepo, setOverlayText: any) => {
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

  return {
    formDataRepo,
    deleteRepo,
    addRepo,
    getRepo,
    editRepo
  }
}
