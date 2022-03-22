
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4
  
  
}

function draw() {



  background(200);
if(gameState === "play"){
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 3
    }

    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x - 3
    }

    if(keyDown("space")){
      ghost.velocityY = -3

    }

    ghost.velocityY = ghost.velocityY + 0.8

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
      
    }

    spookySound.play();

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";

      
    }

    



    spawnDoors();

  
    drawSprites();
  }
  if(gameState==="end"){
    fill("#e32b17");
    textSize(30)
    text("Game Over!", 220, 300);

  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200, -50, 10, 40);
    door.addImage("obstacle", doorImg);
    door.x = Math.round(random(120, 500));
    door.velocityY = 1
    door.lifetime = 700;
    doorsGroup.add(door);


    climber = createSprite(200, 1);
    climber.addImage("obstacle", climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 700
    climbersGroup.add(climber);

    ghost.depth = door.depth;
    ghost.depth += 1;

    invisibleBlock = createSprite(200, 5)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2;
    invisibleBlock.x = climber.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 700;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);

  }




}


