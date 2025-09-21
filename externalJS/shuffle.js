/* title: 'shuffle'

description: randomly shuffle the elements of an array

parameters:
    - inputArray -- the array that we are shuffling

**Relies on "getRandom(min, max)" function which is separate external js
--> file name: random number generator

*/

function shuffleArray(inputArray) {
    var end = inputArray.length;
    var temp;
    var finalArray = [];
    for (i=0; i<inputArray.length; i++) {
        temp = getRandom(0, end-1);
        finalArray[i] = inputArray[temp];
        inputArray[temp] = inputArray[inputArray.length-1-i];
        end--;
    }
    return finalArray;

} // end of shuffleArray(inputArray)