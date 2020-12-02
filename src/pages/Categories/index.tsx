import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthedTitle from '../../components/AuthedTitle'
import InputField from '../../components/Forms/InputField'
import { useAuth } from '../../context/auth'
import { api } from '../../service/api'
import { getInputFieldError } from '../../utils'
import './categories.css'

interface Categories {
  id: number
  name: string
  color: string
}

function Categories() {
  const { user } = useAuth()
  const { register, handleSubmit, errors } = useForm<Categories>()
  const [categories, setCategories] = useState<Categories[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [color, setColor] = useState('#000000')

  useEffect(() => {
    let mount = true

    async function fetchData() {
      const response = await api.get('/categories')

      mount && setCategories(response.data)
    }

    fetchData()

    return () => { mount = false }
  }, [])

  async function onSubmitForm(data: Categories) {
    try {
      const response = await api.post('/categories', {
        ...data,
        user: user.id
      })

      if(response.ok) {
        setCategories(prev => [...prev, response.data])
        setIsFormOpen(false)
      }
    } catch(catchedError) {
      console.log(catchedError.message)
    }
  }

  return (
    <section className="categories-container">
      <AuthedTitle />

      <h3 className="categories-title">
        Categorias
      </h3>

      <div className="categories-content">
        <button
          className="btn primary"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          + Categoria
        </button>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className={`categories-form ${isFormOpen ? 'open' : ''}`}
        >
          <div>
            <label className="color-input-container">
              <span>Cor</span>
              <input
                type="text"
                value={color}
                onChange={e => setColor(e.target.value)}
              />
              <label
                style={{ backgroundColor: color }}
                className="color-input"
              >
                <input
                  type="color"
                  name="color"
                  onChange={(e) => setColor(e.target.value)}
                  ref={register()}
                />
              </label>  
            </label>          
            <InputField
              className="name-input"
              label="Nome"
              name="name"
              required
              ref={register({ required: true })}
              errors={getInputFieldError(errors.name)}
            />
          </div>

          <div className="categories-form-actions">
            <button className="btn save">
              Salvar
            </button>
            <button className="btn" onClick={e => {
              e.preventDefault()
              setIsFormOpen(false)
            }}>
              Cancelar
            </button>
          </div>
        </form>

        {categories.length && (
          categories.map(category => {
            return (
              <div
                className="category-display"
                key={category.id}
              >
                <div style={{ backgroundColor: category.color }}></div>
                <span>{category.name}</span>
              </div>
            )
          })
        )}

        {!categories.length && (
          <div className="no-categories">
            Não há categorias cadastradas
          </div>
        )}
      </div>
    </section>
  )
}

export default Categories
