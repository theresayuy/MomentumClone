import React, {useState, useEffect} from 'react';
import {getMin, getMax} from './helpers/number-utils';
import $ from 'jquery';

let winW = $(window).width();
let winH = $(window).height();
const MAX_LCHANGE = (1 / 1366) * winW;

function Star(props) {
    winH = $(window).height();
    winW = $(window).width();

    const [starState, setStarState] = useState({
        leftChange: 0,
        leftAdd: (0.1 / 1366) * winW,
        topChange: 0,
        topAdd: (1 / 667) * winH,
        alpha: props.alpha
    });
    const starCSS = {
        position: "absolute",
        left: `${getMax(0, getMin(props.left + starState.leftChange, winW))}px`,
        top: `${getMax(0, getMin(winH, props.top + starState.topChange))}px`,
        fontSize: `${winH * 0.024}px`,
        color: `rgba(255, 255, 255, ${starState.alpha})`,
    };

    useEffect(() => {
        const updateAlphaAndPosition = setTimeout(() => {
            setStarState({
                leftChange: starState.leftChange + starState.leftAdd,
                leftAdd: ((starState.leftChange >= MAX_LCHANGE) ? -(0.1 / 1366) * winW : 
                        (starState.leftChange <= -MAX_LCHANGE) ? (0.1 / 1366) * winW : 
                        starState.leftAdd),
                topChange: starState.topChange - starState.topAdd,
                topAdd: ((props.top + starState.topChange) <= 0) ? -(1 / 667) * winH : 
                        ((props.top + starState.topChange) >= winH) ? (1 / 667) * winH : 
                        starState.topAdd,
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
            className="OverlayStar"
            id={props.id} 
            style={starCSS}
        >
            {"\u25cf"}
        </div>
    );
}

export default Star;