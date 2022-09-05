import '../App.css';
import React, {useState} from 'react';
import $ from 'jquery';
import API_KEYS from './constants/apikey';
import useLocalStorage from './helpers/local-storage';

const LS_KEY = "weatherInfo";

function Weather() {
    const [weatherState, renderWeather] = useState(0);
    const [weatherInfo, storeInfo] = useLocalStorage(LS_KEY, {
        temperature: `0°C`,
        condition: "nothing"
    });

    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let baseURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${
                lat
            }&lon=${
                long
            }&appid=${
                API_KEYS.OPEN_WM
            }`;
    
        $.get(baseURL, function(res) {
            let data = res.current;
            let temp = Math.floor(data.temp - 273);
            let condition = data.weather[0].description;
            storeInfo({
                temperature: `${temp}°C`,
                condition: `${condition}`
            });
        })
    });

    return(
        <div className="Weather-Main"
            onMouseOver={() => {
                renderWeather(weatherState + 1);
            }}
        >
            <div id="temperature">{weatherInfo.temperature}</div>
            <div id="condition">{weatherInfo.condition}</div>
        </div> 
    );
}

export default Weather;