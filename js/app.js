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

var NOTES = [
    {sound: 'string1'},
    {sound: 'string2'},
    {sound: 'string3'},
    {sound: 'string4'}
]

// This is my State:
var gState = {
    isUserTurn : false,
    seqNoteIndexes: [],
    currNoteIndexToClick: 0
}


function init() {
   NOTES = createNotesModel(4);
    //renderPiano(NOTES);
    computerTurn();
}

function createNotesModel(size){
    var notes = [];

    for (var i = 0; i < size; i++) {
       var note = {sound : 'Note' + (i+1)};
        //A test to see if Note is a string.
        testString(note);
       notes.push(note);
    }
    return notes;
}


function addRandomNote() {
    gState.seqNoteIndexes.push(getRandomIntInclusive(0,NOTES.length-1));
}


function playSeq() {
    
    var elNotes = document.querySelectorAll('.note');
    
    gState.seqNoteIndexes.forEach(function (seqNoteIndex, i) {
        
        setTimeout(function playNote() {
            elNotes[seqNoteIndex].classList.add('playing');
            
            setTimeout(function donePlayingNote() {
                elNotes[seqNoteIndex].classList.remove('playing');

                // A test to check, if class remains!
                testCondition((elNotes[seqNoteIndex].classList.contains('playing')),'class playing wasnt dropped')
            }, 500);

            console.log('Playing: ', NOTES[seqNoteIndex].sound);
        }, 1000 * i);


    });
    
    setTimeout(function () {
        console.log('Done Playing Sequence!!');
        gState.isUserTurn = true;
    }, 1000 * gState.seqNoteIndexes.length);
   
}

function noteClicked(elNote) {
    
    if (!gState.isUserTurn) return;
    var noteIndex = +elNote.getAttribute('data-note');
    console.log('noteIndex is: ', noteIndex);
    
    
    // User clicked the right note
    if (noteIndex === gState.seqNoteIndexes[gState.currNoteIndexToClick]) {
        console.log('User OK!');
        gState.currNoteIndexToClick++;
        
        if (gState.currNoteIndexToClick === gState.seqNoteIndexes.length) {
            computerTurn();
        }
        
        
    } else {
        console.log('User Wrong!');
        var elPiano = document.querySelector('.piano');
        elPiano.style.display = 'none';
        //Is elPiano a string.
        testString(elPiano);
        testCondition((elPiano.style.display === 'none'),'elPiano is is hidden, user lost');
        
    }
    
    // console.log('elNote', elNote);
    console.log('Note', NOTES[noteIndex]);
   
    
}

function computerTurn() {

     gState.isUserTurn = false;
     gState.currNoteIndexToClick  = 0;

    //Checking end of users turn.
    testCondition((gState.isUserTurn === true), 'Users turn isnt off!');

     addRandomNote();
     playSeq();
}


