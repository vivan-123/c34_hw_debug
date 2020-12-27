//Create variables here
var dog, happydog, database, food, foodstock;

function preload() {
  //load images here
  dog = loadImage("images/dog.png");
  happydog = loadImage("images/dogh.png");
}

function setup() {
  createCanvas(500, 500);
  var doggo = createSprite(250, 300);
  doggo.addImage("doggoanimation", dog);
  doggo.scale = 0.2;

  database = firebase.database();

  var foodref = database.ref("food");
  foodref.on("value", readpos, errorpos);

  var foodstockref = database.ref("foodstock");
  foodstockref.on("value", readpos2, errorpos);
}

function readpos(data) {
  food = data.val();
  console.log("food = "+food)
}


function readpos2(data) {
  foodstock = data.val();  
}

function errorpos() {
  console.log("crashedddd!!!!")
}

function changeFoodstock(x) 
{
  database.ref("foodstock").set({
      foodstock : foodstock - x
  })
}

function changeFood(x) 
{
  database.ref("food").set({
      food : food + x
  })
}
function draw() {
  background("cyan");
  fill ("yellow");
  textSize (28);
  text ("Note : Click on the up arrow",10,50);
  text ("key to feed the dog!",10,75);
  text ("Note : Click on the down arrow",10,125);
  text ("key to buy more food and",10,150);
  text ("refill the food stock!",10,175);

  //food stock
  text("Food stock: "+foodstock,20,450);
  text("Food given to the dog: "+food,20,400);
  drawSprites();
  //add styles here
  uparrow();
  downarrow();

}

function uparrow()
{
  if (keyDown(UP_ARROW))
  {
    changeFood(1);
  }
}

function downarrow()
{
  if (keyDown(DOWN_ARROW))
  {
    changeFoodstock(1);
  }
}



