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

export type TFormDataRepo = {
  name: string
  url: string
  type: string
  token: string
  username: string
  isButtonDisabled?: boolean
  id: string
}
// export type TFormDataRepoKey = {
//   [key: string]: string | boolean
// }
