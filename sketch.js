//Create variables here
var dogImg,happyDogImg,foodS,foodStock,doggy;
var feedPet,addFood;
var fedTme,lastFed;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happyDogImg.png");
}

function setup() {
	createCanvas(500,500);
  
   doggy = createSprite(250,300,50,100);
  doggy.addImage("doggy",dogImg);
  doggy.addImage("happy",happyDogImg);
  doggy.scale = 0.1;

database=firebase.database();
foodObj = new Foody();

   foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87) ;

 
  textSize(20);
  fill('red');
text("FOOD REMAINING : "+foodS,150,200);
//text("PRESS THE ' UP ARROW' TO FEED THE DOG",250,);
fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
    lastFed=data.val();
      
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+lastFed%12+"PM",350,30);
}else if(lastFed == 0){
  text("Last Feed : 12 AM", 350,30);
}else{
  text("Last Feed : "+lastFed + "AM",350,30);
}

  foodObj.display();
  drawSprites();
  //add styles here

}
function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

// function writeStock(x)
// {
//   if(x<=0){
//     x-0
//   }else{
//     x=x-1;
//   }
//   database.ref('/').update({Food:x})
// }

function feedDog(){
  doggy.changeImage("happy",happyDogImg);
if(foodObj.getFoodStock()<=0){
foodObj.updateFoodStock(foodObj.getFoodStock()*0);
}else
{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}
  
  database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}