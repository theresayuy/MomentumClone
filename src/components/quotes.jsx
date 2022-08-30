import '../App.css';
import {quotes} from './constants/quotes';
import { getDeepCopy } from './helpers/str-arr-stuff';

function getRandomQuote() {
    const MAX_STR_LEN = 120;
    let i = Math.floor(Math.random() * quotes.length);
    const result = ["random quote", "author"];

    while (quotes[i]["text"].length > MAX_STR_LEN) {
        i = Math.floor(Math.random() * quotes.length);
    }

    result[0] = "\"" + quotes[i]["text"] + "\"";
    result[1] = "- " + quotes[i]["author"];

    return result;
}

function Quote() {
    let quoteResult = getDeepCopy(getRandomQuote());

    return (
        <div id="quote">
            <p id="quote-text">{quoteResult[0]}</p>
            <p id="quote-author">{quoteResult[1]}</p>
        </div>
    );
}

export default Quote;