private int currentPitch;
private int maxPitch;
private float currentTime;
private float timeJump;
private ArrayList<Note> noteList;
private int columnWidth;
private int rowHeight;
private boolean leftPressed, prevLeftPressed, rightPressed, prevRightPressed, upPressed, prevUpPressed, downPressed, prevDownPressed, spacePressed, prevSpacePressed, sPressed, prevSPressed;
void setup()
{
  currentPitch = 0;
  maxPitch = 11;
  currentTime = 0;
  float bpm = 120;
  timeJump = (1000 * 60) / bpm;
  noteList = new ArrayList<Note>();
  columnWidth = 16;
  rowHeight = 16;
  leftPressed = false;
  prevLeftPressed = false;
  rightPressed = false;
  prevRightPressed = false;
  upPressed = false;
  prevUpPressed = false;
  downPressed = false;
  prevDownPressed = false;
  spacePressed = false;
  prevSpacePressed = false;
  sPressed = false;
  prevSPressed = false;
  size(512, 512);
}
void update()
{
  if(leftPressed && !prevLeftPressed)
  {
    currentPitch -= 1;
    if(currentPitch < 0) currentPitch = maxPitch;
  }
  if(rightPressed && !prevRightPressed)
  {
    currentPitch += 1;
    if(currentPitch > maxPitch) currentPitch = 0;
  }
  if(upPressed && !prevUpPressed)
  {
    currentTime += timeJump;
  }
  if(downPressed && !prevDownPressed)
  {
    currentTime -= timeJump;
  }
  if(spacePressed && !prevSpacePressed)
  {
    noteList.add(new Note(currentPitch, currentTime));
  }
  if(sPressed && !prevSPressed)
  {
    saveToJSON();
  }
  prevLeftPressed = leftPressed;
  prevRightPressed = rightPressed;
  prevUpPressed = upPressed;
  prevDownPressed = downPressed;
  prevSpacePressed = spacePressed;
  prevSPressed = sPressed;
}
class Vector2
{
  public float x;
  public float y;
  public Vector2(float x, float y)
  {
    this.x = x;
    this.y = y;
  }
}
public Vector2 addVectors(Vector2 a, Vector2 b)
{
  return new Vector2(a.x + b.x, a.y + b.y);
}
void DrawRectangle(Vector2 a, Vector2 b, color col)
{
  fill(col);
  noStroke();
  rect(a.x, a.y, b.x - a.x, b.y - a.y);
}
void draw()
{
  update();
  background(0);
  Vector2 tl = new Vector2(currentPitch * columnWidth, 0);
  Vector2 sz = new Vector2(columnWidth, rowHeight);
  Vector2 br = addVectors(tl,sz);
  fill(255, 255, 255, 0.5f);
  rect((int)(currentPitch * columnWidth), 0, columnWidth, rowHeight);
  DrawRectangle(tl, br, color(255, 255, 255, 127));
  for(int i = 0; i < noteList.size(); i++)
  {
      Note note = noteList.get(i);
      tl = new Vector2(note.Pitch * columnWidth, -(note.Time - currentTime) / 1000f * rowHeight);
      br = addVectors(tl,sz);
      DrawRectangle(tl, br, color(0, 0, 255));
  }
}
void saveToJSON()
{
  JSONObject json = new JSONObject();
  JSONArray noteArray = new JSONArray();
  for(int i = 0; i < noteList.size(); i++)
  {
    Note note = noteList.get(i);
    JSONObject noteObject = new JSONObject();
    noteObject.setFloat("time", note.Time);
    noteObject.setInt("pitch", note.Pitch);
    noteArray.append(noteObject);
  }
  json.setJSONArray("noteList", noteArray);
  saveJSONObject(json, "map.json");
}
void keyPressed()
{
  switch(keyCode)
  {
    case LEFT:
      leftPressed = true;
      break;
    case RIGHT:
      rightPressed = true;
      break;
    case DOWN:
      downPressed = true;
      break;
    case UP:
      upPressed = true;
      break;
  }
  if(key == ' ')
  {
    spacePressed = true;
  }
  else if(key == 's')
  {
    sPressed = true;
  }
}
void keyReleased()
{
  switch(keyCode)
  {
    case LEFT:
      leftPressed = false;
      break;
    case RIGHT:
      rightPressed = false;
      break;
    case DOWN:
      downPressed = false;
      break;
    case UP:
      upPressed = false;
      break;
  }
  if(key == ' ')
  {
    spacePressed = false;
  }
  else if(key == 's')
  {
    sPressed = false;
  }
}
