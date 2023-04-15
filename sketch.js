/*    The Game Project 4    */

var gameChar_x;
var gameChar_y;
var floorPos_y;


var cameraPosX;
var scrollPos; // new variable to keep track of the position of the screen

var canyon;
var collectable;

var trees_x;
var treePos_y;

var mountain;
var cloud;

// As per instruction, "false" is your default value for these variables.
// Also, these variables are global by nature.
var isLeft = false;
var isRight = false;
var isPlummeting = false;
var isFalling = false;
var canJump = true
var onPlatform

var lives = 3;
var score = 0;

var sunImage;
var cloud1; 
var cloud2;

var loadSound;


function preload() {
  sunImage = loadImage('sun.png');
  cloud1Image = loadImage ('cloud1.png')
  cloud2Image = loadImage ('cloud2.png');
  back3 = loadImage('back3.png');
  ice = loadImage('Ice.png')
  Iglooimg = loadImage('Igloo.png')
  Jump = loadSound('Jump.mp3')
  Splash = loadSound ('Splash.mp3')
  IceCollect = loadSound ('IceCollect.mp3')
}

function setup()
{
    createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    cameraPosX = gameChar_x; // set the camera to follow the game character
    scrollPos = 0; // initialize scroll position to zero
    
    isPlummeting=false;
    
    trees_x = [100,500,900,1150];
    treePos_y = 410;

    function addTrees() {
        if (gameChar_x > trees_x[trees_x.length - 1] - 500) {
          var newTreePos = trees_x[trees_x.length - 1] + random(300, 600);
          trees_x.push(newTreePos);
        }
      }
    
    setInterval(addTrees, 2000); // Check every 2 second

      waterfalls = [{x:800,y:432,width:1000,height:368}];
 
      function addWaterfalls() {
          if (gameChar_x > waterfalls[waterfalls.length - 1].x - 400) {
            var newWaterfallPos = {x:waterfalls[waterfalls.length - 1].x + random(1024, 1200),
                                   y:432 , width: random(80,200), height:360}
            waterfalls.push(newWaterfallPos);
          }
       
        }
 
    setInterval(addWaterfalls, 1000); // Check every second
        
    clouds = [ {x: 500,y: 10, image: cloud2Image,size:200}];
    var cloudImage;
    function addClouds(){
      // create clouds with random image and position
      for (var i = 0; i < clouds.length; i++) {
        if (random() < 0.5) {
          cloudImage = cloud1Image;
          cloudsize = random(100,150);
        } else {
          cloudImage = cloud2Image;
          cloudsize = random(80,170);
        }
        if (gameChar_x > clouds[clouds.length - 1].x ) {
          var newCloud = {x:gameChar_x + random(1024, 1150)/2,y:random(8,14),image:cloudImage,size: cloudsize}
          clouds.push(newCloud);
        }
          } 
 
    }
    setInterval(addClouds, 2000); // Check every 2 seconds
   
    backgrounds = [{x: 500,y: 105, image: back3,size:400}]

    function addBackgrounds(){
      // create clouds with background image and position
      for (var i = 0; i < backgrounds.length; i++) {
        if (gameChar_x > backgrounds[backgrounds.length - 1].x ) {
          var newBack = {x:gameChar_x + random(1024, 1150)/2,y:105,image:back3,size: 400}
          backgrounds.push(newBack);
        }
          } 
    }
    setInterval(addBackgrounds, 5000); // Check every second

    collectable = [{x:280, y:415 , size :100 , isFound : false}]

    function addCollectables() {
      if (gameChar_x > collectable[collectable.length - 1].x - 500) {
        var newCollectable = {x:collectable[collectable.length - 1].x + random(1024, 1500),  y:415 , size :100 , isFound : false}
        collectable.push(newCollectable);
      }
    }
    setInterval(addCollectables, 3000); // Check every 3 seconds

    platforms = [{x:850,y:330,width:100,height:10},  {x:1000,y:200,width:200,height:10},{x:1350,y:250,width:150,height:10}]
  }

// variables to keep track of suns
var suns = [];
var minSuns = 3;
var maxSuns = 5;
var sunMinSpeed = 0.03;
var sunMaxSpeed = 0.06;

// function to generate a new sun
function generateSun() {
  var x = gameChar_x - width/2 + random(width); // random x position
  var y = 0; // start at top of screen
  var size = random(20, 30); // random size
  var speed = random(sunMinSpeed, sunMaxSpeed); // random speed

  // create a new sun object with properties
  var sun = {
    x: x,
    y: y,
    size: size,
    speed: speed,
    collide: false
  };

  // add the new sun to the array
  while (suns.length <25) { 
    suns.push(sun);
  }
  
}

