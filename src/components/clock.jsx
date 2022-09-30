import React, {useEffect, useState} from 'react';
import './style.css';

function padWithZero(num) {
    return num < 10 ? `0${num}` : num;
} // puts a zero before num if its less than 10

function get12HourTime(num) {
    return num === 0 ? 12 : (num > 12) ? (num - 12) : num;
} // subtracts 12 from hours after noon (eg. 16:00 becomes 4:00) 

function getCurrentTime(system) {
    const time = new Date();
    const hours = (system === 12) ? get12HourTime(time.getHours()) : 
          padWithZero(time.getHours());
    const mins = padWithZero(time.getMinutes());
    return `${hours}:${mins}`;
} // returns either 12 or 24 hour time based on whether system is 12 or 24.

function Clock() {
    const [clockState, setClockState] = useState({
        count: -999999999,
        system: 12,
    });

    useEffect(() => {
        let clockUpdater = setTimeout(() => {            
            setClockState({
                count: clockState.count + 1,
                system: clockState.system,
            });
        }, 1000); // re-render every second to update time properly

        return function cleanUp() {
            clearTimeout(clockUpdater);
        }
    });

    return(
        <div className="Clock">
            <div id="time">
                {getCurrentTime(clockState.system)}
            </div>
            <div 
                className="Change-Time-System"
                title={`Change to ${clockState.system === 12 ? 24 : 12}-hour time.`}
                onClick={() => {
                    setClockState({
                        count: clockState.count + 1,
                        system: (clockState.system === 12) ? 24 : 12,
                    });
                }}
            >
                {"\u25cf\u25cf\u25cf"}
            </div>
        </div>   
    );
}

export default Clock;
