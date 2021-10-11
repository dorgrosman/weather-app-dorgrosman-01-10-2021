import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchCity, searchCityByKey } from '../../store/action/WeatherAction';
import { matchCity } from '../../store/action/WeatherAction';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './SearchBox.scss'

export default function SearchBox() {
    const dispatch = useDispatch();
    const [key, setKey] = useState('');
    const cityKey = useSelector(state => state.weatherReducer.selectedCityKey);
    const autocomplete = useSelector(state => state.weatherReducer.autocomplete);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        dispatch(matchCity(cityKey))
    }, [dispatch, cityKey])

    const searchBox = (event) => {
        dispatch(searchCity(event))
        setInputValue(event)
    }
    const sentToSearch = (event) => {
        event.preventDefault()
        dispatch(searchCityByKey(key))
        dispatch(matchCity(key))
        setInputValue("")
    }
    return (
        <div className="">
            <div className="searchBox  align-center justify-center">
                <div className="searchInput grid-container ">
                    <div className="textField">
                        <TextField value={inputValue} className="TextField" id="outlined-basic" label="Search City Name" variant="outlined" onChange={event => searchBox(event.target.value)} />
                    </div>
                    <div className="box">
                        <select onClick={event => setKey(event.target.value)} >
                            {autocomplete.map(city =>
                                <option key={city.Key} value={city.Key} >{city.LocalizedName}, {city.countryId}</option>
                            )}
                        </select>
                    </div>
                    <div className="button">
                        <Button className="search-btn" variant="outlined" onClick={sentToSearch} >Search</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}
