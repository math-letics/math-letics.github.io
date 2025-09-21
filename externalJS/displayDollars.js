/* title: round decimal numbers

description: display dollar amounts with nonzero digit in tenths but zero in hundredths
  - for example... display $4.90 instead of $4.9

parameters:
    - dollarAmount -- the dollar amount to display, as a JS number

***NOTE: This externalJS relies on another externalJS file... round_decimal_numbers.js***

*/

function displayDollarsAndCents(dollarAmount) {
  var temp = dollarAmount*100;
  temp = temp%10;
  temp = roundDecimalNumber(temp, 0);

  if (temp === 0) {dollarAmount = dollarAmount + '0';}
  dollarAmount = '$' + dollarAmount;


  return dollarAmount;
}
