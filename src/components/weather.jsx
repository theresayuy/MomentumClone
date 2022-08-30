import React from 'react';
import '../App.css';
import $ from 'jquery';
import { OPENWM_KEY } from './constants/apikey';
import { getDeepCopy } from './helpers/str-arr-stuff';

class Weather extends React.Component {
    constructor() {
        super();
        this.state = {
            temperature: "0°C",
            condition: ""
        }
    }

    render() {
        getGeolocation();
        return (
            <span className="Weather-Main">
                <div id="temperature">{this.state.temperature}</div>
                <div id="condition">{this.state.condition}</div>
            </span>
        );
    }

    getGeolocation() {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let baseURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${OPENWM_KEY}`;
        
            $.get(baseURL, function(result) {
                let data = result.current;
                let temp = Math.floor(data.temp - 273); // convert to celcius
                let cond = data.weather[0].description;
                this.state.temperature = `${temp}°C`;
                this.state.condition = getDeepCopy(cond);
            });
        }); 
    }
}

export default Weather;