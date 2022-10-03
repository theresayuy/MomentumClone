import React, { useState } from 'react';
import $ from 'jquery';

import Star from "../Star";
import { useLocalStorage } from '../../hooks';
import { getRandomValueFromArray } from '../../helpers';

import './style.css';
import { ALPHA, TIME_CHANGE, Y_DIR } from './constants';
import { getRandomId } from './utils';

function Background() {
    const NOW = new Date();
    const [bgImgData, storeBGImgData] = useLocalStorage("bgImgData", {
        latestDate: NOW.toDateString(),
        latestID: getRandomId(),
        author: 0,
        unsplashURL: "https://unsplash.com/"
    });
    const [bgState, renderBackground] = useState({
        winW: window.innerWidth, winH: window.innerHeight
    });
    let style = {backgroundImage: ""};
    let stars = [];

    if ((bgImgData.latestDate !== NOW.toDateString()
        && NOW.getHours() >= 4) || 
        bgImgData.author === 0) 
    {
        const newID = getRandomId();        
        const baseURL = `https://picsum.photos/id/${newID}/info`;        
        $.getJSON(baseURL, function(result) {
            storeBGImgData({
                latestDate: NOW.toDateString(),
                latestID: newID,
                author: result.author,
                unsplashURL: result.url
            });
        });
    } // background image will change only once a day
    
    style.backgroundImage = `url(https://picsum.photos/id/${
        bgImgData.latestID}/${bgState.winW}/${
            bgState.winH})`; // set URL of the background image

    for (let i = 0; i < (bgState.winW * 0.2); i++) {
        stars.push(<Star
            key={`${i}`}
            id={`bg-star-${i}`}
            left={Math.random() * bgState.winW}
            top={Math.random() * bgState.winH}
            timeChange={50 + getRandomValueFromArray(TIME_CHANGE)}
            alpha={getRandomValueFromArray(ALPHA)}
            initialYDir={getRandomValueFromArray(Y_DIR)}
        />);
    } // many stars will be added to background
    
    return (
        <div className="Background" style={style}
            onResize={() => {                
                renderBackground({
                    winH: window.innerHeight, winW: window.innerWidth
                }); 
            }} // add or remove stars based on new window size
        >
            {stars}
        </div>
    );
}

export default Background;
