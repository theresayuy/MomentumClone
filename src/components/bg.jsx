import React from 'react';
import $ from 'jquery';
import '../App.css';

function Background() {
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
        backgroundImage: `url(https://picsum.photos/${$(window).width()}/${$(window).height()})`
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
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    }
    
    return (
        <div id="bg" style={BG_CSS}>
            <div id="overlay" style={OVERLAY_CSS}></div>
        </div>
    );
}

export default Background;