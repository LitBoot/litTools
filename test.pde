ArrayList ellipse; //= new ArrayList();found in youtube to help me make circles falling
float[]xCoords; //method to define the variable
float[]yCoords;
float[]speeds;
boolean splash = true; //copy from example of how to make different backgrounds and start game
int score = 0;
int timelimit=21;//countDown code from YouTube
int time;

//color c1, c2;//from Mrs. Heinricher's advice
//float r1,g1,b1;
//float r2, g2, b2;
//color from = color(255, 100, 0);
//color to = color(255, 0, 0);
//color interA = lerpColor(from, to, .33);
//color interB = lerpColor(from, to, .66);
void setup() {
  size(800, 800);
  //r1=(float)(255);
  //g1=(float)(100)-100;
  //b1=(float)(0);
  //r2=(float)(255);
  //g2=(float)(100);
  //b2=(float)(0);
  //c1= color(r1,g1,b1);
  //c2=color(r2,g2,b2);
  noStroke();
  smooth();
  xCoords=new float[50];
  yCoords=new float[50];
  speeds=new float[50];



  for (int loc=0; loc<50; loc++) {

    xCoords[loc]=(float)(Math. random()*800);
    yCoords[loc]=(float) (Math. random()*800);
    speeds[loc]=(float) (1+Math.random()*7);
    // reds[loc]=(int) (Math.random()* 255);
    //orange[loc]=(int)(Math.random()*255);
  }
}
void draw() {
  //  r1=(float)random(255);
  //g1=(float)random(100)-100;
  //b1=(float)random(0);
  //r2=(float)random(255);
  //g2=(float)random(100);
  //b2=(float)random(0);

  background(0);
  textSize(36);
  if (splash) {
    fill(255, 200, 55);
    textSize(50);
    text("Use your mouse to click", width/2-280, height/2-100);
    text("to collect shooting stars.", width/2-280, height/2+50-100);
    text("You must collect red ones", width/2-280, height/2+100-100);
    text(" to get scores", width/2-280, height/2+150-100);
    text("Press the 'ENTER' to start", width/2-280, height/2+200-100);
  } else
  {
    //Display text on screen

    fill(255, 255, 255);
    int ms=millis()/1000;
    println(ms);
    time=timelimit-ms;
    if (time>0) {
      if (time<=21) {
        text("Time:" +time, 660, 30);
        text("Score: "+score, 530, 30);
      }
    }

    for (int loc=0; loc<50; loc++) {
      //r1=(float)random(255);
      //g1=(float)random(100)-100;
      //b1=(float)random(0);
      //r2=(float)random(255);
      //g2=(float)random(100);
      //b2=(float)random(0);
      //color from = color(255, 100, 0);
      //color to = color(255, 0, 0);
      yCoords[loc]= yCoords[loc]+speeds[loc];
      if (loc%2==0) {
        fill(255, 100, 0);
      } else {
        fill (255, 0, 0);
      }
      ellipse(xCoords[loc], yCoords[loc], 40, 40);
      if (yCoords[loc]>800) {
        yCoords[loc]=0;
      }
      if (time==0) {
        background(255, 0, 0);
        fill(255);
        text("TIME OVER", width/2-100, height/2-30);
        noLoop();
      }
    }
  }
}


void keyPressed() {

  if (keyCode == SHIFT)
  {
    splash = false;
  } else {
  }
}
void mouseClicked() {
  float x=random(800);
  float y=random(800);
  redraw();  //This functions allows the program to update the display window
}
