import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
// import bootstrap from 'bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import MovieType from '../components/headingTitle'
import 'bootstrap/dist/css/bootstrap.min.css'
import Search from '../components/search'
import 'bootstrap-icons/font/bootstrap-icons.css'

const AllMovies = () => {
  const [opacity, setOpacity] = useState(0)
  const [zIndex, setzIndex] = useState(0)
  const [recommended, setRecommended] = useState([])
  const [searchString, setSearchString] = useState('')
  const [allMovies, setAllMovies] = useState([])

  const getAllMovies = () => {
    axios({
        url: '/movies',
        method: 'get',
        baseURL: 'https://powerful-garden-94854.herokuapp.com',
        params: {
          _limit: 25
      }}).then((response) => {
        //setAllMovies(response.data)
        console.log(response.data)
      })
    }

  const setMenuOpacity = (event) => {
    if (opacity == 1) {
      setOpacity(0)
      setzIndex(0)
    }else if(opacity == 0){
      setOpacity(1)
      setzIndex(2)
    }
  }

  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <>
      <header>
      <div>
        <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
      </div>
        <div className='head-button-container d-flex align-items-center'>
          <button className="signup">Sign Up</button>
          <button className="login">Log In</button>
          <Link to="/profile"><i class="bi bi-person user"></i></Link>
          <svg onClick={setMenuOpacity} className="nav-list"  xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-search drop dropdown-toggle" id="navbarDropdown" role="button" viewBox="0 0 16 16" data-toggle="dropdown">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          </div>
        </header>
        <h1 className="movie-heading">All Movies</h1>
        <div className="container d-flex flex-wrap">
          {allMovies.map((movie) => {
          return (
            <div key={movie.id} className="movie-index">
              
              <div className ='overlay d-flex flex-row align-items-start justify-content-between'>
                <div>
                  <p className='movie-title text-left'>{movie.title}</p>
                  <p className="year">{movie.year}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    <i className="bi bi-heart-fill heart-icon"></i>
                    <i className="bi bi-plus-circle-fill plus-icon"></i>
                    <i className="bi bi-check-circle-fill check-icon"></i>
                  </div>
                </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AllMovies