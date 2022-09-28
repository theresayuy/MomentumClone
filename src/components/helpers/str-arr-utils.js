import {ENCRYPT0, ENCRYPT1} from '../constants';

export function getDeepCopy(toCopy) {
    return ((toCopy.toString() === toCopy ? " " : [" "]).concat(toCopy)).slice(1);
}

export function decryptStr(toDecrypt, method) {
    const toDecryptArr = Array.from(toDecrypt);
    const decryptMethod = method === 1 ? ENCRYPT1 : ENCRYPT0;
    let result = "";
    toDecryptArr.forEach((toDecryptChar) => {
        Object.getKeys(decryptMethod).forEach((keyItem) => {
            if (toDecryptChar === decryptMethod[keyItem]) {
                result += keyItem;
            }
        });
    }); 
    return getDeepCopy(result);
}

export function encryptStr(toEncrypt, method) {
    const toEncryptArr = Array.from(toEncrypt);
    const encryptMethod = method === 1 ? ENCRYPT1 : ENCRYPT0;
    let result = "";
    toEncryptArr.forEach((toEncryptChar) => {
        Object.getKeys(encryptMethod).forEach((keyItem) => {
            if (toEncryptChar === keyItem) {
                result += encryptMethod[keyItem];
            }
        });
    }); 
    return getDeepCopy(result);
}

export function formatStrMethod1(str, maxlen) {
    if (str.length > maxlen) {
        return `${str.slice(0, maxlen)}...`
    }

    return str;
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
