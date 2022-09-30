import axios from "axios"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import MovieCard from "../MovieCard/MovieCard"

const API_KEY = import.meta.env.VITE_TMDB_KEY



const Movies = () => {
  // States
  const [movies, setMovies] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${pageNumber}&include_adult=false`

  // API
  useEffect(() => {
    axios
      .get(API_URL)
      .then(res => { setMovies(res.data) })
      .catch(error => console.log(error))
  }, [pageNumber])

  const changePage = ({ selected }) => {
    setPageNumber(selected + 1)
  }

  const handleMovieClick = (id) => {
    // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    console.log(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    )
  }

  return (
    <div>
      <ReactPaginate
        pageCount={Number(movies.total_pages)}
        onPageChange={changePage}
        containerClassName='paginate__container'
        activeClassName='paginate__active'
        pageClassName='paginate__page'
      />
      {/* Modal ChakraUI */}

      {/* movies grid */}
      <div className='movies__grid'>
        {/* movies card */}
        {movies.results?.map(movie => (
          // <div key={movie.id} className='movie__card' onClick={() => handleMovieClick(movie.id)}>
          //   <div className='movie__content'><p>{movie.title}</p></div>
          //   <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt="" loading='lazy' />
          // </div >
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie?.backdrop_path}
          />
        ))}
      </div >
    </div >
  )
}

export default Movies