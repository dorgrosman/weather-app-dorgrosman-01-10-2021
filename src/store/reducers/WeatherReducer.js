
import { CURRENT_WEATHER_SELECTED, SET_CHANGE_UNITS, SET_FAVORITE_CITY, WEEKLY_FORECAST_SELECTED, SET_CHANGE_DARK_MODE, REMOVE_FAVORITE_CITY, SET_AUTO_COMPETE, SELECTED_CITY } from './../action/WeatherAction';


const initialState = {
    selectedCity: {
        _id: '11234',
        AdministrativeArea: { LocalizedName: "Tel Aviv" },
        Key: '215854',
        cityIsFav: false
    },
    selectedCityKey: '215854',
    currentDataDay: null,
    favCities: [],
    autocomplete: [{
        _id: '11234',
        LocalizedName: "Tel Aviv",
        Key: '215854',
        cityIsFav: false
    }],
    weeklyForecast: [],
    celsius: false,
    isFav: false,
    isDark: false,
};

const WeatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_CITY:
            const citySelected = action.payload
            if (!citySelected._id) {
                citySelected._id = makeId()
            }
            const selectedFav = state.favCities.findIndex(p => p.Key === citySelected.Key)
            if (selectedFav !== -1) {
                citySelected.cityIsFav = true
                state.isFav = true
            } else {
                citySelected.cityIsFav = false
                state.isFav = false
            }
            return { ...state, selectedCity: citySelected, selectedCityKey: citySelected.Key }
        case SET_AUTO_COMPETE:
            const locations = action.payload;
            const cityAutoComplete = []
            for (let location of locations) {
                let LocalizedName = location.LocalizedName;
                let _id = makeId();
                let Key = location.Key;
                cityAutoComplete.push({ _id, LocalizedName, Key });
            }
            return { ...state, autocomplete: cityAutoComplete }
        case CURRENT_WEATHER_SELECTED:
            const currentDataDay = action.payload
            return { ...state, currentDataDay: currentDataDay }
        case WEEKLY_FORECAST_SELECTED:
            const currentData5Days = action.payload
            currentData5Days.map(day => {
                return day._id = makeId()
            }
            )
            return { ...state, weeklyForecast: currentData5Days }
        case SET_FAVORITE_CITY:
            state.weeklyForecast.map(day => {
                state.selectedCity.Icon = day.Day.Icon;
                return state.selectedCity.Icon
            })
            state.selectedCity.Temperature = state.weeklyForecast[0].Temperature.Maximum.Value
            if (state.selectedCity.cityIsFav) {
                const updatedFavCities = state.favCities.filter(p => p._id !== action.cityId)
                state.selectedCity.cityIsFav = false;
                state.isFav = false;
                return { ...state, favCities: updatedFavCities }
            } else {
                state.favCities.push(state.selectedCity)
                state.selectedCity.cityIsFav = true;
                state.isFav = true;
                return { ...state, favCities: state.favCities.concat() }
            }
        case REMOVE_FAVORITE_CITY:
            const cityId = action.cityId
            const updatedRemoveFavCities = state.favCities.filter(p => p._id !== cityId)
            state.selectedCity.cityIsFav = false;
            state.isFav = false;
            return { ...state, favCities: updatedRemoveFavCities }
        case SET_CHANGE_UNITS:
            state.celsius = !state.celsius
            return { ...state, celsius: state.celsius }
        case SET_CHANGE_DARK_MODE:
            state.isDark = !state.isDark
            return { ...state, isDark: state.isDark }
        default:
            return state;
    }
}

function makeId(length = 5) {
    var txt = '';
    var possible = '1234567890';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
export default WeatherReducer