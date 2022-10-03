import { getRandomValueFromArray } from '../../helpers';
import { MAX_STR_LEN } from '../../constants';

import QUOTES from './constants'; // this array was too big to fit here

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

export { getRandomQuote };
