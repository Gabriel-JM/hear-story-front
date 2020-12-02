import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthedTitle from '../../components/AuthedTitle'
import InputField from '../../components/Forms/InputField'
import { useAuth } from '../../context/auth'
import { api } from '../../service/api'
import { getInputFieldError } from '../../utils'
import './categories.css'

export interface Categories {
  id: number
  name: string
  color: string
}

function Categories() {
  const { user } = useAuth()
  const formRef = useRef<HTMLFormElement>(
    document.querySelector('.categories-form') as HTMLFormElement
  )
  const { register, handleSubmit, errors } = useForm<Categories>()
  const [currentId, setCurrentId] = useState<number | null>(null)
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

  async function onSubmitForm(formData: Categories) {
    try {
      const data = {
        ...formData,
        id: currentId,
        user: user.id
      }

      const response = currentId
        ? ( await api.put(`/categories/${currentId}`, data) )
        : ( await api.post('/categories', data) )

      if(response.ok) {
        !currentId
          ? setCategories(prev => [...prev, response.data])
          : setCategories(prev => {
            const item = prev.find(item => item.id === currentId)
            Object.assign(item, data)
            return prev
          })
        setIsFormOpen(false)
      }
    } catch(catchedError) {
      console.log(catchedError.message)
    }
  }

  function setDataForEdit(category: Categories) {
    setCurrentId(category.id)
    setIsFormOpen(true)
    const form = formRef.current as HTMLFormElement
    (form
      .querySelector('input[name=name]') as HTMLInputElement
    ).value = category.name
    form.color.value = category.color
    setColor(category.color)
  }

  async function removeItem(id: number) {
    try {
      const response = await api.delete(`/categories/${id}`)

      if(response.ok && response.data.success) {
        setCategories(prev => {
          return prev.filter(item => item.id !== id)
        })
        console.log(response.data.message)
      } else {
        console.log(response.data)
      }
    } catch(catchedError) {
      console.log(catchedError.message)
    }
  }

  function resetForm() {
    formRef.current.color.value = '#000000'
    setColor('#000000')
    const nameInput = formRef.current.querySelector('input[name=name]') as HTMLInputElement
    nameInput.value = ''
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
          onClick={() => {
            setCurrentId(null)
            setIsFormOpen(!isFormOpen)
            resetForm()
          }}
        >
          + Categoria
        </button>

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmitForm)}
          className={`categories-form ${isFormOpen ? 'open' : ''}`}
        >
          <div>          
            <InputField
              className="name-input"
              label="Nome"
              name="name"
              required
              ref={register({ required: true })}
              errors={getInputFieldError(errors.name)}
            />
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
          </div>

          <div className="categories-form-actions">
            <button className="btn save">
              Salvar
            </button>
            <button className="btn" onClick={e => {
              e.preventDefault()
              setCurrentId(null)
              setIsFormOpen(false)
            }}>
              Cancelar
            </button>
          </div>
        </form>

        {categories.length ? (
          categories.map(category => {
            return (
              <div
                className="category-display"
                key={category.id}
              >
                <div className="category-info">
                  <div
                    className="color-square"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span>{category.name}</span>
                </div>

                <div className="category-actions">
                  <button
                    onClick={() => setDataForEdit(category)}
                  >&#9998;</button>
                  <button onClick={() => removeItem(category.id)}>
                    &#10006;
                  </button>
                </div>
              </div>
            )
          })
        ) : null}

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
