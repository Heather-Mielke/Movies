const MoviesByGenre = (props) => {
    return(
        props.moviesByGenre.map((movie) => {
            let img = movie.poster_path
            let full = 'http://image.tmdb.org/t/p/w200' + img;
            return(
                <div key={movie.id} className="image-container d-flex justify-content-start m-3 col">
                    <img src= {full}/>
                    <div className ='overlay d-flex flex-row align-items-start justify-content-between'>
                    <div>
                      <p className='movie-title text-left'>{movie.title}</p>
                      <p className="year">{movie.release_date.substring(0,4)}</p>
                      </div>
                      <div className="d-flex flex-column justify-content-around">
                        <i class="bi bi-heart-fill heart-icon"></i>
                        <i class="bi bi-plus-circle-fill plus-icon"></i>
                        <i class="bi bi-check-circle-fill check-icon"></i>
                      </div>
                    </div>
                </div>
            )
        })
    )
}

export default MoviesByGenre