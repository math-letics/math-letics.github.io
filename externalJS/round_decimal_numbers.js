/* title: round decimal numbers

description: take in a decimal number and round to a specified place value

parameters:
    - number -- the number to round
    - places -- which place value to round

*/

function roundDecimalNumber(number, places) {

    number = number * Math.pow(10, places);

    number = number.toFixed(0);

    number = number / Math.pow(10, places);

    return number;

}
