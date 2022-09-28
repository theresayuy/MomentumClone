import {useState} from 'react';

// hook to set a key-value pair to window.localStorage
function useLocalStorage(keyName, defaultValue) {
    const [storedVal, setStoredVal] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);

            if (value) {
                return JSON.parse(value); /* if a value has been previously stored, 
                then set initial state of storedVal to it instead of defaultValue */
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;                
            }
        } catch (err) {
            return defaultValue;
        }
    }); // calculate the initial value of storedVal

    const setVal = function(newVal) {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newVal));
        } catch (err) {
            console.log(err);
        }
        setStoredVal(newVal);
    }

    return [storedVal, setVal];
}

export default useLocalStorage;