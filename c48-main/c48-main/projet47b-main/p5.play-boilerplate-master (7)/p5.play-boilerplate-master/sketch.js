var spaceship,spaceshipGrp;
var alienship,alienshipGrp;
var bullet;
var background;
var score=0,time;
var spaceshipImg;
var alienshipImg;
var bulletImg;
var spacebgIMG;
var alienIMG1,alienIMG2,alienIMG3,alienIMG4,laienIMG5;
var astroid,astroidIMG;
var alien1,alien2,alien3,alien4,alien5;
var aliengrp1,aliengrp2,aliengrp3,aliengrp4;
var asteroidgrp;
var enemyGroup;
var gameState="play";
var survivalTime;
var restart;
var endTie,startTime,st;

function preload(){
  spaceshipImg=loadImage("images/spaceship-PNG-File.png");
  bulletImg=loadImage("images/bullet.png");
  spacebgIMG=loadImage("images/space-bg.jpg");
  alienIMG1=loadImage("images/alien1.png");
  alienIMG2=loadImage("images/alien2.jpg");
  alienIMG3=loadImage("images/alien3.jpg");
  alienIMG4=loadImage("images/alien4.png");
  asteroidIMG=loadImage("images/Asteroid.png");
  expSound=loadSound("sound/explosion.mp3");
  expImg=loadImage("images/explosion.png");
  bulletSound=loadSound("sound/shooting.mp3")



}

function setup() {
  createCanvas(displayWidth,displayHeight);
  space=createSprite(400,0,800,800)
  space.addImage(spacebgIMG)
  space.scale=1.5
  space.y=space.height/2
  spaceship=createSprite(displayWidth/2-15,displayHeight-100,50,50);
  spaceship.addImage(spaceshipImg);
  spaceship.scale=0.2
 
  
  asteroidGroup=createGroup();
  alien1Group=createGroup();
  alien2Group=createGroup();
  alien3Group=createGroup();
  alien4Group=createGroup();
  bulletGroup=createGroup();
  enemyGroup=createGroup();
  

  rectMode(CENTER);


}

function draw() {
  background(0);
 if(gameState==="play"){
  spaceship.x=mouseX;
  space.velocityY = 2;
  survivalTime=Math.ceil(frameCount/frameRate())

  startTime=performance.now()

  


  
  if (space.y > 500) {
    space.y = space.height/2;
  }
  
  if (keyDown("space")) {
    createBullet(spaceship.x);
  }
  
  if (bulletGroup.isTouching(asteroidGroup)) {
    asteroidGroup.destroyEach();
    bulletGroup.destroyEach();
    score = score + 1;
  } else if (bulletGroup.isTouching(alien1Group)) {
    alien1Group.destroyEach();
    bulletGroup.destroyEach();
    score = score + 1;
  } else if (bulletGroup.isTouching(alien2Group)) {
    alien2Group.destroyEach();
    bulletGroup.destroyEach(); 
    score = score + 1;
  } else if (bulletGroup.isTouching(alien3Group)) {
    alien3Group.destroyEach();
    bulletGroup.destroyEach();
    score = score + 1;
  }else if(bulletGroup.isTouching(alien4Group)){
    alien4Group.destroyEach();
    bulletGroup.destroyEach();
    score = score + 1;
  }
  
  
  
  
  var select_enemy = Math.round(random(0,4));
  
  if (World.frameCount % 50 == 0) {
    if (select_enemy == 0) {
      createAsteroid();
    } else if (select_enemy == 1) {
      createAlien1();
    } else if (select_enemy == 2) {
      createAlien2();
    } else if(select_enemy===3) {
      createAlien3();
    }else {
      createAlien4()
    }
    
  }

  if(spaceship.isTouching(enemyGroup)){
    expSound.play();
    endTie=performance.now();
    gameState="end"
  }
 }else if(gameState==="end"){
   space.velocityY=0;
   
   enemyGroup.setLifetimeEach(0);
   enemyGroup.setVelocityYEach(0);
   spaceship.visible=false;
   bulletGroup.destroyEach();
   textSize(30);
   fill("red")
   text("MISSION FAILED",displayWidth/2-100,20)
   space.addImage(expImg)
   space.scale=1;
   
     
     
   

   
   
 }

 
  st=endTie-startTime

  
  drawSprites();
  textSize(20);
  fill("green")
  text("ENEMY DESTROYED: "+ score, 10, 30);
  text("survival Time: "+ st,displayWidth-200,30)
}


function createAsteroid() {
  var asteroid = createSprite(Math.round(random(30, displayWidth-100)), 0, 10, 10);
  asteroid.addImage(asteroidIMG)
  asteroid.scale=0.08
 
  asteroid.velocityY = 3;
  asteroid.lifetime = 1000;
  asteroidGroup.add(asteroid);
  enemyGroup.add(asteroid)
}

function createAlien1() {
  var alien1 = createSprite(Math.round(random(30, displayWidth-100)), 0, 10, 10);
  alien1.addImage(alienIMG1)
  alien1.scale=0.4

  alien1.velocityY = 4;
  alien1.lifetime = 1000;
  alien1Group.add(alien1);
  enemyGroup.add(alien1)
}

function createAlien2() {
  var alien2 = createSprite(Math.round(random(30, displayWidth-100)), 0, 10, 10);
  alien2.addImage(alienIMG2)
  alien2.scale=0.5

  
  alien2.velocityY = 5;
  alien2.lifetime = 1000;
  alien2Group.add(alien2);
  enemyGroup.add(alien2);
}

function createAlien3() {
  var alien3 = createSprite(Math.round(random(30, displayWidth-100)), 0, 10, 10);
  alien3.addImage(alienIMG3)
  alien3.scale=0.6

  
  alien3.velocityY = 6;
  alien3.lifetime = 1000;
  alien3Group.add(alien3);
  enemyGroup.add(alien3);
}

function createAlien4() {
  var alien4 = createSprite(Math.round(random(30, displayWidth-100)), 0, 10, 10);
  alien4.addImage(alienIMG4)
  alien4.scale=0.8

  alien4.velocityY = 8;
  alien4.lifetime = 1000;
  alien4Group.add(alien4);
  enemyGroup.add(alien4);
}

function createBullet(x) {
  var bullet= createSprite(100, 100, 5, 10);
  bullet.addImage(bulletImg);
  bulletSound.play();
  bullet.scale=0.2;
  bullet.y = displayHeight-200;
  bullet.x = x;                                           
  bullet.shapeColor = "red";
  bullet.velocityY = -1;
  bullet.lifetime = 1000;
  bulletGroup.add(bullet);
}


  
  
