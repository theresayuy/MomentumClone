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
    const [quoteState, setQuoteState] = useState({
        authorCSSDisplay: "none"
    });
    const [storedQuote, setStoredQuote] = useLocalStorage("quoteData", {
        latestDate: new Date().toDateString(),
        latestQuote: getDeepCopy(getRandomQuote())
    });
    const WIN_W = $(window).width();

    if (storedQuote.latestDate !== new Date().toDateString()) {
        setStoredQuote({
            latestDate: new Date().toDateString(),
            latestQuote: getDeepCopy(getRandomQuote())
        });
    } // quote change only once a day

    return (
        <div className="Quote-Main" id="quote"
            onMouseOver={() => {
                setQuoteState({
                    authorCSSDisplay: "initial"
                });
            }}
            onMouseOut={() => {
                setQuoteState({
                    authorCSSDisplay: "none"
                });
            }}
            style={{
                left: `${(WIN_W / 2) - (5 * storedQuote.latestQuote[0].length)}px`,
                right: `${(WIN_W / 2) - (5 * storedQuote.latestQuote[0].length)}px`
            }}
        >
            <br></br>
            <br></br>
            <span 
                id="quote-text" 
            >
                {storedQuote.latestQuote[0]}
            </span>
            <br></br>
            <span
                id="quote-author"
                style={{
                    display: quoteState.authorCSSDisplay
                }}
            >
                {storedQuote.latestQuote[1]}
            </span>
        </div>
    );
}

export default Quote;
