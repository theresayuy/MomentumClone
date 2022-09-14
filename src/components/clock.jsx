import React, {useEffect, useState} from 'react';
import '../App.css';

function padWithZero(num) {
    return num < 10 ? `0${num}` : num;
} // puts a zero before num if its less than 10

function get12HourTime(num) {
    return num === 0 ? 12 : num > 12 ? (num - 12) : num;
} // subtracts 12 from hours after noon (eg. 16:00 becomes 4:00) 

function getCurrentTime(system) {
    const time = new Date();
    const hours = (system === 12) ? get12HourTime(time.getHours()) : 
          padWithZero(time.getHours());
    const mins = padWithZero(time.getMinutes());
    return `${hours}:${mins}`;
} /* returns either the 12 hour time or 24 hour/military time 
     based on whether system = 12 or 24. */

function Clock() {
    const [clockState, setClockState] = useState({count: 0, system: 12});
    useEffect(() => {
        let clockUpdater = setTimeout(() => {            
            setClockState({
                count: clockState.count + 1, 
                system: clockState.system
            });
        }, 1000); // re-render every second to update time properly

        return function cleanUp() {
            clearTimeout(clockUpdater);
        }
    });

    return(
        <div className="Clock-Main">
            <span id="time">{getCurrentTime(clockState.system)}</span>
            <span className="Toggle-Millitary-Time"
                onClick={() => {
                    setClockState({
                        count: clockState.count + 1, 
                        system: clockState.system === 12 ? 24 : 12
                    });    
                }}
                title={`Change to ${clockState.system === 12 ? 24 : 12}-hour clock`}                
            >{clockState.system}</span>
        </div>   
    );
}

export default Clock;
