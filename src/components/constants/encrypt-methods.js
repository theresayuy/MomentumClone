const CHARS = [
    " ", ",", ".", "?", "!", "~", "`", "@", "#", "$", "%", "^",
    "&", "*", "(", ")", "_", "-", "+", "=", "[", "]", "{", "}",
    "\\", "|", ":", ";", "\"", "'", "<", ">", "/", "1", "2", "3",
    "4", "5", "6", "7", "8", "9", "0", "a", "Z", "b", "Y", "c", 
    "X", "d", "W", "e", "V", "f", "U", "g", "T", "h", "S", "i", "R",
    "j", "Q", "k", "P", "l", "O", "m", "N", "n", "M", "o", "L", "p",
    "K", "q", "J", "r", "I", "s", "H", "t", "G", "u", "F", "v", "E",
    "w", "D", "x", "C", "y", "B", "z", "A"
];

/* an encryption method maps a character in CHARS to 
    another character in CHARS

    0 <= start < CHARS.length is an integer
*/
const createEncryptionMethod = function(start) {
    let result = {};

    for (let i = 0; i < (CHARS.length - start); i++) {
        result[CHARS[i]] = CHARS[i + start];
    } /* maps character at i to the character at start, 
        i starts at 0, increases by one each time, 
        and ends at i = CHARS.length - start - 1
    */

    for (let i = (CHARS.length - start); i < CHARS.length; i++) {
        result[CHARS[i]] = CHARS[i + start - CHARS.length];
    } /* tries to map the remainder of the CHARS array to another 
        character in the CHARS array
    */

    return result;
}

export const ENCRYPT0 = createEncryptionMethod(24);
export const ENCRYPT1 = createEncryptionMethod(69);