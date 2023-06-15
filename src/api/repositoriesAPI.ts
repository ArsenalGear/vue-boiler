import { deleteMethod, get, post, put } from '@/api/config'
import { TFormDataRepo } from '@/views/repositories/types'

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
