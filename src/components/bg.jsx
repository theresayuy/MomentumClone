import React from 'react';
import $ from 'jquery';
import '../App.css';

function Background() {
    // set the background image from lorem picsum 
    setTimeout(() => {
        $("#bg").css("background-image", `url(https://picsum.photos/${$(window).width()}/${$(window).height()})`);
        $("#overlay").css("background-color", "rgba(0, 0, 0, 0.4)");
    }, 20);
    
    return (
        <div id="bg">
            <div id="overlay"></div>
        </div>
    );
}

export default Background;