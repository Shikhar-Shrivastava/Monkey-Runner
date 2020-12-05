var monkey , monkey_running,monkeyJump
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  monkeyJump= loadImage("sprite_3.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
   
}


function setup() {
createCanvas(600,400)
monkey = createSprite(50,350);
monkey.addAnimation("run",monkey_running);
monkey.addImage("monkeyJump",monkeyJump)
monkey.scale=0.1;


ground = createSprite(300,360,600,10);
ground.shapeColor = ("brown")

FoodGroup = new Group();
obstacleGroup = new Group();
}


function draw() {
background("lightgreen")
  
 if(keyDown('space')&& monkey.y>320) 
 {
   monkey.velocityY=-10
   monkey.changeImage("monkeyJump",monkeyJump);
 }
 if(monkey.isTouching(ground))
 {
   monkey.changeAnimation("run",monkey_running); 
 }

monkey.velocityY = monkey.velocityY+0.5;
monkey.collide(ground);
 
  console.log (monkey.y) 
  
ofobstacles();
  
 if(obstacleGroup.isTouching(monkey)||score===200)
    {
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
   
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
   
    monkey.changeImage("monkeyJump",monkeyJump);
    monkey.velocityY= 0
    }
  
  
bananaX()
   
  if (FoodGroup.isTouching(monkey))
    {
      FoodGroup.destroyEach();
      score= score+5
    }
 
 drawSprites(); 
  fill("black")
  textSize(20)
  text("Score:"+score,500,30)
  
  if(obstacleGroup.isTouching(monkey))
    {
    text("game over",150,200, textSize(50),fill("red"));
    }
  if(score===200){
    text("YOU WIN!!",150,200, textSize(50),fill("red"));
  }
}

function ofobstacles(){
  if(frameCount%100===0)
  {
    obstacle = createSprite(620,340)
    obstacle.addImage("o",obstacleImage)
    obstacle.scale=0.1
    obstacle.velocityX= -(6+score/30)
    obstacleGroup.add(obstacle)

    obstacle.setCollider("circle",0,0,150)
    obstacle.lifetime=110
  }
 
}

function bananaX(){
  if(frameCount%120===0)
  {
    banana = createSprite(650,Math.round(random(220,270)))
   
    banana.addImage("b",bananaImage)
    banana.velocityX= -(6+score/70);
    banana.scale=0.1;
    banana.lifetime=110
    
    banana.setCollider("rectangle",0,0,500,300)
    
    FoodGroup.add(banana)
   
  }
 
}

