import React from 'react'
import SearchBox from '../../components/SearchBox/SearchBox';
import SelectedCity from './../../components/SelectedCity/SelectedCity';
import {  useSelector } from 'react-redux';
import './HomePage.scss'

export default function HomePage() {
    const isDark = useSelector(state => state.weatherReducer.isDark)
    return (
        <div className={`${(isDark) ? 'home-page' : null}`}>
            <SearchBox />
            <div className="container">
                <SelectedCity />
            </div>
        </div>
    )
}
