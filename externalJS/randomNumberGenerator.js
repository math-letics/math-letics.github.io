/* title: 'random number generator'

description: generate a random integer given a min and max

parameters:
    - min -- the minimum value to choose from
    - max -- the maximum value to choose from

*/


// generate a random number
function getRandom(min, max) {

    var x = Math.floor(Math.random()*(max - min + 1)) + min;
    // NOTE: using 0.1 and 0.9 as min and max return values of 0.1 or 1.1 every time
    // This code probably only works for whole numbers
    
    return x; 

} // end of getRandom(min, max)



