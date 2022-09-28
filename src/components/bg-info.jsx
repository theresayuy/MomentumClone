import React from 'react';
import './style.css';

function BackgroundInfo() {
    const bgImgData = JSON.parse(window.localStorage.getItem("bgImgData"));

    return (
        <div className="BackgroundInfo-Main">
            <div className="BackgroundInfo-Title">
                Photo by:
            </div>
            <button
                className="BackgroundInfo-Credits"
                onClick={() => {
                    window.open(bgImgData.unsplashURL, "_blank");                
                }}
            >
                {`${bgImgData.author} / Unsplash`}
            </button>
        </div>
    );
}

export default BackgroundInfo;
