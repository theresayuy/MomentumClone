function padWithZero(num) {
    return num < 10 ? `0${num}` : num;
} // puts a zero before num if its less than 10

function get12HourTime(num) {
    return num === 0 ? 12 : (num > 12) ? (num - 12) : num;
} // subtracts 12 from hours after noon (eg. 16:00 becomes 4:00) 

function getCurrentTime(system) {
    const time = new Date();
    const hours = (system === 12) ? get12HourTime(time.getHours()) : 
          padWithZero(time.getHours());
    const mins = padWithZero(time.getMinutes());
    return `${hours}:${mins}`;
} // returns either 12 or 24 hour time based on whether system is 12 or 24.

export { getCurrentTime };