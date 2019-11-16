var hearDistance = 2000;
var noteList = [];
var currentTime;
function setup()
{
    createCanvas(800,400);
    background(0,0,0);
}

var noteList = [];

function loadSong(song)
{

}

function draw()
{
    for(let i = 0; i < noteList.length; i++)
    {
        note = noteList[i];
        let panning = map(note.time, 0, width, -1.0, 1.0);
        let sound = loadSound('pitches/'+note.pitch);
        ellipse(note.time, 50, 80, 80);
        sound.pan(panning);
        sound.play();
    }
}

function keyPressed()
{
    
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