// function to update and display suns
function updateSuns() {
  // loop through all suns
  for (var i = 0; i < suns.length; i++) {
    var randompick = round(random(0, suns.length))

    var sun = suns[i];

    sun.y += sun.speed;

    if (suns[randompick]){
      // console.log('random , ',randompick)
      var nextsun = suns[randompick]
      nextsun.y += nextsun.speed
      image(sunImage, nextsun.x - nextsun.size*0.75, nextsun.y - nextsun.size*0.75, nextsun.size, nextsun.size);
    }
    

    image(sunImage, sun.x - sun.size*0.75, sun.y - sun.size*0.75, sun.size, sun.size);
    
  }

  var distance = dist(gameChar_x, gameChar_y, sun.x, sun.y);
  if (distance < sun.size / 2 + 30) {
      lives--;
      document.getElementById("lives").textContent = `Lives: ` + lives;
      document.getElementById("Statusboard").textContent = ``;
      setup();

  }

  // remove suns that have gone off the bottom of the screen
  for (var i = suns.length - 1; i >= 0; i--) {
    // if (suns[i].y > height ==500) {
      if (suns[i].y > 500) { 
      suns.splice(i, 1);
    }

  }
}

// function to generate suns on a timer
var lastSunTime = 0;
var sunInterval = 2000; // 4 seconds
var sunIntervalRange = 2000; // plus or minus 2 seconds
function generateSunsOnTimer() {
  var currentTime = millis();
  if (currentTime - lastSunTime > sunInterval) {
    // generate a new batch of suns
    var numSuns = floor(random(minSuns, maxSuns + 1)); // random number of suns
    for (var i = 0; i < numSuns; i++) {
      generateSun();
    }

    // reset timer for next batch of suns
    sunInterval = random(4000 - sunIntervalRange, 4000 + sunIntervalRange); // random time interval
    lastSunTime = currentTime;
  }
}





function Finish(){
  Igloo = {x:3500, y:370, size:100}
  fill(255, 255, 0); // yellow fill
  stroke(255, 255, 0); // yellow outline

  ellipse(Igloo.x,Igloo.y,Igloo.size);  
  image(Iglooimg, Igloo.x-120, Igloo.y-20 , Igloo.size *2.5,Igloo.size)
  // console.log('dist: ,',((dist(gameChar_x + 15, gameChar_y-15, Igloo.x - (Igloo.size * 2.5)/2, Igloo.y - Igloo.size/2))));
  if ((dist(gameChar_x + 15, gameChar_y-15, Igloo.x - (Igloo.size * 2.5)/2, Igloo.y - Igloo.size/2))<100){
    // console.log('GAme finished');
    document.getElementById("Statusboard").textContent = `CONGRATULATIONS! YOU WON!`;

  }
}

