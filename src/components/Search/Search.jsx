import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ReactPaginate from "react-paginate"
import '../../App.css'
import axios from 'axios'


const API_KEY = import.meta.env.VITE_TMDB_KEY


const Search = () => {

  const [movies, setMovies] = useState([])

  const [pageNumber, setPageNumber] = useState(1)

  // Query Params para o resultado de busca
  const [searchParams] = useSearchParams()
  const queryParam = searchParams.get('q')

  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&language=en-US&page=${pageNumber}&include_adult=false&query=${queryParam}`

  useEffect(() => {
    axios.get(SEARCH_URL).then(res => { setMovies(res.data) })
  }, [queryParam, pageNumber])

  const changePage = ({ selected }) => {
    setPageNumber(selected + 1)
  }

  return (
    <div>
      <Link to={'/'}>Voltar</Link>

      <h2>Resultados de filmes para "{queryParam}"</h2>
      <ReactPaginate
        pageCount={movies.total_pages}
        onPageChange={changePage}
        containerClassName='paginate__container'
        activeClassName='paginate__active'
      />
      {/* movies grid */}
      <div className='movies__grid'>
        {/* movies card */}
        {movies.results?.length === 0 && <p>Filme não encontrado</p>}
        {movies.results?.map(movie => (
          <div key={movie.id} className='movie__card'>
            <div className='movie__content'><p>{movie.title}</p></div>
            <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}` : 'https://placekitten.com/300/400'} alt="" loading='lazy' />
          </div >
        ))}
      </div >
    </div>
  )
}

export default Search