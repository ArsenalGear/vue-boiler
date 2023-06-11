import { get } from '@/api/config'

export const getRepositories = async () =>
  await get(`/endpoints?type=GIT&page=0&size=8`).then((response) => response.data)
