export type TRepositories = {
  id: string
  name: string
  token: string
  type: string
  url: string
  username: string
}

export type TRepositoriesList = {
  data: TRepositories[]
}
