var pitchList = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

var hearDistance = 2000;
var hitDistance = 100;
var noteList = [];
var activeNotes = [];
var startTime;
var currentTime;
var ding;
var dang;

var threshold = 100; //Millisecond error threshold for pressing the note in time
var score = 0;

function preload()
{
    soundFormats("mp3");
    ding = loadSound("Sounds/Pitches/C.mp3");
    dang = loadSound("Sounds/Pitches/dang.mp3")
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
        let notActive = true;
        for(let j = 0; j < activeNotes.length; j++)
        {
            if(note.time==activeNotes[j].time)
            {
                notActive = false;
            }
        }
        if(note.time < currentTime+hearDistance && notActive)
        {
            let activeNote = {"time":note.time,"sound":loadSound('Sounds/Pitches/'+note.pitch+'.mp3')};
            activeNote.sound.playMode(sustain);
            activeNotes.push(activeNote);
        }
    }
    for(let i = 0; i < activeNotes.length; i++)
    {
        if(note.time < currentTime)
        {
            activeNotes.splice(i,1);
        }
        else
        {
            note = activeNotes[i];
            let panning = map(note.time, currentTime, currentTime+hearDistance, -1.0, 1.0); //left to right panning
            ellipse(width*(panning+1.0)/2, height/2, 80, 80);
            note.sound.pan(panning);
            note.sound.play();
        }
    }
}

function keyPressed()
{
    note = activeNotes[0];
    if (keyCode == 32) {
        if (Math.abs(note.time) - currentTime <= threshold) {
            score++;
            ding.play();

        } else {
            score--;
            dang.play();
        }
        activeNotes.splice(0, 1);
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