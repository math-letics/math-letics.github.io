/* find the greatest common factor of two numbers, so as to use in reducing fractions, etc.

description: find the greatest common factor of two #'s using the Euclidean Algorithm
(page 22, "Elementary Number Theory")

parameters:
- a -- the first number in the set of two
- b -- the second number ... find gcf(a, b)

*/

function getGCF(a, b) {
    var gcf; // the greatest common factor of 'a' and 'b'

    // make 'a' bigger than 'b'
    if (a<b) {
        var x = a;
        a = b;
        b = x;
    }
    
    var r = a % b;
    while (r!==0) {
        a = b;
        b = r;
        r = a % b;
    }
    
    gcf = b;
    
    return gcf;

} // end of getGCF(a, b)

// 3 = 2(1) + 1
// 2 = 1(2) + 0
// 1 is the gcf of 2 and 3

// gcf(24, 18) = 6
// 24 = 18(1) + 6
// 18 = 6(3) + 0

// 56 and 74
// 74 = 56(1) + 18
// 56 = 18(3) + 2
// 18 = 2(9) + 0

// 1000 and 1003
// 1003 = 1000(1) + 3
// 1000 = 3(333) + 1
// 3 = 1(3) + 0