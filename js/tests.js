
// Note, this is running after the init
function runTests() {
    console.log('Running the Tests');
    
    console.log('Testing the init');
    console.assert(gState.seqNoteIndexes.length === 1, 'Should add a note to the seq');
    console.assert(gState.isUserTurn === false, 'Should set the computer as first turn');
}



// function testTurns(){
//     assert(typeof argumentName === "string");
// }


function testCondition(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}


function assert2(value, description) {
    var result = value ? "pass" : "fail";
    console.log(result + ' - ' +  description);
};