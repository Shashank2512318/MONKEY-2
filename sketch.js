var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score= 0;
var Edges;
var play= 1;
var over= 2;
var gameState= play;
var touch= 0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImage = loadImage("restart-removebg-preview.png");
  background1Image = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  background1 = createSprite(500, 230, 10, 10);
  background1.addImage(background1Image);
  background1.scale= 2.8;
  
  
  
  monkey = createSprite(100, height-100, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale= 0.2
  
  obstacleGroup= new Group();
  
  FoodGroup= new Group();
  
  restart = createSprite(width/2, height/2, 10, 10);
  restart.scale= 0.5
  restart.visible= false;
  restart.addImage(restartImage);
  
  Edges= createEdgeSprites();
  
}



function draw() {
background("white");
  
  

  
  monkey.collide(Edges[3]);
  
  restart.visible= false;
  
  if(gameState === play) {
    spawnObstacles();
    
    spawnbananas();
    
    if(background1.x < 0) {
       background1.x= background1.width/2;
    }
    
    background1.velocityX= -(5+1* score/ 2);

      if(touches.length > 0 || keyDown("space") && monkey.y>= height-80) {
      monkey.velocityY= -25;
     
     }
   
    monkey.velocityY= monkey.velocityY+1;
    
    obstacleGroup.setVelocityXEach(background1.velocityX);
    
    FoodGroup.setVelocityXEach(background1.velocityX);
    
      if(monkey.isTouching(FoodGroup)) {
        score= score+2;
        FoodGroup.destroyEach();
      }
  
    
    if(monkey.isTouching(obstacleGroup)) {
      touch= touch+1;
      monkey.scale= 0.1;
      obstacleGroup.destroyEach();
      
    }

    
  if ((touch === 2)){
      gameState= over;
      
      }
}
  
     
    
      switch(score)  {
      case 10: monkey.scale= 0.14;
             break; 
      case 20: monkey.scale= 0.16;
              break;
      case 30: monkey.scale= 0.18;
              break;
      case 40: monkey.scale= 0.2;
              break;
              default:break;
    
    }
  

  

  
  
  
  if(gameState === over) {
    restart.visible= true;
    background1.velocityX= 0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    if(mousePressedOver(restart)){
      reset();
      
    }
  }
  
  drawSprites();
  
  text("Survival Time : "+score, width-120, 50);
  
}

function reset() {
  score= 0;
  gameState= play;
  touch= 0;
  monkey.x= 100;
  monkey.y= height-100;
  monkey.scale= 0.2;
  
}

function spawnObstacles() {
  if(frameCount % 150 === 0){
  stones = createSprite(550, height-50, 10, 10);
  stones.velocityX= -5;
  stones.scale= 0.1;  
  stones.addImage(obstacleImage);
  stones.lifetime= 310;
  obstacleGroup.add(stones);  
  }
}

function spawnbananas() {
  if(frameCount % 60 === 0) {
  banana = createSprite(550,Math.round(random(300, 400), 10, 10));
  banana.velocityX= -5;
  banana.addImage(bananaImage);
  banana.scale= 0.1;
  banana.lifetime= 310;
  FoodGroup.add(banana);
  }
}

