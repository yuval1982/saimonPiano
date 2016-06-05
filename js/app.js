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
    renderPiano(NOTES); // draw the piano
    computerTurn();     // 
}

function renderPiano(notes) {
    // mapping notes to html tags
    var strHtmls = notes.map(function(note, i){
        var strHtml =  '<div class="note" onclick="noteClicked(this)" data-note="'+i+'"' + 
                             'style="background:'+ note.color +'">' + 
                            note.sound + 
                        '</div>';
        return strHtml;
    });
    
    var elPiano = document.querySelector('.piano');
    elPiano.innerHTML = strHtmls.join('');
}

function addRandomNote() {
    gState.playedNotes.push(getRandomIntInclusive(0,NOTES.length-1));
}

function playNotes() {
    
    var elNotes = document.querySelectorAll('.note');
    
    gState.playedNotes.forEach(function (playedNote, i) {
        
        setTimeout(function () {
            playNote(playedNote, elNotes);
        }, 1000 * i);

    });
    
    setTimeout(function () {
        console.log('Done Playing Sequence!!');
        gState.isUserTurn = true;
    }, 1000 * gState.playedNotes.length);
   
}

function playNote(playedNote, elNotes) {
    NOTES[playedNote].sound.play();
    elNotes[playedNote].classList.add('playing');
    
    setTimeout(function donePlayingNote() {
        elNotes[playedNote].classList.remove('playing');
    }, 500);
     // A test to check, if class remains!
    testCondition((elNotes[seqNoteIndex].classList.contains('playing')),'class .playing wasnt dropped');
}

function noteClicked(elNote) {
    
    if (!gState.isUserTurn) return;
    var noteIndex = +elNote.getAttribute('data-note');
    console.log('noteIndex is: ', noteIndex);
    
    // User clicked the right note
    if (noteIndex === gState.playedNotes[gState.currNoteToClick]) {
        console.log('User OK!');
        gState.currNoteToClick++;
        
        if (gState.currNoteToClick === gState.playedNotes.length) {
            console.log('well played!');
            computerTurn();
        }  
        
    } else {
        console.log('User Wrong!');
        var elPiano = document.querySelector('.piano');
        elPiano.style.display = 'none';
        //Is elPiano a string.
        testString(elPiano);
        testCondition((elPiano.style.display === 'none'),'elPiano is hidden, user lost');
        
    }
    
    // console.log('elNote', elNote);
    console.log('Note', NOTES[noteIndex]);

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


