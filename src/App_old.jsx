import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams, useNavigate, Outlet } from 'react-router-dom'
import './App.css'


const API_KEY = import.meta.env.VITE_TMDB_KEY

function App() {

  // States
  const [movies, setMovies] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  // forma simples de busca, mas fica limitado apenas na página
  const [searchTerm, setSearchTerm] = useState('')
  const [searchValue, setSearchValue] = useState('')

  // A API tem um query especifico para busca, utilizando o react-router-dom para pegar o parametro 'q' e utiliza-lo na url
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  // const pageItems = movies.results?.slice(0, 20)
  // console.log(pageNumber)

  // API URLs
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}&include_adult=false`
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&language=en-US&page=${pageNumber}&include_adult=false&query=${query}`

  // SEARCH  
  // useEffect(() => {
  //   axios
  //     .get(SEARCH_URL)
  //     .then(res => { setMovies(res.data) })
  //     .catch(error => console.log(error))
  // }, [query, pageNumber])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(searchTerm)
    if (!searchTerm) return navigate('');
    navigate(`/search/?q=${searchTerm}`)
    searchTerm('')
  }

  // API
  useEffect(() => {
    axios
      .get(API_URL)
      .then(res => { setMovies(res.data) })
      .catch(error => console.log(error))
  }, [pageNumber])

  // console.log(pageItems)

  const changePage = ({ selected }) => {
    setPageNumber(selected + 1)
    console.log(selected, pageNumber)
  }

  // const filteredMovies = useMemo(() => {
  //   if (searchTerm.length > 0) {
  //     return
  //   } else if (searchTerm.length > 0) {
  //     return movies.results?.filter(({ title }) =>
  //       title.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   }
  //   return movies.results
  // }, [searchTerm, movies])

  // console.log(filteredMovies)

  return (
    <div className="App">
      <div className="search__container">
        {/* <div>
          <label>Pesquisa com uso de botão</label>
          <input type="text" className="search__input" />
        </div> */}
        {/* <div>
          <form action="" onSubmit={handleSubmit}>
            <label>Pesquisa ativa</label>
            <input type="text" className="search__input" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
          </form>
        </div> */}
      </div>
      <Outlet />
      <ReactPaginate
        pageCount={movies.total_pages}
        onPageChange={changePage}
        containerClassName='paginate__container'
        activeClassName='paginate__active'
        pageClassName='paginate__page'
      />
      {/* movies grid */}
      <div className='movies__grid'>
        {/* movies card */}
        {movies.results?.map(movie => (
          <div key={movie.id} className='movie__card'>
            <div className='movie__content'><p>{movie.title}</p></div>
            <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt="" loading='lazy' />
          </div >
        ))
        }
        {/* {
          filteredMovies ?

            filteredMovies?.map(movie => (
              <div key={movie.id} className='movie__card'>
                <div className='movie__content'><p>{movie.title}</p></div>
                <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt="" loading='lazy' />
              </div>
            ))
            :
            <h4>Filme não encontrado</h4>
        } */}
      </div >
    </div >
  )
}

export default App
