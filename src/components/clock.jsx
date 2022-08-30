import React from 'react';
import '../App.css';

// puts a zero before the time if it is before 10 o'clock
function padWithZero(num) {
    return num < 10 ? "0" + num : num;
}

function getCurrentTime() {
    const time = new Date();
    const hours = padWithZero(time.getHours());
    const mins = padWithZero(time.getMinutes());
    return `${hours}:${mins}`;
}

class Clock extends React.Component {
    constructor() {
        super();
        this.state = {time: getCurrentTime()}
    }

    render() {
        setInterval(() => {            
            this.setState((_) => {
                return {time: getCurrentTime()};
            });
        }, 1000); // change the time every second

        return(
            <div className="Clock">
                <div id="time">{this.state.time}</div>
            </div>   
        );
    }

}

export default Clock;