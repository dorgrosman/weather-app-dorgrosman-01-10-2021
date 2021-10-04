import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { changeUnits, changeDark } from './../../store/action/WeatherAction';
import logoImg from './../../assets/img/logo.png'
import Button from '@mui/material/Button';
import './Navbar.scss'

export default function Navbar() {
    const [navMobile, toggleNavMobile] = useState(false)
    const celsius = useSelector(state => state.weatherReducer.celsius)
    const isDark = useSelector(state => state.weatherReducer.isDark)
    const dispatch = useDispatch()
    const changeUnitsHandler = () => {
        dispatch(changeUnits())
    }
    const changeDarkModeHandler = () => {
        dispatch(changeDark())
    }
    return (
        <div className="main-navbar " style={{ backgroundColor: (isDark) ? '#d5e4f4' : null }}>
            <div className="logo">
                <Link to="/home" className="logo pointer"><img src={logoImg} alt="" onClick={() => toggleNavMobile(!navMobile)} /></Link>
            </div>
            <div></div>
            <div></div>
            <div className="nav-btn flex align-center">
                <Button className="celsius-btn" variant="outlined" onClick={changeUnitsHandler}>{celsius ? <span>Fahrenheit</span> : <span>Celsius</span>}</Button>
                <Button className="dark-btn" variant="outlined" onClick={changeDarkModeHandler}>{isDark ? <span>Dark Mode</span> : <span>Light Mode</span>}</Button>
            </div>
            <div className="hamburger-menu" >
                <a className={`${navMobile ? 'opened' : 'menu'}`} onClick={() => toggleNavMobile(!navMobile)} aria-label="Main Menu">
                    <svg width="60" height="60" viewBox="0 0 100 100" >
                        <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                        <path className="line line2" d="M 20,50 H 80" />
                        <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                    </svg>
                </a>
            </div>
            <div className={`${navMobile ? 'navBar' : 'hide'}`} style={{ display: navMobile && 'flex' }}>
                <div className="links ">
                    <Link className="link" to="/home" onClick={() => toggleNavMobile(!navMobile)}>Home</Link>
                    <Link className="link" to="/favorite" onClick={() => toggleNavMobile(!navMobile)}>Favorite</Link>
                </div>
            </div>
        </div>
    )
}

