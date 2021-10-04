import axios from 'axios'
export const SEARCH = 'SEARCH';
export const CURRENT_WEATHER_SELECTED = 'CURRENT_WEATHER_SELECTED';
export const WEEKLY_FORECAST_SELECTED = 'WEEKLY_FORECAST_SELECTED';
export const SET_FAVORITE_CITY = 'SET_FAVORITE_CITY';
export const SET_CHANGE_UNITS = 'SET_CHANGE_UNITS';
export const SET_AUTO_COMPETE = 'SET_AUTO_COMPETE';
export const SET_CHANGE_DARK_MODE = 'SET_CHANGE_DARK_MODE';
export const REMOVE_FAVORITE_CITY = 'REMOVE_FAVORITE_CITY';

// const API_KEY = "6U05H9fOxamHp9EWCvU4NBGEpsRlyExj"
const API_KEY = "xnlsQEvyXLSiXXHKhNiOfTEJF42HA0rr"

export function searchCity(cityName) {
    return async (dispatch) => {
        const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${cityName}`)
        let data = res.data
        if (data.length === 0) {
            return
        } else {
            const city = data[0];
            dispatch({ type: SEARCH, payload: city })
        }
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





