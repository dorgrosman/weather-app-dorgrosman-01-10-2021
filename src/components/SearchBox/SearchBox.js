import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchCity, searchCityByKey, weeklyForecast5Days } from '../../store/action/WeatherAction';
import { matchCity } from '../../store/action/WeatherAction';
import './SearchBox.scss'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function SearchBox() {
    const dispatch = useDispatch();
    const [key, setKey] = useState('');
    const cityKey = useSelector(state => state.weatherReducer.selectedCityKey);
    const autocomplete = useSelector(state => state.weatherReducer.autocomplete);
    
    useEffect(() => {
        dispatch(matchCity(cityKey))
        dispatch(weeklyForecast5Days(cityKey))
        }, [dispatch, cityKey])

    const searchBox = (event) => {
        dispatch(searchCity(event))
    }
    const sentToSearch = (event) => {
        event.preventDefault()
        dispatch(searchCity(event))
        dispatch(searchCityByKey(key))
        dispatch(matchCity(key))
        dispatch(weeklyForecast5Days(key))
    }
    return (
        <div className="SearchInput">
            <div className="searchBox flex align-center justify-center">
                <div>
                    <TextField className="TextField"  id="outlined-basic" label="Search City Name" variant="outlined" onChange={event => searchBox(event.target.value)} />
                </div>
                <div className="box">
                    <select onClick={event => setKey(event.target.value)} >
                        {autocomplete.map(city =>
                            <option key={city.Key} value={city.Key} >{city.LocalizedName} </option>
                        )}
                    </select>
                </div>
                <div>
                    <Button className="search-btn" variant="outlined"  onClick={sentToSearch} >Search</Button>
                </div>
            </div>
        </div >
    )
}
