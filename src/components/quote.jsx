import React, {useState} from 'react';
import $ from 'jquery';
import '../App.css';
import QUOTES from './constants/quotes';
import useLocalStorage from './helpers/local-storage.js';
import { getDeepCopy } from './helpers/str-arr-utils';

function getRandomQuote() {
    const MAX_STR_LEN = 120;
    let i = Math.floor(Math.random() * QUOTES.length);
    const result = ["text", "author"];

    while (QUOTES[i]["text"].length > MAX_STR_LEN) {
        i = Math.floor(Math.random() * QUOTES.length);
    }

    result[0] = "\"" + QUOTES[i]["text"] + "\"";
    result[1] = "- " + QUOTES[i]["author"];
    return result;
}

function Quote() {
    const [quoteState, setQuoteState] = useState(0);
    const [storedQuote, setStoredQuote] = useLocalStorage("quoteData", {
        latestDate: new Date().toDateString(),
        latestQuote: getDeepCopy(getRandomQuote())
    });
    const AUTHOR_CSS = {
        display: "none",
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.8)",
        mixBlendMode: "screen"
    };
    const BREAKS = [<br></br>, <br></br>];

    if (storedQuote.latestDate !== new Date().toDateString()) {
        setStoredQuote({
            latestDate: new Date().toDateString(),
            latestQuote: getDeepCopy(getRandomQuote())
        });
    } // quote change only once a day

    return (
        <div className="Quote-Main" id="quote">
            {BREAKS}
            <span 
                id="quote-text" 
                onMouseOver={() => {
                    $("#quote-author").fadeIn(1000);
                    setQuoteState(quoteState + 1);
                }}
                onMouseOut={() => {
                    $("#quote-author").fadeOut(1000);
                    setQuoteState(quoteState + 1);
                }}
            >
                {storedQuote.latestQuote[0]}
            </span>
            {BREAKS}
            <span
                id="quote-author"
                style={AUTHOR_CSS}
            >
                {storedQuote.latestQuote[1]}
            </span>
        </div>
    );
}

export default Quote;