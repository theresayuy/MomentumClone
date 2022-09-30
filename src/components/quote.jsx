import React, {useState} from 'react';
import './style.css';
import { QUOTES, MAX_STR_LEN } from './constants';
import { useLocalStorage, getRandomValueFromArray, 
    getDeepCopy } from './helpers';

function getRandomQuote() {
    let result = getRandomValueFromArray(QUOTES);

    while (result.text.length > MAX_STR_LEN.quoteText) {
        result = getRandomValueFromArray(QUOTES);
    }

    return [
        `"${result.text}"`,
        `- ${(result.author === null) ? `Unknown` : result.author}`
    ];
}

function Quote() {
    const [quoteState, setQuoteState] = useState({
        authorCSSDisplay: "none"
    });
    const [storedQuote, setStoredQuote] = useLocalStorage("quoteData", {
        latestDate: new Date().toDateString(),
        latestQuote: getDeepCopy(getRandomQuote())
    });
    const WIN_W = window.innerWidth;

    if (storedQuote.latestDate !== new Date().toDateString() &&
        new Date().getHours() >= 4) {
        setStoredQuote({
            latestDate: new Date().toDateString(),
            latestQuote: getDeepCopy(getRandomQuote())
        });
    } // quote change only once a day

    return (
        <div className="Quote-Main"
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
