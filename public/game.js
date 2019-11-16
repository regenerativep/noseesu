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

var threshold = 300; //Millisecond error threshold for pressing the note in time
var score = 0;
var winScore = 20;

function preload()
{
    soundFormats("mp3");
    ding = loadSound("Sounds/old_ding.mp3");
    dang = loadSound("Sounds/dang.mp3");
    let beatmapNotes = [
        {
          "time": 0,
          "pitch": 2
        },
        {
          "time": 250,
          "pitch": 11
        },
        {
          "time": 500,
          "pitch": 0
        },
        {
          "time": 750,
          "pitch": 8
        },
        {
          "time": 1000,
          "pitch": 8
        },
        {
          "time": 1250,
          "pitch": 0
        },
        {
          "time": 1500,
          "pitch": 2
        },
        {
          "time": 1750,
          "pitch": 11
        },
        {
          "time": 2000,
          "pitch": 2
        },
        {
          "time": 2250,
          "pitch": 11
        },
        {
          "time": 2500,
          "pitch": 0
        },
        {
          "time": 2750,
          "pitch": 8
        },
        {
          "time": 3000,
          "pitch": 8
        },
        {
          "time": 3250,
          "pitch": 0
        },
        {
          "time": 3500,
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
    fill(255);
    text(score,20,20);
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
            let note = noteList[i];
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
            let note = activeNotes[i];
            if(note.time < currentTime) 
            {
                note.sound.stop();
                activeNotes.splice(i,1);
                score--;
                dang.setVolume(0.2);
                dang.play();
                //note.stop();
            }
            else
            {
                note = activeNotes[i];
                let panning = map(note.time, currentTime, currentTime+hearDistance, -1.4, 1.0); //left to right panning
                if(panning > 1) panning = 1
                if(panning < -1) panning = -1
                let volume = map(note.time, currentTime, currentTime+hearDistance, 0, 1.0);
                //console.log("note.time: " + note.time);
                //console.log("currentTime: " + currentTime);
                console.log("Pan: " + panning);
                ellipse(width*(panning+1.0)/2, height/2, 80, 80);
                note.sound.pan(panning);
                note.sound.setVolume(1-volume);
                note.sound.play();
            }
        }
    }
}

function keyPressed()
{
    if(startTime == -1){
        startTime = millis();
    }
    if (activeNotes.length > 0){
        note = activeNotes[0];
        if (keyCode == 32) {
            if (Math.abs(note.time) - currentTime <= threshold) {
                score++;
                ding.setVolume(0.1);
                ding.play();

            } else {
                score--;
                dang.setVolume(0.2);
                dang.play();
            }
            note.sound.stop();
            activeNotes.splice(0, 1);
        }
    }
}

function keyPressedWithPitches() //to replace keyPressed after we make sure things work
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
    note.time *= 3;
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