var mouse;
var cat;
var mouseAnimation,catAnimation,bgImage,foodImage;
var score=0;
var cheeseScore=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var obstacle,food;
var gameOver,gameOverImage;
var restart,restartImage;


function preload(){
mouseAnimation=loadAnimation("Images/rat0.png","Images/rat1.png","Images/rat2.png","Images/rat3.png","Images/rat4.png","Images/rat5.png","Images/rat6.png")
catAnimation=loadAnimation("Images/runningCat-0.png","Images/runningCat-1.png","Images/runningCat-2.png","Images/runningCat-3.png","Images/runningCat-4.png")
bgImage=loadImage("Images/Background.png");
foodImage=loadImage("Images/cheese.png");
cloudImage=loadImage("Images/cloud.png");
grassImage=loadImage("Images/grass.png");
mouseImage=loadImage("Images/rat0.png");
catImage=loadImage("Images/runningCat-0.png");
gameOverImage=loadImage("Images/gameOver.png");
restartImage=loadImage("Images/restart.png");
deadmouseImage=loadImage("Images/deadMouse.png");
}
function setup(){
  createCanvas(1500,700);

  mouse=createSprite(468,687,40,40);
  mouse.addAnimation("moving",mouseAnimation);
  //mouse.addImage(deadmouseImage);
  mouse.scale=0.8;
  mouse.setCollider("rectangle",0,0,mouse.width,mouse.height);
  

  cat=createSprite(184,609,20,20);
  cat.addAnimation("moving",catAnimation);
  cat.scale=0.25;

  cheese=createSprite(1165,44,30,30);
  cheese.addImage(foodImage);
  cheese.scale=0.25;

  foodGroup=new Group();
  obstacleGroup=new Group();
  
  ground=createSprite(709,690,1600,20);
  ground.shapeColor="green";
 
  gameOver=createSprite(750,250,40,40);
  gameOver.addImage(gameOverImage);

  deadMouse=createSprite(756,474,30,30);
  deadMouse.addImage(deadmouseImage);
  
  
}

function draw(){
  background(bgImage);
  fill("white");
  text(mouseX+","+mouseY,mouseX,mouseY);
// PLAYSTATE .....
  if(gameState==PLAY){
    textSize(70);
    text(" :- "+cheeseScore,1200,64);
    gameOver.visible=false;
    deadMouse.visible=false;
    mouse.visible=true;
    cat.visible=true

    if(keyDown("space")){
      mouse.velocityY=-15;
    }

    if(foodGroup.isTouching(mouse)){
      foodGroup[0].destroy();
      cheeseScore=cheeseScore+1;
    }
    if(obstacleGroup.isTouching(mouse)){
      gameState=END;
    }
   
   mouse.velocityY=mouse.velocityY+0.9;
    
    obstacles();
    foods();
    mouse.collide(ground);
    drawSprites();
//........
fill("black");
textSize(40);
strokeWeight(80);
  }
else if(gameState===END){
  mouse.visible=false;
  cat.visible=false;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  deadMouse.visible=true;
  if(keyDown(UP_ARROW)){
    gameState=PLAY;
    reset();
    }
}
  
}

function reset(){
  gameState="PLAY";
  obstacleGroup.destroyEach();
   foodGroup.destroyEach();
   
   cheeseScore=0;
}


function obstacles(){
  if(frameCount%120===0){
    obstacle=createSprite(1459,655,30,50);
    obstacle.shapeColor="red";
    obstacle.velocityX=-10;

    obstacleGroup.add(obstacle);
  }
}

function foods(){
  if(frameCount%180===0){
    food=createSprite(1359,452,50,50);
    food.addImage(foodImage);
    food.scale=0.25;
    food.velocityX=-10;
    food.lifetime=300;
    mouse.depth=food.depth+1;

    foodGroup.add(food);
  }
}
