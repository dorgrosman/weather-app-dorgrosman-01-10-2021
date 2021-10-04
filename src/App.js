import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'
import { useSelector } from 'react-redux'
import FavoritePage from './pages/FavoritePage/FavoritePage';
import './assets/scss/global.scss';
import './App.css';

function App() {
  const isDark = useSelector(state => state.weatherReducer.isDark)
  return (
    <Router >
      <div className={`${isDark?'App':null} `} >
      <Navbar />
      <div className="main-page container flex space-around" >
        <Route path='/home' component={HomePage} />
        <Redirect from='/' to="/home" />
        <Route path='/favorite' component={FavoritePage} />
      </div>
    </div>
      </Router >
  );
}

export default App;
