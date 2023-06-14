import * as Yup from 'yup'

export const schemaRepo = Yup.object().shape({
  name: Yup.string().required(),
  url: Yup.string().required(),
  token: Yup.string().required(),
  username: Yup.string().required()
})
