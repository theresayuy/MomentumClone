import CryptoJS from "crypto-js";

export function getDeepCopy(toCopy) {
    return ((toCopy.toString() === toCopy ? " " : [" "]).concat(toCopy)).slice(1);
}

export function formatStrMethod1(str, maxlen) {
    if (str.length > maxlen) {
        return `${str.slice(0, maxlen)}...`
    }

    return str;
}

export function getAESFromUTF8Str(str) {
    return CryptoJS.AES.encrypt(
        str, process.env.REACT_APP_CRYPTO_JS_KEY
    ).toString();
}

export function getUTF8StrFromAES(aesStr) {
    return CryptoJS.AES.decrypt(
        aesStr, process.env.REACT_APP_CRYPTO_JS_KEY
    ).toString(
        CryptoJS.enc.Utf8
    );
}

export function getRandomValueFromArray(arr) {
    return arr[Math.floor(Math.random() * (arr.length - 1))];
} // returns the value stored from a random index in arr

export function getArrayFrom(start, end, increment) {
    const result = [];
    increment = (increment === null) ? 1 : increment;
    start = (start === null) ? 0 : start;
    end = (end === null) ? (start + 1) : end;

    if (start < end && increment > 0) {
        for (let i = start; i < end; i+= increment) {
            result.push(i);
        }
    }

    return getDeepCopy(result);
} // start is an integer which is the lowest value in the array
// end is an integer such that (end - increment) is the largest value in the array
// increment is an integer bigger than 0 which describes how much the values change by
