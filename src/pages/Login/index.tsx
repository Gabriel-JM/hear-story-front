import React from 'react'
import InputField from '../../components/Forms/InputField'
import { useForm } from 'react-hook-form'
import { getInputFieldError } from '../../utils'
import { schema } from './form-validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useHistory } from 'react-router-dom'
import Title from '../../components/Title'
import { api } from '../../service/api'
import { useAuth } from '../../context/auth'
import './login.css'

interface LoginData {
  username: string
  password: string
}

function Login() {
  const auth = useAuth()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm<LoginData>({
    resolver: yupResolver(schema)
  })

  async function onFormSubmit(data: LoginData) {
    try {
      const response = await api.post('/login', data)

      if(response.ok && response.data.token) {
        auth.signIn(response.data)
        history.push('/dashboard')
      }
    } catch(catchedError) {
      console.log(catchedError.message)
    }
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
