var hearDistance = 2000;
var noteList = [];
var currentTime;
function setup()
{

}

function draw()
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