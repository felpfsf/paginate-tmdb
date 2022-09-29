import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../../App.css'


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  // Função para manipular o estado de enviar do formulario de busca
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(searchTerm)
    if (!searchTerm) return navigate('/')
    navigate(`search/?q=${searchTerm}`)
    setSearchTerm('')
  }
  return (
    <div className='search__container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pesquisa ativa</label>
          <input
            type="text"
            className='search__input'
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      </form>
    </div>
  )
}

export default Navbar