//var pitchList = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
var pitchMap = {"C":0, "Db":1, "D":2, "Eb":3, "E":4, "F":5, "Gb":6, "G":7, "Ab":8, "A":9, "Bb":10, "B":11};
var reversePitchMap = {0:"C", 1:"Db", 2:"D", 3:"Eb", 4:"E", 5:"F", 6:"Gb", 7:"G", 8:"Ab", 9:"A", 10:"Bb", 11:"B"};

var hearDistance = 1000;
var hitDistance = 100;
var noteList = [];
var activeNotes = [];
var startTime = -1;
var currentTime;
var ding;
var dang;
var winSound;

var threshold = 200; //Millisecond error threshold for pressing the note in time
var score = 0;
var winScore = 20;

function preload()
{
    soundFormats("mp3");
    ding = loadSound("Sounds/ding.mp3");
    dang = loadSound("Sounds/dang.mp3");
    let beatmapNotes = [
        {
          "time": -1000,
          "pitch": 10
        },
        {
          "time": 0,
          "pitch": 7
        },
        {
          "time": 1000,
          "pitch": 9
        },
        {
          "time": 2000,
          "pitch": 5
        },
        {
          "time": 3000,
          "pitch": 7
        },
        {
          "time": 4000,
          "pitch": 3
        },
        {
          "time": 5000,
          "pitch": 2
        },
        {
          "time": 6000,
          "pitch": 8
        },
        {
          "time": 7000,
          "pitch": 10
        },
        {
          "time": 8000,
          "pitch": 7
        },
        {
          "time": 7000,
          "pitch": 9
        },
        {
          "time": 9000,
          "pitch": 10
        },
        {
          "time": 10000,
          "pitch": 11
        },
        {
          "time": 11000,
          "pitch": 7
        },
        {
          "time": 12000,
          "pitch": 9
        },
        {
          "time": 13000,
          "pitch": 5
        }
      ];
    for(let i = 0; i < beatmapNotes.length; i++)
    {
        addNote(beatmapNotes[i]);
    }
    //loadMap(beatmap);
    winSound = loadSound("Sounds/win.mp3");
    console.log("preloaded");
}

function setup()
{
    createCanvas(800,400);
    background(0,0,0);
}

function draw()
{
    background(0);
    if (score >= winScore) {
        winSound.play();
    }
    if(startTime == -1)
    {

    }
    else if (startTime != -1) {
        currentTime = millis() - startTime;
        for(let i = 0; i < noteList.length; i++)
        {
            note = noteList[i];
            if(note.time < currentTime+hearDistance && !note.active)
            {
                //let activeNote = {"time":note.time,"sound":loadSound('Sounds/Pitches/'+note.pitch+'.mp3')};

                note.sound.playMode('untilDone');
                activeNotes.push(note);
                note.active = true;
            }
        }
        for(let i = activeNotes.length - 1; i >= 0; i--)
        {
            if(note.time < currentTime) 
            {
                note.sound.stop();
                activeNotes.splice(i,1);
                note.stop();
            }
            else
            {
                note = activeNotes[i];
                let panning = map(note.time, currentTime, currentTime+hearDistance, -1.0, 1.0); //left to right panning
                //console.log("note.time: " + note.time);
                //console.log("currentTime: " + currentTime);
                console.log("Pan: " + panning);
                ellipse(width*(panning+1.0)/2, height/2, 80, 80);
                note.sound.pan(panning);
                note.sound.play();
            }
        }
    }
}

function keyPressedOld()
{
    if(startTime == -1){
        startTime = millis();
    }
    if (activeNotes.length > 0){
        note = activeNotes[0];
        if (keyCode == 32) {
            if (Math.abs(note.time) - currentTime <= threshold) {
                score++;
                ding.play();

            } else {
                score--;
                dang.play();
            }
            note.sound.stop();
            activeNotes.splice(0, 1);
        }
    }
}

function keyPressed() //to replace keyPressed after we make sure things work
{
    if(startTime == -1)
    {
        startTime = millis();
    }else{
        activeNotes[1].lastNotePressed = true;
        let prevNote = null;
        if (prevNote != null) {
            prevPitch = pitchMap[prevNote.pitch];
        } else {
            prevPitch = null;
        }
        note = activeNotes[0];
        pitch = pitchMap[note.pitch]
        if (Math.abs(note.time) - currentTime <= threshold) {
            if (prevPitch == null || pitch == prevPitch && keyCode == 83 || pitch > prevPitch && keyCode == 68 || pitch < prevPitch && keyCode == 65) {
                score++;
                ding.play();
            } else {
                score--;
                dang.play();
            }
        } else {
            score--;
            dang.play();
        }
        prevNote = note;
        note.stop();
        activeNotes.splice(0, 1);
    }
}

function loadMap(jsonStr)
{
    //let jsonObj = JSON.parse(jsonStr);
    jsonObj = jsonStr;
    let notes = jsonObj["notes"];
    for(let i = 0; i < notes.length; i++)
    {
        let note = notes[i];
        addNote(note);
    }
    currentTime = 0;
    console.log("loaded map with " + noteList.length + " notes");
}
function addNote(note)
{
    note.pitch = reversePitchMap[note.pitch];
    note.sound = loadSound('Sounds/Pitches/'+note.pitch+'.mp3');
    note.time += hearDistance;
    note.active = false;
    note.lastNotePressed = false;
    noteList.push(note);
    noteList.sort((a,b) => {
        return Math.sign(a.time - b.time);
    });
}

function playNote(note) {
    note.play();
}