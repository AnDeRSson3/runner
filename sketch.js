var runAni, run;
var ball, ballImg;
var back, backImg;
var wood, woodImg;
var woodGroup;
var ground;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var score;
score=0;

function preload(){
  runAni = loadAnimation("run1.png","run2.png","run3.png");
  ballImg = loadImage("ball.png");
  backImg = loadImage("back.png")
  woodImg = loadImage("hurdle.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  back = createSprite(200, 400, windowWidth, windowHeight);
  back.addImage("backs", backImg);
  back.velocityX=-1
  back.scale=1

  run = createSprite(300, 250, 10, 10);
  run.addAnimation("runner", runAni);
  run.scale=.25

  ball = createSprite(350, 530, 10, 10);
  ball.addImage("balling", ballImg);
  ball.scale=.025
  
  ground = createSprite(350, 590, 1200, 1);

  woodGroup= new Group();

  ground.visible=false
}


function draw() {
  background(0);
  run.velocityY+=3
if(gamestate==PLAY){
  if(run.collide(ground)==true){
    run.velocityY=0
  }

  if(back.x<windowWidth/2){
    back.x=950
  }

  if (keyDown("SPACE")&& run.y>445){
    run.velocityY= -40
  }
    
  run.setCollider("rectangle",-300,290,150,500);

  if(run.isTouching(woodGroup)){
    gamestate=END;
  }
  score = score + Math.round(getFrameRate()/60);
}

 if(gamestate==END){
      fill("yellow");
      textSize(50);
      text("Game Over", windowWidth/2-100, windowHeight/2);
      
      run.destroy();
      woodGroup.destroyEach();
      ball.destroy();
      back.destroy();
    }

  drawSprites();
  spawnObstacles()

   
   text("Score:"+ score,30,50);
}

function spawnObstacles(){
if(frameCount % 150 ==0){
  wood = createSprite(1900, 520, 10 ,10);
  wood.addImage("woods", woodImg);
  wood.scale=.2
  wood.velocityX=-11
  wood.lifetime=250
  woodGroup.add(wood);
  
}

}

