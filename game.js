var noteList = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
let C;

function preload() {
    //soundFormats(".mp3");
    C = loadSound('Sounds/Pitches/C.mp3', playNote);
}

function setup()
{
    createCanvas(800,400);
    background(0,0,0);
}

function draw()
{
    //C.play();
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

function playNote(sound) {
    sound.play();
}