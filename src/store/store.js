import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import WeatherReducer from './reducers/WeatherReducer';

const rootReducer = combineReducers({
    weatherReducer: WeatherReducer,
  })
  const store = createStore(rootReducer ,applyMiddleware(thunk))
  
  export default store;