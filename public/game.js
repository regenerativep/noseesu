var noteList = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
var C;

var hearDistance = 2000;
var hitDistance = 100;
var noteList = [];
var startTime;
var currentTime;
var C;

function preload()
{
    soundFormats("mp3");
    C = loadSound("Sounds/Pitches/C.mp3");
    console.log("preloaded");
}

function setup()
{
    createCanvas(800,400);
    background(0,0,0);
    startTime = millis(); //change this to wheneveer the actual game starts
}

function draw()
{
    currentTime = millis() - startTime;
    for(let i = 0; i < noteList.length; i++)
    {
        note = noteList[i];
        let panning = map(note.time, currentTime, currentTime+hearDistance, -1.0, 1.0); //left to right panning
        let sound = loadSound('Sounds/Pitches/'+note.pitch+'.mp3');
        ellipse(width*(panning+1.0)/2, height/2, 80, 80);
        C.setLoop(true);
        C.play();
        C.pan(1.0);
        //console.log(panning);
    }
}

function keyPressed()
{
    if (keyCode == 32) {
        C.play(); 
        for (var i = 0; i < 1000; i++) {
            console.log(i);
            C.pan(i/500 - 1.0);
            fill(0);
            ellipse(i,20,40,40);
            fill(255);
            ellipse(i,20,40,40);
        }
    }
}

function loadMap(jsonStr)
{
    let jsonObj = JSON.parse(jsonStr);
    let noteList = jsonObj["notes"];
    for(let i = 0; i < noteList.length; i++)
    {
        let note = noteList[i];
        addNote(note);
    }
    currentTime = 0;
    console.log("loaded map with " + noteList.length + " notes");
}
function addNote(note)
{
    noteList.push(note);
    noteList.sort((a,b) => {
        return Math.sign(a.time - b.time);
    });
}

function playNote(note) {
    note.play();
}