function draw() // This draw function goes in a constant loop
{ 
    ///////////DRAWING CODE//////////
    //fill the sky blue
    background(100,155,255); 
    
    // update the position of the screen based on the game character's position
    scrollPos = gameChar_x - width/2;

    translate(-scrollPos, 0);

    // draw mountains
    fill(25,25,112);
    triangle(180,432,480,432,360,210); 
    fill(25,25,112);
    triangle(100,432,300,432,150,300);
 

    for (var i = 0; i < clouds.length; i++) {
      var cloud = clouds[i];
      image(cloud.image, cloud.x, cloud.y,cloud.size*2,cloud.size);
    }

    for (var i = 0; i < backgrounds.length; i++) {
      var back = backgrounds[i];
      image(back.image, back.x, back.y,back.size*1.5,back.size );
    }

    for (var i = platforms.length-1; i >= 0; i--){
      if(platforms[i].x < gameChar_x && gameChar_x < platforms[i].x + platforms[i].width &&
        platforms[i].y < gameChar_y && gameChar_y < platforms[i].y + platforms[i].height){
            onPlatform = true;
            isFalling=false;
            gameChar_y === platforms[i].y;
            console.log('platform hit: i')
            break;
        } 
        else { onPlatform = false ;
          } 
  
      }

    for (var i = 0; i < trees_x.length; i++) {
        // Draw trunk
        fill(139, 69, 19);
        rect(trees_x[i], treePos_y, 0, 0);
      
        // Draw first level of branches
        fill(255);
        triangle(trees_x[i] - 15, treePos_y + 20, trees_x[i] + 15, treePos_y + 20, trees_x[i], treePos_y - 30);
        fill(255);
        triangle(trees_x[i] - 10, treePos_y + 5, trees_x[i] + 10, treePos_y + 5, trees_x[i], treePos_y - 20);
      
        // Draw snow on first level of branches
        fill(255);
        triangle(trees_x[i] - 5, treePos_y + 10, trees_x[i] + 5, treePos_y + 10, trees_x[i], treePos_y - 25);
      
        // Draw second level of branches
        fill(255);
        triangle(trees_x[i] - 25, treePos_y - 10, trees_x[i] + 25, treePos_y - 10, trees_x[i], treePos_y - 80);
      
        // Draw snow on second level of branches
        fill(255);
        triangle(trees_x[i] - 20, treePos_y - 20, trees_x[i] + 20, treePos_y - 20, trees_x[i], treePos_y - 70);
      
        // Draw third level of branches
        fill(255);
        triangle(trees_x[i] - 15, treePos_y - 40, trees_x[i] + 15, treePos_y - 40, trees_x[i], treePos_y - 110);
      
        // Draw snow on third level of branches
        fill(255);
        triangle(trees_x[i] - 10, treePos_y - 50, trees_x[i] + 10, treePos_y - 50, trees_x[i], treePos_y - 100);
      
        // Draw fourth level of branches
        fill(255);
        triangle(trees_x[i] - 10, treePos_y - 70, trees_x[i] + 10, treePos_y - 70, trees_x[i], treePos_y - 140);
      
        // Draw snow on fourth level of branches
        fill(255);
        triangle(trees_x[i] - 5, treePos_y - 80, trees_x[i] + 5, treePos_y - 80, trees_x[i], treePos_y - 130);
        
        fill(255, 215, 0);
       
        fill(255, 215, 0);
        var starPoints = 5;
        var starX = trees_x[i];
        var starY = treePos_y - 140;
        var starRadius1 = 15;
        var starRadius2 = 7;
        beginShape();
        for (var j = 0; j < starPoints * 2; j++) {
          var angle = j / (starPoints * 2) * TWO_PI - HALF_PI;
          var radius = (j % 2 == 0) ? starRadius1 : starRadius2;
          vertex(starX + cos(angle) * radius, starY + sin(angle) * radius);
        }

        endShape(CLOSE);
      }


    for (var i = 0; i < collectable.length; i++){
    if(collectable[i].isFound == false){
    ellipse(collectable[i].x,collectable[i].y,collectable[i].size);  // This sets the shape to circle.
    image(ice,collectable[i].x-50,collectable[i].y-50,collectable[i].size,collectable[i].size  )
  }
    }

    for (var i = 0; i < collectable.length; i++){
    if (dist(gameChar_x, gameChar_y, collectable[i].x, collectable[i].y) < 20) {
      if (!collectable[i].isFound) {
        IceCollect.play();
        collectable[i].isFound = true;
        score += 10; // add 10 to the score
        document.getElementById("score").textContent = `Score: `+ score;
      }
    } }
  
    noStroke();
    fill(0,155,0);
    rect(0, floorPos_y, scrollPos + width, height - floorPos_y); //draw some green ground

    for (var i = 0; i < waterfalls.length; i++) {
      stroke(0);
      fill(0,0,205);
        beginShape();
        vertex(waterfalls[i].x, waterfalls[i].y);
        vertex(waterfalls[i].x + waterfalls[i].width, waterfalls[i].y);
        vertex(waterfalls[i].x + waterfalls[i].width, waterfalls[i].y + waterfalls[i].height);
        vertex(waterfalls[i].x, waterfalls[i].y + waterfalls[i].height);
        endShape(CLOSE); 
      }

      for (var i = 0; i < platforms.length; i++) {
        stroke(0);
        fill(128); 
          beginShape();
          vertex(platforms[i].x, platforms[i].y);
          vertex(platforms[i].x + platforms[i].width, platforms[i].y);
          vertex(platforms[i].x + platforms[i].width, platforms[i].y+platforms[i].height);
          vertex(platforms[i].x, platforms[i].y+platforms[i].height);
          endShape(CLOSE); 
        }
     
        var isValidFallingPosition = false;
        for (var i = 0; i < waterfalls.length; i++) {
          var pos = waterfalls[i];
          if (gameChar_x <0  || (gameChar_x > pos.x && gameChar_x < pos.x + pos.width && gameChar_y >= 432)) {
            isValidFallingPosition = true;
            break;
          }
        }
        if (isValidFallingPosition) {
          isPlummeting = true;
          gameChar_y += 3;
          if (gameChar_y >= 600){
            Splash.play();
            setup();
            lives = lives - 1;
            document.getElementById("lives").textContent = `Lives: ` + lives;
            
            if (lives <= 0) {
              document.getElementById("Statusboard").textContent = `GAME OVER`;
            }
          }
        }
        
	//the game character
	if(isLeft && isFalling)
	{ 
	
    var scale = 0.5;

    stroke(0, 0, 0);
    fill(255, 255, 255); 
    ellipse(gameChar_x, gameChar_y - 75, 40 * scale, 40 * scale); // head
    ellipse(gameChar_x, gameChar_y - 50, 60 * scale, 60 * scale); // body
    ellipse(gameChar_x, gameChar_y - 20, 80 * scale, 80 * scale); // base
    fill(0, 0, 0);
    ellipse(gameChar_x - 5, gameChar_y - 77, 1 , 2); // left eye
    ellipse(gameChar_x - 13, gameChar_y - 73, 15*scale, 10*scale); // nose
    fill(255, 255, 255);
    ellipse(gameChar_x - 20, gameChar_y - 55, 20*scale, 20*scale); // left button
    ellipse(gameChar_x + 20, gameChar_y - 55, 20*scale, 20*scale); // right button
    fill(0, 0, 0);
    
	}
	else if(isRight && isFalling)
	{ 

    var scale = 0.5;

    stroke(0, 0, 0);
    fill(255, 255, 255); 
    ellipse(gameChar_x, gameChar_y - 75, 40 * scale, 40 * scale); // head
    ellipse(gameChar_x, gameChar_y - 50, 60 * scale, 60 * scale); // body
    ellipse(gameChar_x, gameChar_y - 20, 80 * scale, 80 * scale); // base
    fill(0, 0, 0);
    ellipse(gameChar_x + 5, gameChar_y - 77, 1, 2); // right eye
    ellipse(gameChar_x + 13, gameChar_y - 73, 15*scale, 10*scale); // nose
    fill(255, 255, 255);
    ellipse(gameChar_x - 20, gameChar_y - 55, 20*scale, 20*scale); // left button
    ellipse(gameChar_x + 20, gameChar_y - 55, 20*scale, 20*scale); // right button
    fill(0, 0, 0);

	}
	else if(isLeft){
    
    var scale = 0.5;

    stroke(0, 0, 0);
    fill(255, 255, 255); 
    ellipse(gameChar_x, gameChar_y - 75, 40 * scale, 40 * scale); // head
    ellipse(gameChar_x, gameChar_y - 50, 60 * scale, 60 * scale); // body
    ellipse(gameChar_x, gameChar_y - 20, 80 * scale, 80 * scale); // base
    fill(0, 0, 0);
    ellipse(gameChar_x - 5, gameChar_y - 77, 1 , 2); // left eye
    ellipse(gameChar_x - 13, gameChar_y - 73, 15*scale, 10*scale); // nose
    fill(255, 255, 255);
    ellipse(gameChar_x - 20, gameChar_y - 55, 20*scale, 20*scale); // left button
    ellipse(gameChar_x + 20, gameChar_y - 55, 20*scale, 20*scale); // right button
    fill(0, 0, 0);

	}
	else if(isRight)
	{
    var scale = 0.5;

    stroke(0, 0, 0);
    fill(255, 255, 255); 
    ellipse(gameChar_x, gameChar_y - 75, 40 * scale, 40 * scale); // head
    ellipse(gameChar_x, gameChar_y - 50, 60 * scale, 60 * scale); // body
    ellipse(gameChar_x, gameChar_y - 20, 80 * scale, 80 * scale); // base
    fill(0, 0, 0);
    ellipse(gameChar_x + 5, gameChar_y - 77, 1, 2); // right eye
    ellipse(gameChar_x + 13, gameChar_y - 73, 15*scale, 10*scale); // nose
    fill(255, 255, 255);
    ellipse(gameChar_x - 20, gameChar_y - 55, 20*scale, 20*scale); // left button
    ellipse(gameChar_x + 20, gameChar_y - 55, 20*scale, 20*scale); // right button
    fill(0, 0, 0);
        
	}
    
   
	else if(isFalling || isPlummeting)
	{

    var scale = 0.5;

    stroke(0, 0, 0);
    fill(255, 255, 255); 
    ellipse(gameChar_x, gameChar_y - 75, 40 * scale, 40 * scale); // head
    ellipse(gameChar_x, gameChar_y - 50, 60 * scale, 60 * scale); // body
    ellipse(gameChar_x, gameChar_y - 20, 80 * scale, 80 * scale); // base
    fill(0, 0, 0);
    ellipse(gameChar_x - 5, gameChar_y - 77, 1 , 2); // left eye
    ellipse(gameChar_x + 5, gameChar_y - 77, 1, 2); // right eye
    ellipse(gameChar_x, gameChar_y - 73, 10*scale, 10*scale); // nose
    fill(255, 255, 255);
    ellipse(gameChar_x - 29, gameChar_y - 86, 11,11); // left button
    ellipse(gameChar_x + 29, gameChar_y - 86, 11, 11); // right button
    fill(0, 0, 0);
    line(gameChar_x+25, gameChar_y-80, gameChar_x + 15, gameChar_y - 55);
    line(gameChar_x-25, gameChar_y-80, gameChar_x - 15, gameChar_y - 55);
	}
	else
	{

    var scale = 0.5;

    stroke(0, 0, 0);
    fill(255, 255, 255); 
    ellipse(gameChar_x, gameChar_y - 75, 40 * scale, 40 * scale); // head
    ellipse(gameChar_x, gameChar_y - 50, 60 * scale, 60 * scale); // body
    ellipse(gameChar_x, gameChar_y - 20, 80 * scale, 80 * scale); // base
    fill(0, 0, 0);
    ellipse(gameChar_x - 5, gameChar_y - 77, 1 , 2); // left eye
    ellipse(gameChar_x + 5, gameChar_y - 77, 1, 2); // right eye
    ellipse(gameChar_x, gameChar_y - 73, 10*scale, 10*scale); // nose
    fill(255, 255, 255);
    ellipse(gameChar_x - 20, gameChar_y - 55, 20*scale, 20*scale); // left button
    ellipse(gameChar_x + 20, gameChar_y - 55, 20*scale, 20*scale); // right button
    fill(0, 0, 0);
    
	}

  if (onPlatform){
    isFalling = false;
    gameChar_y +=0;
  }
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here 
  // This means that the character is above the floor
    if(isPlummeting==false){
        if(isLeft == true){
            gameChar_x -= 3.5; // set the speed of character going left
        }
        else if( isRight == true){
             gameChar_x += 3.5; // set the speed of character going right
        }

        if(gameChar_y<floorPos_y){
            if (!onPlatform) {
              gameChar_y +=2;
              isFalling = true; 
            } else {
            
              isFalling = false; 

            }
            
        }else{
            isFalling=false;
        }
    }

    generateSun();
    updateSuns();
    generateSunsOnTimer(); 
    setInterval(Finish(),2000)

}


