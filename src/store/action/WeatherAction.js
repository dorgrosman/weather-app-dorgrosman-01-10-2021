import axios from 'axios'
export const CURRENT_WEATHER_SELECTED = 'CURRENT_WEATHER_SELECTED';
export const WEEKLY_FORECAST_SELECTED = 'WEEKLY_FORECAST_SELECTED';
export const SET_FAVORITE_CITY = 'SET_FAVORITE_CITY';
export const SET_CHANGE_UNITS = 'SET_CHANGE_UNITS';
export const SET_AUTO_COMPETE = 'SET_AUTO_COMPETE';
export const SET_CHANGE_DARK_MODE = 'SET_CHANGE_DARK_MODE';
export const REMOVE_FAVORITE_CITY = 'REMOVE_FAVORITE_CITY';
export const SELECTED_CITY = 'SELECTED_CITY';

const API_KEY = "6U05H9fOxamHp9EWCvU4NBGEpsRlyExj"

export function searchCity(value) {
    return async (dispatch) => {
        const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`)
        let data = res.data
        
        dispatch({ type: SET_AUTO_COMPETE, payload: data })
    }
}
export function searchCityByKey(cityKey) {
    return async (dispatch) => {
        const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/${cityKey}?apikey=${API_KEY}`)
        let data = res.data
        dispatch({ type: SELECTED_CITY, payload: data })
    }
}

export function matchCity(cityKey) {
    return async (dispatch) => {
        const res = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`)
        const currentData = res.data;
        currentData.map(current => {
            return dispatch({ type: CURRENT_WEATHER_SELECTED, payload: current })

        })
    }
}
export function weeklyForecast5Days(cityKey) {
    return async (dispatch) => {
        const res = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}`)
        let currentData5Days = res.data.DailyForecasts
        dispatch({ type: WEEKLY_FORECAST_SELECTED, payload: currentData5Days })
    }
}
export function changeUnits(dispatch) {
    return async (dispatch) => {
        dispatch({ type: SET_CHANGE_UNITS })
    }
}
export function changeDark(dispatch) {
    return async (dispatch) => {
        dispatch({ type: SET_CHANGE_DARK_MODE })
    }
}
export function FavCity(id) {
    return async (dispatch) => {
        dispatch({ type: SET_FAVORITE_CITY, cityId: id})
    }
}
export function removeFavCity(id) {
    return async (dispatch) => {
        dispatch({ type: REMOVE_FAVORITE_CITY, cityId: id})
    }
}





