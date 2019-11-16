var hearDistance = 2000;
var noteList = [];
var currentTime;

function preLoad()
{
    soundFormats('mp3');
}

function setup()
{
    createCanvas(800,400);
    background(0,0,0);
}

function draw()
{
    for(let i = 0; i < noteList.length; i++)
    {
        note = noteList[i];
        let panning = map(note.time, currentTime, currentTime+hearDistance, -1.0, 1.0); //left to right panning
        let sound = loadSound('pitches/'+note.pitch+'.mp3');
        ellipse(width*(panning+1.0)/2, height/2, 80, 80);
        sound.pan(panning);
        sound.play();
    }
}

function keyPressed()
{
    ellipse(0,20,40,40);
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