import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WeeklyForecast from './../WeeklyForecast/WeeklyForecast';
import { FavCity, matchCity, weeklyForecast5Days } from './../../store/action/WeatherAction';
import Moment from "react-moment";
import './SelectedCity.scss';

export default function SelectedCity() {
    const selectedCity = useSelector(state => state.weatherReducer.selectedCity)
    const currentDataDay = useSelector(state => state.weatherReducer.currentDataDay)
    const weeklyForecast = useSelector(state => state.weatherReducer.weeklyForecast)
    const isFav = useSelector(state => state.weatherReducer.isFav)
    const celsius = useSelector(state => state.weatherReducer.celsius)
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedCity) {
            dispatch(matchCity(selectedCity.Key))
            dispatch(weeklyForecast5Days(selectedCity.Key))
        }
    }, [dispatch,selectedCity])

    const toggleFavHandler = (() => {
        dispatch(FavCity(selectedCity._id))
    })

    return (
        <div>
            {weeklyForecast[0] ?
            <div >
                {(selectedCity && currentDataDay ) ? (
                    < div >
                        <div className="card flex space-between align-center">
                            <div className="name-day-degree">
                                <h2>{selectedCity.AdministrativeArea.LocalizedName}</h2>
                                <h2><Moment format="ddd">{currentDataDay.LocalObservationDateTime}</Moment></h2>
                                {celsius ? <h1>{currentDataDay.Temperature.Metric.Value} &deg;C</h1> : <h1>{parseFloat((currentDataDay.Temperature.Metric.Value * 1.8) + 32).toFixed(0)} &deg;F</h1>}
                            </div>
                            <div className="day-night flex column align-center">
                                <h1>Day</h1>
                                {celsius ? <h3>{parseFloat((weeklyForecast[0].Temperature.Maximum.Value - 32) / 1.8).toFixed(0)} &deg;C </h3> : <h3>{weeklyForecast[0].Temperature.Maximum.Value} &deg;F</h3>}
                                <img
                                    className="main-icon"
                                    src={`https://developer.accuweather.com/sites/default/files/${weeklyForecast[0].Day.Icon >= 10 ? weeklyForecast[0].Day.Icon : "0" + weeklyForecast[0].Day.Icon
                                        }-s.png`}
                                    alt="weather-icon"
                                />
                                <p>{weeklyForecast[0].Day.IconPhrase}</p>
                            </div>
                            <div className="day-night flex column align-center">
                                <h1>Night</h1>
                                {celsius ? <h3>{parseFloat((weeklyForecast[0].Temperature.Minimum.Value - 32) / 1.8).toFixed(0)} &deg;C </h3> : <h3>{weeklyForecast[0].Temperature.Minimum.Value} &deg;F</h3>}
                                <img
                                    className="main-icon"
                                    src={`https://developer.accuweather.com/sites/default/files/${weeklyForecast[0].Night.Icon >= 10 ? weeklyForecast[0].Night.Icon : "0" + weeklyForecast[0].Day.Night
                                        }-s.png`}
                                    alt="weather-icon"
                                />
                                <p>{weeklyForecast[0].Night.IconPhrase}</p>
                            </div>
                            <div className=" flex align-center">
                                <a onClick={toggleFavHandler} >
                                    <i className={`fav-btn ${(isFav) ? 'fas fa-heart' : 'far fa-heart'}`}></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <WeeklyForecast weeklyForecast={weeklyForecast} />
                        </div>
                    </div>)
                    : null
                }
            </div>
            :null}
        </div >
    )
}
