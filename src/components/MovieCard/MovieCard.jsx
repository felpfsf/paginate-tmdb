import * as Dialog from '@radix-ui/react-dialog'

const API_KEY = import.meta.env.VITE_TMDB_KEY


const MovieCard = (props) => {
  const handleMovieClick = (id) => {
    // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    console.log(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    )
  }
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className='movie__card' onClick={() => handleMovieClick(props.id)}>
          <div className='movie__content'><p>{props.title}</p></div>
          <img src={`https://image.tmdb.org/t/p/original${props.poster}`} alt="" loading='lazy' />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='dialog__overlay' />
          <Dialog.Content className='dialog__content'>
            <Dialog.Title>{props.title}</Dialog.Title>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default MovieCard