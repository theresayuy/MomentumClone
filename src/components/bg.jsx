import React, { useState } from 'react';
import $ from 'jquery';
import './style.css';
import Star from './star';
import { useLocalStorage, getRandomValueFromArray, 
    getArrayFrom } from './helpers';
import {PICSUM_IDS} from './constants';


// some values to initialize the stars
const ALPHA = [0.3, 0.28, 0.26, 0.24, 0.22, 0.2, 
    0.18, 0.16, 0.14, 0.12, 0.1];
const TIME_CHANGE = getArrayFrom(0, 200, 20);
const Y_DIR = [-1, 1, -1, 1]; /* determines if star 
    initially travels upwards or downwards. This array is length 4, 
    even though theres only 2 unique values, bc an array of length 2
    gets the value stored in index 0 chosen most of the time by
    getRandomValueFromArray function. 
*/

function getRandomId() {
    return getRandomValueFromArray(PICSUM_IDS);
} // get random ID of an image stored on lorem picsum.

function Background() {
    const [bgImgData, storeBGImgData] = useLocalStorage("bgImgData", {
        latestDate: new Date().toDateString(),
        latestID: getRandomId(),
        author: 0,
        unsplashURL: "https://unsplash.com/"
    });
    const [bgState, renderBackground] = useState({
        winW: window.innerWidth, winH: window.innerHeight
    });
    let style = {backgroundImage: ""};
    let stars = [];

    if (bgImgData.latestDate !== new Date().toDateString() || 
        bgImgData.author === 0) 
    {
        const newID = getRandomId();        
        const baseURL = `https://picsum.photos/id/${newID}/info`;        
        $.getJSON(baseURL, function(result) {
            storeBGImgData({
                latestDate: new Date().toDateString() ,
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
            id={`bg-star-${i}`}
            left={Math.random() * bgState.winW}
            top={Math.random() * bgState.winH}
            timeChange={50 + getRandomValueFromArray(TIME_CHANGE)}
            alpha={getRandomValueFromArray(ALPHA)}
            initialYDir={getRandomValueFromArray(Y_DIR)}
        />);
    } // many stars will be added to background
    
    return (
        <div id="bg" className="Background-Main" style={style}
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
