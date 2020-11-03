import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InputField from '../../components/Forms/InputField'
import { schema } from './form-validation'
import { getInputFieldError } from '../../utils'
import Title from '../../components/Title'

interface RegisterData {
  name: string
  username: string
  email: string
  day: number
  mouth: number
  year: number
  password: string
  confirmPassword: string
  privacyTerms: boolean
}

function Register() {
  const { register, handleSubmit, errors } = useForm<RegisterData>({
    resolver: yupResolver(schema)
  })

  function onFormSubmit() {
    console.log('Form')
  }

  return (
    <>
      <Title showImg={false} />
      <section className="register-container">
        <form className="login-form" onSubmit={handleSubmit(onFormSubmit)}>
          <InputField
            required
            name="username"
            placeholder="Username"
            onInput={e => {
              const input = e.target as HTMLInputElement
              input.value = input.value.replace(/\s+/g, '')
            }}
            ref={register({ required: true })}
            errors={getInputFieldError(errors.username)}
          />
          <InputField
            type="password"
            required
            name="password"
            placeholder="Password"
            ref={register({ required: true })}
            errors={getInputFieldError(errors.password)}
          />
          <button className="btn primary">Entrar</button>
        </form>
      </section>
    </>
  )
}

export default Register
