import React from 'react'
import InputField from '../../components/Forms/InputField'
import { useForm } from 'react-hook-form'
import { getInputFieldError } from '../../utils'
import { schema } from './form-validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import Title from '../../components/Title'
import './login.css'

interface LoginData {
  username: string
  password: string
}

function Login() {
  const { register, handleSubmit, errors } = useForm<LoginData>({
    resolver: yupResolver(schema)
  })

  function onFormSubmit(data: LoginData) {
    console.log('data', data)
  }

  return (
    <>
      <Title />
      <section className="login-container">
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

        <button className="btn link">Esqueceu a senha?</button>
        <p>
          Não possui registro?&nbsp;
          <Link to="/register" className="btn link">Registrar-se</Link>
        </p>
      </section>
    </>
  )
}

export default Login
