import React, { useEffect, useState } from 'react'
import AuthedTitle from '../../components/AuthedTitle'
import InputField from '../../components/Forms/InputField'
import { api } from '../../service/api'
import './categories.css'

interface Categories {
  id: number
  name: string
  color: string
}

function Categories() {
  const [categories, setCategories] = useState<Categories[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    let mount = true

    async function fetchData() {
      const response = await api.get('/categories')

      mount && setCategories(response.data)
    }

    fetchData()

    return () => { mount = false }
  }, [])

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

        <form className={`categories-form ${isFormOpen ? 'open' : ''}`}>
          <InputField
            className="name-input"
            label="Nome"
            required
          />
          <input type="color" />
        </form>

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
