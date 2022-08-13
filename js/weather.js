/**
 * Checks if location is supported by the browser using navigator
 * If it is, it then attempts to update the weather info of the weather
 * widget.
 */
function getLocation() {
    /*if (!navigator.geolocation) {
        // location is not supported by browser
        console.log("Location is not supported by browser");
        return;
    } else {
        navigator.geolocation.getCurrentPosition(getWeather);
    }*/
    // commented the above code for testing purposes lol
    navigator.geolocation.getCurrentPosition(getWeather); 
}

/**
 * Uses Open Weather Map API to update the weather widget with accurate 
 * information based off the location where the device is used.
 */
function getWeather(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let API_KEY = "08afe71d5a4bd48675b1731b032dec5d";
    let baseURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}`;

    $.get(baseURL, function(res) {
        // I have no clue how this jquery stuff works!!!!!!!!!
        let data = res.current;
        let temp = Math.floor(data.temp - 273);
        let condition = data.weather[0].description;
        $('#temperature').html(`${temp}°C`);
        $('#condition').html(condition);
    })
}

getLocation(); 