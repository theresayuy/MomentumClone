$(function () {

    /**
     * Adds a zero before a nonnegative integer if it is less than 10.
     * @param {*} num A nonnegative integer 
     * @returns A string padded with a 0 before it if num is less than 10, or the num if it isn't
     */
    function padWithZero(num) {
        return num < 10 ? "0" + num : num 
    }

    /**
     * Changes the time in tune with the location's time zone I believe?
     */
    function getTime() {
        const time = new Date();
        const hours = padWithZero(time.getHours());
        const mins = padWithZero(time.getMinutes()); 
        const timeText = `${hours}:${mins}`

        $("#time").text(timeText)
    }

    setInterval(getTime, 1000); // time is updated every second
})