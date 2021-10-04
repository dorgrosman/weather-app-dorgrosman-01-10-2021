import React from 'react'
import SearchBox from '../../components/SearchBox/SearchBox';
import SelectedCity from './../../components/SelectedCity/SelectedCity';
import './HomePage.scss'

export default function HomePage() {
    return (
        <div >
            <SearchBox />
            <div className="container">
                <SelectedCity />
            </div>
        </div>
    )
}
