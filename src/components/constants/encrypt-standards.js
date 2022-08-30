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

// an encryption standard maps a character in CHARS to another character in CHARS
const createEncryptionStandard = function(start) {
    let result = {};

    for (let i = 0; i < (CHARS.length - start); i++) {
        result[CHARS[i]] = CHARS[i + start];
    }

    for (let i = (CHARS.length - start); i < CHARS.length; i++) {
        result[CHARS[i]] = CHARS[i + start - CHARS.length];
    }

    return result;
}

export const ENCRYPT0 = createEncryptionStandard(24);
export const ENCRYPT1 = createEncryptionStandard(69);