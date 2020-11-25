import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string()
    .required('Campo obrigatório.'),
  email: yup.string()
    .email('Digite um email válido.')
    .required('Campo obrigatório.'),
  username: yup.string()
    .trim()
    .required('Campo obrigatório.'),
  birthday: yup.string()
    .required('Campo obrigatório.'),
  password: yup.string()
      .required('Campo obrigatório.'),
  confirmPassword: yup.string()
    .required('Campo obrigatório.'),
  privacyTerms: yup.boolean()
    .required('Marque como lido.')
})

export { schema }
