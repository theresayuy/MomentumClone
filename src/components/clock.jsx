import React, {useEffect, useState} from 'react';
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

function Clock() {
    const [clockState, setClockState] = useState(0);
    useEffect(() => {
        let clockUpdater = setTimeout(() => {            
            setClockState(clockState + 1);
        }, 1000); // re-render every second to update time properly

        return function cleanUp() {
            clearTimeout(clockUpdater);
        }
    });

    return(
        <div className="Clock-Main">
            <div id="time">{getCurrentTime()}</div>
        </div>   
    );
}

export default Clock;