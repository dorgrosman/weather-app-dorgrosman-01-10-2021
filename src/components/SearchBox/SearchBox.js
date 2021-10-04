import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchCity, weeklyForecast5Days } from '../../store/action/WeatherAction';
import { matchCity } from '../../store/action/WeatherAction';
import Button from '@mui/material/Button';
import './SearchBox.scss'

export default function SearchBox() {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const cityKey = useSelector(state => state.weatherReducer.selectedCityKey);

    useEffect(() => {
   
        dispatch(matchCity(cityKey))
        dispatch(weeklyForecast5Days(cityKey))
    }, [dispatch, cityKey])

    const searchBox = (event) => {
        event.preventDefault();
        dispatch(searchCity(city))
        dispatch(matchCity(cityKey))
        dispatch(weeklyForecast5Days(cityKey))
    }
    return (
        <div className="SearchInput">
            <form className="form flex  auto-center" onSubmit={searchBox}>
                <div>
                    <label htmlFor="inp" className="inp flex align-center">
                        <input className="input-placeholder" type="text" id="inp" placeholder="&nbsp;" onChange={event => { setCity(event.target.value) }} />
                        <span className="label">Enter City Name</span>
                        <span className="focus-bg"></span>
                    </label>
                </div>
                <div>
                    <Button type="submit"> <i className="search-btn fa fa-search"></i></Button>
                </div>
            </form>
        </div >
    )
}
