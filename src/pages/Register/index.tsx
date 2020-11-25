import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InputField from '../../components/Forms/InputField'
import { schema } from './form-validation'
import { getInputFieldError } from '../../utils'
import Title from '../../components/Title'
import { useHistory } from 'react-router-dom'
import { api } from '../../service/api'

import './register.css'

interface RegisterData {
  name: string
  username: string
  email: string
  birthday: string
  password: string
  confirmPassword: string
  privacyTerms: boolean
}

function Register() {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm<RegisterData>({
    resolver: yupResolver(schema)
  })

  async function onFormSubmit(data: RegisterData) {
    data.birthday = new Date(data.birthday)
      .toISOString()
      .split('T')[0]
    ;

    try {
      const response = await api.post('/register', data)

      response.ok && history.push('/')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <Title showImg={false} />
      <section className="register-container">
        <form className="login-form" onSubmit={handleSubmit(onFormSubmit)}>
          <InputField
            label="Nome"
            required
            name="name"
            placeholder="Seu nome"
            ref={register({ required: true })}
            errors={getInputFieldError(errors.name)}
          />

          <InputField
            label="Username"
            required
            name="username"
            placeholder="Nome de usuário"
            onInput={e => {
              const input = e.target as HTMLInputElement
              input.value = input.value.replace(/\s+/g, '')
            }}
            ref={register({ required: true })}
            errors={getInputFieldError(errors.username)}
          />

          <InputField
            label="E-mail"
            required
            name="email"
            placeholder="E-mail"
            ref={register({ required: true })}
            errors={getInputFieldError(errors.email)}
          />

          <InputField
            type="date"
            label="Data de Nascimento"
            required
            name="birthday"
            ref={register({ required: true })}
            errors={getInputFieldError(errors.birthday)}
          />

          <InputField
            type="password"
            label="Senha"
            required
            name="password"
            placeholder="Senha"
            ref={register({ required: true })}
            errors={getInputFieldError(errors.password)}
          />

          <InputField
            type="password"
            label="Confirmar senha"
            required
            name="confirmPassword"
            placeholder="Confirmar senha"
            ref={register({ required: true })}
            errors={getInputFieldError(errors.confirmPassword)}
          />

          <label className="privacy-terms-label">
            <input type="checkbox" name="privacyTerms" ref={register({ required: true })} />
            <span>Eu concordo com seus Termos, Condições e Política de Privacidade</span>
          </label>
          <button className="btn primary">Entrar</button>
        </form>
      </section>
    </>
  )
}

export default Register
