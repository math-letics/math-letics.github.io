/*Video feedback

This js file will play video feedback when a user submits an answer

Functions:
    - playVideo() -- called by other functions within this javascript
    - playCorrect() -- when user's answer is correct
    - playWrong() -- when user's answer is wrong
    - playPartial() -- when user's answer is partially correct, e.g. 15 instead of 15%
    - playAnswer() -- when user clicks on 'Show Answer' button
    - playClose() -- when user clicks on 'Close window' button

id elements needed in HTML file:
    'videoSpace'

*/


// global variables
var loc = 'videos/'; // location of the folder where videos are
var file; // the filename for the video to be played

function playVideo() {
    document.getElementById('videoSpace').innerHTML = '<video id="video" width="240" height="132">' +
        '<source src="' + loc + file + '" type="video/mp4">' +
        '</video>';

    var x = document.getElementById('video');
    x.play();
    x.onended = function() { // reset the video frame when video has ended
        document.getElementById('videoSpace').innerHTML = '<video width="240" height="132"></video>';
    };
} // end of playVideo(correct)

function playCorrect() {
    // currently 2 videos
    var i = Math.floor(Math.random()*2);
    switch(i) {
        case 0:
            file = '/really good at math.mp4';
            break;
        case 1:
            file = '/smrt.mp4';
            break;
        default:
            alert('error - playCorrect()');
    }

    playVideo();
} // end of playCorrect()

function playWrong() {
    // currently 2 videos
    var i = Math.floor(Math.random()*2);
    switch(i) {
        case 0:
            file = '/not even close.mp4';
            break;
        case 1:
            file = '/what.mp4';
            break;
        default:
            alert('error - playWrong()');
    }
    playVideo();
} // end of playWrong()

function playPartial() {
    // currently 2 videos
    var i = Math.floor(Math.random()*2);
    switch (i) {
        case 0:
            file = '/simplify.mp4';
            break;
        case 1:
            file = '/partial credit.mp4';
            break;
        default:
            alert('error - playPartial()');
    }
    playVideo();
} // end of playPartial()

function playAnswer() {
    // currently 2 videos
    var i = Math.floor(Math.random()*2);
    switch (i) {
        case 0:
            file = '/math is hard.mp4';
            break;
        case 1:
            file = '/what an idea.mp4';
            break;
        default:
          alert('error - playAnswer()');
    }
    playVideo();
} // end of playAnswer()

function playClose() {
    // currently 1 video
    file = '/no more.mp4';

    playVideo();
} // end of playClose()
