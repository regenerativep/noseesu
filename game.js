var noteList = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

function setup()
{
    createCanvas(800,400);
    background(0,0,0);

}

function draw()
{
    ellipse(50, 50, 80, 80);
}

function keyPressed()
{
    for(let i = 0; i < noteList.length; i++)
    {
        note = noteList[i];
        let panning = map(ball.x, 0, width, -1.0, 1.0);
        let sound = loadSound('pitches/'+note)
        note.pan(panning);
        soundFile.play();
    }
    
}