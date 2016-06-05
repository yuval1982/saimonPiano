// Tasks:
// playNote as reusable function
// -. when note is played play sounds
// -. sound when loosing
// -. sound when correct seq
// Score
// BONUS:
// support mute 
// visual
// keep max score in localStorage
// levels

 

'use strict';

var note1 = new Audio('sound/note1.wav');
var note2 = new Audio('sound/note2.wav');
var note3 = new Audio('sound/note3.wav');
var note4 = new Audio('sound/note4.wav');

var NOTES = [
    {sound: note1},
    {sound: note2},
    {sound: note3},
    {sound: note4}
            ];

// This is my State:
var gState = {
    isUserTurn : false,
    playedNotes: [],
    currNoteToClick: 0
}

function init() {

    computerTurn();     // 
}

function addRandomNote() {
    gState.playedNotes.push(getRandomIntInclusive(0,NOTES.length-1));
}

function playNotes() {
    
    gState.playedNotes.forEach(function (playedNote, i) {
        var elNote = document.querySelector('[data-note="'+ playedNote+'"]');;
        setTimeout(function () {
            playNote(playedNote, elNote);
        }, 1000 * i);

    });
    
    setTimeout(function () {
        console.log('Done Playing Sequence!!');
        gState.isUserTurn = true;
    }, 1000 * gState.playedNotes.length);
   
}

function playNote(playedNote, elNote) {
    NOTES[playedNote].sound.play();
    elNote.classList.add('playing');
    
    setTimeout(function donePlayingNote() {
        elNote.classList.remove('playing');
    }, 500);
     // A test to check, if class remains!
    testCondition((elNote.classList.contains('playing')),'class .playing wasnt dropped');
}

function noteClicked(elNote) {
    
    if (!gState.isUserTurn) return;
    var playedNote = +elNote.getAttribute('data-note');
    console.log('playedNote is: ', playedNote);
    
    // User clicked the right note
    if (playedNote === gState.playedNotes[gState.currNoteToClick]) {
        playNote(playedNote, elNote)
        console.log('User OK!');
        gState.currNoteToClick++;
        
        if (gState.currNoteToClick === gState.playedNotes.length) {
            console.log('well played!');
            setTimeout(computerTurn, 2000);
            
        }  
        
    } else {
        console.log('User Wrong!');
        var elPiano = document.querySelector('.simon');
        elPiano.style.display = 'none';
        //Is elPiano a string.
        testString(elPiano);
        testCondition((elPiano.style.display === 'none'),'elPiano is hidden, user lost');
        
    }
    
    // console.log('elNote', elNote);
    // console.log('Note', NOTES[noteIndex]);

}

function computerTurn() {

    gState.isUserTurn = false;
    gState.currNoteToClick  = 0;
    //alert('User Turn is Over');
    
    addRandomNote();
    playNotes();

    //Checking end of users turn.
    testCondition((gState.isUserTurn === true), 'Users turn isnt off!');
    
}


