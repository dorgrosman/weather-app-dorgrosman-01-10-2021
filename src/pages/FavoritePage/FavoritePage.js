import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { matchCity, weeklyForecast5Days, searchCity, removeFavCity } from './../../store/action/WeatherAction';
import './FavoritePage.scss'

export default function FavoritePage() {
    const favCities = useSelector(state => state.weatherReducer.favCities)
    const celsius = useSelector(state => state.weatherReducer.celsius);
    const isDark = useSelector(state => state.weatherReducer.isDark)
    const dispatch = useDispatch();

    const goToDetails = ((city) => {
        dispatch(searchCity(city.AdministrativeArea.LocalizedName))
        dispatch(matchCity(city.Key))
        dispatch(weeklyForecast5Days(city.Key))
    })
    const toggleFavHandler = ((cityId) => {
        dispatch(removeFavCity(cityId))
    })
    return (
        <div id="fav-details">
            {favCities ?
                <div>
                    <ul className={`${(isDark) ? 'fav-page' : null}  flex wrap justify-center`} >
                        {favCities.map(city =>
                            <li className="weekly-card" key={city._id}>
                                <div className="fav-card flex column align-center space-around">
                                    <div>
                                        <h2>{city.AdministrativeArea.LocalizedName}</h2>
                                    </div>
                                    <div>
                                        <img
                                            className="medium-image"
                                            src={`https://developer.accuweather.com/sites/default/files/${city.Icon >= 10 ? city.Icon : "0" + city.Icon
                                                }-s.png`}
                                            alt="weather-icon"
                                        />
                                    </div>
                                    <div >
                                        {celsius ? <h2>{parseFloat((city.Temperature - 32) / 1.8).toFixed(0)} &deg;C</h2> : <h2>{city.Temperature} &deg;F</h2>}
                                    </div>
                                    <div className="favs-card-btns flex column align-center">
                                        <Link to="/home" onClick={() => goToDetails(city)}>More Details</Link>
                                        <a onClick={() => toggleFavHandler(city._id)} href="#fav-details">
                                            <i className='fas fa-heart'></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                : null
            }
        </div >
    )
}
