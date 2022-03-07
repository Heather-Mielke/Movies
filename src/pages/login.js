import {useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { propTypes } from 'react-bootstrap/esm/Image'


const Login = () => {
    //global context 
    const { setAuth } = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const [toggleLogout, setToggleLogout] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)

    const [opacity, setOpacity] = useState(0)
    const [zIndex, setzIndex] = useState(0)



    const handleLogin = (event) => {
        event.preventDefault()
        axios({
            method: 'put',
            url: '/users/login',
            baseURL: 'http://localhost:3003',
            data: {
                username,
                password
            }
        })
        .then((response) => {
            if (response.data.username) {
                console.log(response)
                setCurrentUser(response.data)
                setAuth({username, password})
                setUsername('')
                setPassword('')
                setLoggedIn(true)
            } else {
                setErrorMessage(response.data)
                setToggleError(true)
            }
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

    return (
        <>
            <header>
                <div>
                    <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
                </div>
                <div className='head-button-container d-flex align-items-center'>
                    <Link to="/newaccount">Sign Up</Link>
                    <svg onClick={setMenuOpacity} className="nav-list"  xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-search drop dropdown-toggle" id="navbarDropdown" role="button" viewBox="0 0 16 16" data-toggle="dropdown">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
            </header>
            <div style={{opacity, zIndex}} className="d-flex flex-column  align-items-end nav-list">
                <Link to="/movies">All Movies</Link>
                <h2>Search By Genre</h2>
                <Link to="/action">Action</Link>
                <Link to="/adventure">Adventure</Link>
                <Link to="/comedy">Comedy</Link>
                <Link to="/documentary">Documentary</Link>
                <Link to="/drama">Drama</Link>
                <Link to="/family">Family</Link>
                <Link to="/fantasy">Fantasy</Link>
                <Link to="/horror">Horror</Link>
                <Link to="/romance">Romance</Link>
                <Link to="/thriller">Thriller</Link>
            </div>
            <>
                {loggedIn ? (
                    <section>
                        <h1>You are logged in!</h1>
                        <br/>
                        <p>
                            <a href="#">Go to Home</a>
                        </p>
                    </section>
                ) : (
                <section className="formContainer">
                    <h1 className='form-title'>Login</h1>
                    <form onSubmit={handleLogin} className="inputForm">
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            id="username"
                            className="text-input" 
                            onChange={(event) => {setUsername(event.target.value)}}
                            value={username}
                            required
                        />
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password" 
                            className="text-input" 
                            onChange={(event) => {setPassword(event.target.value)}}
                            value={password}
                            required
                        />

                        {toggleError ?
                        <h5 className="error-msg">{errorMessage}</h5>
                        :
                        null
                        }

                        <input type="submit" value="Login" className="submit-btn"/>    
                    </form>
                </section>
                )}
            </>
        </>
    )




}

export default Login