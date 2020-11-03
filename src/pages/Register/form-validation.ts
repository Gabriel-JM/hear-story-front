import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup.string()
    .trim()
    .required('Campo obrigatório.'),
  password: yup.string()
    .required('Campo obrigatório.')
})

export { schema }
