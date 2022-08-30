import {ENCRYPT1, ENCRYPT0} from "../constants/encrypt-standards";

export const getDeepCopy = function(toCopy) {
    return ((toCopy.toString() === toCopy ? " " : [" "]).concat(toCopy)).slice(1);
}

export const decryptStr = function(toDecrypt, standard) {
    const toDecryptArr = Array.from(toDecrypt);
    const standardArr = standard === 1 ? ENCRYPT1 : ENCRYPT0;
    let result = "";
    toDecryptArr.forEach((toDecryptChar) => {
        Object.getKeys(standardArr).forEach((keyItem) => {
            if (toDecryptChar === standardArr[keyItem]) {
                result += keyItem;
            }
        });
    }); 
    return (" " + result).slice(1);
}

export const encryptStr = function(toEncrypt, standard) {
    const toEncryptArr = Array.from(toEncrypt);
    const standardArr = standard === 1 ? ENCRYPT1 : ENCRYPT0;
    let result = "";
    toEncryptArr.forEach((toEncryptChar) => {
        Object.getKeys(standardArr).forEach((keyItem) => {
            if (toEncryptChar === keyItem) {
                result += standardArr[keyItem];
            }
        });
    }); 
    return (" " + result).slice(1);
}