function keyPressed(event)
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	// console.log("keyPressed: " + key);
	// console.log("keyPressed: " + keyCode);
    
        // Keycode 65 == "a" for `Left`
        if(event.keyCode == 65){
            isLeft = true;    
        }
        // Keycode 68 == "d" for `Right`
        else if (event.keyCode == 68){
            isRight = true ;
        }
        // Keycode 65 == "w" for `Up`
         else if (event.keyCode == 87 && canJump == true){
            canJump = false;
            isFalling = true;
            Jump.play();
        if(gameChar_y <=floorPos_y){ 
          // if (!onPlatform){
            gameChar_y -= 170;
            isFalling=true 
            setInterval(function(){ if(gameChar_y == floorPos_y  || onPlatform ==true ){
              canJump = true
            }},500)

        }
         }

}

function keyReleased(event)
{
	// if statements to control the animation of the character when
	// keys are released.
    // console.log('testpoint2')
	// console.log("keyReleased: " + key);
	// console.log("keyReleased: " + keyCode);
    
    if(event.keyCode == 65){
        isLeft = false;
        
    }
    else if (event.keyCode == 68){
        isRight = false ;
        
    }
     else if (event.keyCode == 87){
        isJumping = false ;
        
    } 

}
document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("Restart_button");
  button.addEventListener("click", function newsetup(){
    setup();
    score = 0;
    document.getElementById("score").textContent = `Score: `+ score;
    lives = 3;
    document.getElementById("lives").textContent = `Lives: ` + lives;
    document.getElementById("Statusboard").textContent = ``;
    
  });
});