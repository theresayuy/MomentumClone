import '../App.css';
import $ from 'jquery';
import { OPENWM_KEY } from './constants/apikey';
import { getDeepCopy } from './helpers/str-arr-stuff';

function setWeather() {
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let baseURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${OPENWM_KEY}`;
    
        $.get(baseURL, function(res) {
            // I have no clue how this jquery stuff works!!!!!!!!!
            let data = res.current;
            let temp = Math.floor(data.temp - 273);
            let condition = data.weather[0].description;
            $('#temperature').html(`${temp}°C`);
            $('#condition').html(condition);
        })
    });
}

function Weather() {
    setWeather();

    return(
        <div className="Weather-Main">
            <div id="temperature"></div>
            <div id="condition"></div>
        </div> 
    );
}

export default Weather;