//-------------------------------
// index001.js                  -
// 08/10/2020                   -
// 12:26                        -
// Code status: clean           -
//-------------------------------
//-------------------------------
// use strict mode              -
//-------------------------------
"use strict";
//-------------------------------
// define variables             -
//-------------------------------
var createaudiocontextbutton;
var playbutton;
var stopbutton;
var section1;
var section2;
var playbackControl;
var playbackValue;
var loopstartControl;
var loopstartValue;
var loopendControl;
var loopendValue;
var request;
var audioContext;
var source;
var myBuffer;
var songLength;
//-------------------------------
// initialize variables         -
//-------------------------------
createaudiocontextbutton = document.getElementById('createaudiocontextbutton');
playbutton = document.getElementById('playbutton');
stopbutton = document.getElementById('stopbutton');
section1 = document.getElementById('section1');
section2 = document.getElementById('section2');
playbackControl = document.getElementById('playback-rate-control');
playbackValue = document.getElementById('playback-rate-value');
loopstartControl = document.getElementById('loopstart-control');
loopstartValue = document.getElementById('loopstart-value');
loopendControl = document.getElementById('loopend-control');
loopendValue = document.getElementById('loopend-value');
playbackControl.setAttribute('disabled', 'disabled');
loopstartControl.setAttribute('disabled', 'disabled');
loopendControl.setAttribute('disabled', 'disabled');
stopbutton.setAttribute('disabled', 'disabled');
//-------------------------------
// getData                      -
//-------------------------------
function getData(filename) {
    request = new XMLHttpRequest();
    request.open('GET', filename, true);
    request.setRequestHeader('Content-type', 'application/octet-stream');
    request.responseType = 'arraybuffer';
    request.onload = decodeAudio;
    request.send();
}
//-------------------------------
// decodeAudio                  -
//-------------------------------
function decodeAudio() {
    var audioData;
    audioData = request.response;
    audioContext.decodeAudioData(audioData, setupbuffer, displaydecodingerror);
}
//-------------------------------
// setupbuffer                  -
//-------------------------------
function setupbuffer(buffer) {
    myBuffer = buffer;
    songLength = buffer.duration;
    source.buffer = myBuffer;
    source.playbackRate.value = Number(playbackControl.value);
    source.connect(audioContext.destination);
    source.loop = true;
    loopstartControl.setAttribute('max', Math.floor(songLength).toString());
    loopendControl.setAttribute('max', Math.floor(songLength).toString());
}
//-------------------------------
// displaybuttondecodingerror   -
//-------------------------------
function displaydecodingerror() {
    section1.innerHTML = "Error with decoding audio data";
}
//-------------------------------
// playbutton                         -
//-------------------------------
playbutton.onclick = function () {
    getData('./audio/viper.ogg');
    source.start(0);
    playbutton.setAttribute('disabled', 'disabled');
    stopbutton.removeAttribute('disabled');
    playbackControl.removeAttribute('disabled');
    loopstartControl.removeAttribute('disabled');
    loopendControl.removeAttribute('disabled');
};
//-------------------------------
// stopbutton                         -
//-------------------------------
stopbutton.onclick = function () {
    source.stop(0);
    playbutton.removeAttribute('disabled');
    stopbutton.setAttribute('disabled', 'disabled');
    playbackControl.setAttribute('disabled', 'disabled');
    loopstartControl.setAttribute('disabled', 'disabled');
    loopendControl.setAttribute('disabled', 'disabled');
};
//-------------------------------
// playbackControl              -
//-------------------------------
playbackControl.oninput = function () {
    source.playbackRate.value = Number(playbackControl.value);
    playbackValue.innerHTML = playbackControl.value;
};
//-------------------------------
// loopstartControl             -
//-------------------------------
loopstartControl.oninput = function () {
    source.loopStart = Number(loopstartControl.value);
    loopstartValue.innerHTML = loopstartControl.value;
};
//-------------------------------
// loopendControl               -
//-------------------------------
loopendControl.oninput = function () {
    source.loopEnd = Number(loopendControl.value);
    loopendValue.innerHTML = loopendControl.value;
};
//-----------------------------------
// createaudiocontextbutton.onclick -
//-----------------------------------
createaudiocontextbutton.onclick = function () {
    audioContext = new AudioContext();
    source = audioContext.createBufferSource();
    section2.innerHTML = "Audio Context Created.";
};
