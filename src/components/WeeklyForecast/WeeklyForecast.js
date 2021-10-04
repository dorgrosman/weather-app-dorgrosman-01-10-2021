import React from 'react'
import './WeeklyForecast.scss'
import { useSelector } from 'react-redux';
import Moment from "react-moment";

export default function WeeklyForecast(props) {
    const weeklyForecast = props.weeklyForecast
    const celsius = useSelector(state => state.weatherReducer.celsius)
    return (
        <div>
            {(weeklyForecast.length !== 0) ? (
                <ul className="container-weekly-card flex ">
                    {weeklyForecast.map(day =>
                        <li className="weekly-card " key={day._id}>
                            {celsius ? <section className="content">
                            <h1><Moment format="ddd">{day.Date}</Moment></h1>
                              <img
                                    className="small-image"
                                    src={`https://developer.accuweather.com/sites/default/files/${day.Day.Icon >= 10 ? day.Day.Icon : "0" + day.Day.Icon
                                        }-s.png`}
                                    alt="weather-icon"
                                />
                                <h2>{parseFloat(((day.Temperature.Maximum.Value - 32) / 1.8)).toFixed(0)} &deg;C </h2>
                                <h3>{day.Day.IconPhrase}</h3>
                                <div className="details">
                                    <div>
                                        <p className="value">{parseFloat(((day.Temperature.Maximum.Value - 32) / 1.8)).toFixed(0)} &deg;C</p>
                                        <p className="label">Maximum</p>
                                    </div>
                                    <div>
                                        <p className="value">{parseFloat(((day.Temperature.Minimum.Value - 32) / 1.8)).toFixed(0)} &deg;C</p>
                                        <p className="label">Minimum</p>
                                    </div>
                                </div>
                            </section> : (<section className="content">
                               
                            <h1><Moment format="ddd">{day.Date}</Moment></h1>
                              <img
                                    className="small-image"
                                    src={`https://developer.accuweather.com/sites/default/files/${day.Day.Icon >= 10 ? day.Day.Icon : "0" + day.Day.Icon
                                        }-s.png`}
                                    alt="weather-icon"
                                />
                                <h2>{day.Temperature.Maximum.Value} &deg;F</h2>
                                <h3>{day.Day.IconPhrase}</h3>
                                <div className="details">
                                    <div>
                                        <p className="value">{day.Temperature.Minimum.Value} &deg;F</p>
                                        <p className="label">Minimum</p>
                                    </div>
                                    <div>
                                        <p className="value">{day.Temperature.Maximum.Value} &deg;F</p>
                                        <p className="label">Maximum</p>
                                    </div>
                                </div>
                            </section>)}
                        </li>
                    )}
                </ul>
            ) : null}
        </div>
    )
}
