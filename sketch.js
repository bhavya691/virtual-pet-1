//Create variables here
var dog  , database , foodS , foodStock;

var dog1 , dog2;

function preload()
{
  //load images here
  dog1 = loadImage("Dog.png");
  dog2 = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(800, 700);
  
  dog = createSprite(400,340,20,20);
  dog.addImage(dog1);
  dog.scale = 0.5;

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(foodS!==undefined){
    
    strokeWeight(1)
    stroke("red");
    fill("blue");
    textSize(35)
    text("remaining food : "+foodS,250,120);


  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog2);

  if(foodS === 0){
    dog.addImage(dog1);
  }
  }
 

  }
  drawSprites();
  //add styles here
  textSize(15);
  strokeWeight(1)
  stroke("red");
  fill("blue");
  text("Note : Press UP_ARROW Key To Feed Drago Milk", 250 ,20);
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }

  else{
    x=x-1;
  }


  database.ref('/').update({
    food:x
  })
}

