import React, {useState, useEffect} from 'react';
import './style.css';
import { getMin, getMax } from './helpers';

function getNewTopAdd(props, starState, winH) {
    // change direction if star reaches the very top or bottom
    if (getMax(0, getMin(winH, 
        props.top + starState.topChange * props.initialYDir
    )) === 0) {
        return props.initialYDir * (1 / 667) * winH;
    } else if (getMax(0, getMin(winH, 
        props.top + starState.topChange * props.initialYDir
    )) === winH) {
        return props.initialYDir * -1 * (1 / 667) * winH;
    }

    return starState.topAdd; // star can keep travelling in same direction
}

function Star(props) {
    /*
        props = {
            left: 0,
            top: 0,
            alpha: 0,
            timeChange: 100,
            initialYDir: -1 || 1
        }
    */
    let winW = window.innerWidth;
    let winH = window.innerHeight;
    const [starState, setStarState] = useState({
        leftChange: 0,
        leftAdd: (0.1 / 1366) * winW,
        topChange: 0,
        topAdd: (1 / 667) * winH,
        alpha: props.alpha,
    });
    // console.log(`topChange = ${starState.topChange} and topAdd = ${starState.topAdd}`);
    const starCSS = {
        left: `${getMax(0, getMin(props.left + starState.leftChange, 
            winW))}px`,
        top: `${getMax(0, getMin(winH, 
                props.top + starState.topChange * props.initialYDir
            ))}px`,
        fontSize: `${winH * 0.024}px`,
        color: `rgba(255, 255, 255, ${starState.alpha})`,
    };
    let maxLChange = (1 / 1366) * winW;

    useEffect(() => {
        const updateAlphaAndPosition = setTimeout(() => {
            setStarState({
                leftChange: starState.leftChange + starState.leftAdd,
                leftAdd: ((starState.leftChange >= maxLChange) ? 
                        -(0.1 / 1366) * winW : 
                        (starState.leftChange <= -maxLChange) ? 
                        (0.1 / 1366) * winW : starState.leftAdd),
                topAdd: getNewTopAdd(props, starState, winH),
                topChange: starState.topChange + starState.topAdd,
                alpha: (starState.alpha === 0.3) ? 0.28 : 
                        (starState.alpha === 0.28) ? 0.26 :
                        (starState.alpha === 0.26) ? 0.24 : 
                        (starState.alpha === 0.24) ? 0.22 : 
                        (starState.alpha === 0.22) ? 0.2 : 
                        (starState.alpha === 0.2) ? 0.18 :
                        (starState.alpha === 0.18) ? 0.16 : 
                        (starState.alpha === 0.16) ? 0.14 :
                        (starState.alpha === 0.14) ? 0.12 :
                        (starState.alpha === 0.12) ? 0.1 :
                        (starState.alpha === 0.1) ? 0.3 : starState.alpha
            });
        }, props.timeChange); // twinkle rise fall animation

        return function cleanUp() {
            clearTimeout(updateAlphaAndPosition);
        };
    });


    return (
        <div 
            className="Background-Star"
            id={props.id} 
            style={starCSS}
        >
            {"\u25cf"}
        </div>
    );
}

export default Star;
