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