import React, { useState } from 'react';
import $ from 'jquery';
import '../App.css';
import Star from './star';
import useLocalStorage from './helpers/local-storage';
import PICSUM_IDS from './constants/picsum-gallery-ids';

function getRandomId() {
    return PICSUM_IDS[Math.floor(Math.random() * (PICSUM_IDS.length - 1))];
} // get random ID of an image stored on lorem picsum.

function Background() {
    const [bgImgData, storeBGImgData] = useLocalStorage("bgImgData", {
            latestDate: new Date().toDateString(),
            latestID: getRandomId()
        }
    );
    const [backgroundState, renderBackground] = useState(0);
    const WIN_W = $(window).width();
    const WIN_H = $(window).height();

    if (bgImgData.latestDate !== new Date().toDateString()) {
        storeBGImgData({
            latestDate: new Date().toDateString(),
            latestID: getRandomId()
        });
    } // enables BG img to only be changed once a day

    const BG_CSS = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        zIndex: "-1",
        backgroundImage: `url(https://picsum.photos/id/${
            bgImgData.latestID}/${WIN_W}/${WIN_H})`
    };
    const OVERLAY_CSS = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        zIndex: "-1",
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    };
    const STARS = [];
    const ALPHA = [0.3, 0.28, 0.26, 0.24, 0.22, 0.2, 
        0.18, 0.16, 0.14, 0.12, 0.1];

    for (let i = 0; i < (WIN_W * 0.2); i++) {
        STARS.push(<Star
            id={`overlay-star-${i}`}
            left={Math.random() * WIN_W}
            top={Math.random() * WIN_H}
            timeChange={100 + Math.random() * 400}
            alpha={ALPHA[Math.floor(Math.random() * (ALPHA.length - 1))]}
        />);
    } // many stars will be added to background
    
    return (
        <div id="bg" className="Background-Main" style={BG_CSS}
            onResize={() => {
                renderBackground(backgroundState + 1); 
            }} // add or remove stars based on new window size
        >
            <div id="overlay" style={OVERLAY_CSS}>{STARS}</div>
        </div>
    );
}

export default Background;