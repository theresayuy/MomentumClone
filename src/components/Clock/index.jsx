import React, {useEffect, useState} from 'react';

import { getCurrentTime } from './utils';
import './style.css';

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
