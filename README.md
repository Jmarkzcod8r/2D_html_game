### The Game Project 3 – Game Character interaction

Now to add some proper interaction to your game.

1. Inspect the code [0 marks]

2. Create variables for interaction [1 marks]
	- Declare four variables: `isLeft`, `isRight`, `isFalling` and `isPlummeting`
	- Initialise each of them to `false`. These variables will be used to animate your game
	 character.

3. Implement left and right for keyPressed [1 marks]
	- Inside the function keyPressed write two if statements to make isLeft = true when the 'a' key is pressed and isRight = true when the 'd' key is pressed.
	- Test your conditional statements  using `console.log()` to see the values of isLeft and isRight
		- HINT: look up the difference between keyCode and key to help you decide which variable you need to use.

4. Implement left and right for keyReleased [1 marks]
	- Inside the function keyReleased write two if statements to make isLeft = false when the 'a' key is released and isRight = false when the 'd' key is released, 
	- Test your conditional statements using console.log() to see the values of isLeft and isRight

5. Add game character [1 marks]
	- Add your game character code from part 2 to this sketch.
	- You need to place each block of character code within the appropriate `if` statement so that when the character is animated the correct image will be drawn.

6. Make the game character move left and right [2 marks]
	- In the draw function add two if statements to make the character move left when isLeft is true and move right when isRight is true
	- Test that your character moves left, right, and stops correctly when the a and s keys are pressed and released.
        - HINT: you need to use the isLeft, isRight, and gameChar_x variables.

7. Make the game character jump [2 marks]
	- Add another if statement within keyPressed that checks when the 'w' key is pressed.
	- When 'w' is pressed subtract 100 from gameChar_y . This will make the character jump up in the air (don't worry about it falling just yet)

8. Add gravity [2 marks]
    - Now it's time to make our game character fall down to the ground again
    - Add an if statement within the draw function to detect when the character is  jumping above the ground. 
        - HINT: gameChar_y is less than floorPos_y when this is happening.
    - As the action of the if statement you should make the character fall towards the ground. 
    - Do this by incrementing gameChar_y
    - At the same time set isFalling to true so that the falling image of the character appears
    - Finally add an else action to your conditional statement which sets isFalling to false. This will stop the falling image from appearing when your character is touching the ground again

9. Prevent double jumps [1 marks]
    - Now adjust the code inside keyPressed tp prevent the character from jumping when it already in the air.
        - HINT: isFalling is useful here 

Help it's not working !
    - Okay this is not a time to hack your way out of the problem. 
    - Instead go back through the instructions one stage at a time and check that you've done exactly what each stage tells you to.
    - Try commenting out the code from the later stages and testing the earlier stages to make sure that they run correctly.
    
 Can you fix this code?
 
var gameChar_x;
var gameChar_y;
var floorPos_y;

var cameraPosX;

var canyon;
var collectable;

var trees_x;
var treePos_y;


var mountain;
var cloud;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    cameraPosX = 0;
    
    
    collectable = {x:280, y:418 , size :30 , isFound : false};

    
    isPlummeting=false;
    
    trees_x = [100,500,900,1150];
    treePos_y = 288;
}

function draw()
{
	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue
    

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    
	//draw the canyon
   
if((gameChar_x>800 && gameChar_y>=425) && (gameChar_x<880 && gameChar_y>=425)){
    isPlummeting = true
    gameChar_y +=3
}
//        if(gameChar_y>floorPos_y){
//         isPlummeting = true;
//         gameChar_y += 2; }

    //canyon
    stroke(0);
    fill(160,82,45);
    triangle(800,432,900,432,900,700);
    fill(0,0,205);
    triangle(841,540,900,540,900,700)
    
    
    //tree
    
    
   
    stroke(255,255,255);
    fill(25,25,112);
    triangle(180,432,480,432,360,210); 
    stroke(255,255,255);
    fill(25,25,112);
    triangle(100,432,300,432,150,300);
    
    stroke(255,255,255);
    fill(25,25,112);
    triangle(900,432,1200,432,1180,210); 
    stroke(255,255,255);
    fill(25,25,112);
    triangle(800,432,1000,432,850,300);
    
    for(var i =0; i < trees_x.length; i++){
            console.log("trees loop" + i );
        fill(139,69,19);    
        rect(trees_x[i],treePos_y,30,145);
        fill(34,139,34);
        rect(trees_x[i]-50,treePos_y-100,140,145);
        fill(220,20,60);
        ellipse(trees_x[i]+17,treePos_y+30,20,20);
        fill(220,20,60);
        ellipse(trees_x[i]+35,treePos_y-80,20,20);
        fill(220,20,60);
        ellipse(trees_x[i]-10,treePos_y-50,20,20);
        fill(220,20,60);
        ellipse(trees_x[i]+70,treePos_y-10,20,20);
    }

    
    if(dist(gameChar_x,gameChar_y,collectable.x,collectable.y)<20){
     collectable.isFound = true;
        fill(255)
        textSize(32);
        text("1",975,52);
    }
    
    if(collectable.isFound == false){
    fill(255,165,0);
    stroke(255,255,255)
    ellipse(collectable.x,collectable.y,collectable.size);
    
    
    }
    
//    count
   
    
    
    //cloud
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(150,100,40,40);
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(230,100,40,40);
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(190,100,60,60);
    
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(400,70,40,40);
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(480,70,40,40);
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(440,70,60,60);
    
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(640,100,40,40);
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(720,100,40,40);
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(680,100,60,60);
    
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(880,70,40,40);
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(960,70,40,40);
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(920,70,60,60);
    
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(1120,100,40,40);
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(1040,100,40,40);
    stroke(135,206,250);
    fill(255,255,255);
    ellipse(1000,70,60,60);
        
    
  


	//the game character
	if(isLeft && isFalling)
	{ 
		// add your jumping-left code
     stroke(0,0,0)
    fill (255,192,203)
    ellipse(gameChar_x-1,gameChar_y-51,10,20);
   //body
    fill(255,182,193);
    ellipse(gameChar_x-1,gameChar_y-26,20,30);
    fill(255,105,180)
    ellipse(gameChar_x-14,gameChar_y-35,8,8);
    fill(255,105,180)
    ellipse(gameChar_x+11,gameChar_y-35,8,8);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-35,2,2);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-30,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-25,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-20,2,2);
     fill(30,144,255) 
     triangle(gameChar_x-2,gameChar_y-40,gameChar_x+11,gameChar_y-40,gameChar_x+11,gameChar_y-48);
     //legs
     fill(255,105,180)
    ellipse(gameChar_x+8,gameChar_y-9,10,10);
    fill(255,105,180)
    ellipse(gameChar_x-10,gameChar_y-9,10,10);
    //face
    fill(0)
    ellipse(gameChar_x-3,gameChar_y-54,3,2);
    fill(255,105,180);
    triangle(gameChar_x-2,gameChar_y-60,gameChar_x+2,gameChar_y-53,gameChar_x+7,gameChar_y-63);
    ellipse(gameChar_x-7,gameChar_y-52,2,2)
    
	}
	else if(isRight && isFalling)
	{ 
		// add your jumping-right code
   stroke(0,0,0)
    fill (255,192,203)
    ellipse(gameChar_x-1,gameChar_y-51,10,20);
   //body
    fill(255,182,193);
    ellipse(gameChar_x-1,gameChar_y-26,20,30);
    fill(255,105,180)
    ellipse(gameChar_x-14,gameChar_y-35,8,8);
    fill(255,105,180)
    ellipse(gameChar_x+11,gameChar_y-35,8,8);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-35,2,2);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-30,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-25,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-20,2,2);
     fill	(30,144,255) 
     triangle(gameChar_x+0,gameChar_y-40,gameChar_x-13,gameChar_y-40,gameChar_x-13,gameChar_y-48);
     //legs
     fill(255,105,180)
    ellipse(gameChar_x+8,gameChar_y-9,10,10);
    fill(255,105,180)
    ellipse(gameChar_x-10,gameChar_y-9,10,10);
    //face
    fill(0)
    ellipse(gameChar_x+1,gameChar_y-54,3,2);
    fill(255,105,180);
    triangle(gameChar_x-1,gameChar_y-60,gameChar_x-6,gameChar_y-53,gameChar_x-11,gameChar_y-63);
    ellipse(gameChar_x+5,gameChar_y-52,2,2)
    

	}
	else if(isLeft)
	{stroke(255)
		// add your walking left code
stroke(0,0,0)
    fill (255,192,203)
    ellipse(gameChar_x-1,gameChar_y-51,10,20);
   //body
    fill(255,182,193);
    ellipse(gameChar_x-1,gameChar_y-26,20,30);
    fill(255,105,180)
    ellipse(gameChar_x-10,gameChar_y-26,8,8);
    fill(255,105,180)
    ellipse(gameChar_x+8,gameChar_y-26,8,8);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-35,2,2);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-30,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-25,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-20,2,2);
    fill(30,144,255) 
     triangle(gameChar_x-2,gameChar_y-40,gameChar_x+11,gameChar_y-35,gameChar_x+11,gameChar_y-45);
     //legs
    fill(255,105,180)
    ellipse(gameChar_x+5,gameChar_y-8,10,10);
    fill(255,105,180)
    ellipse(gameChar_x-5,gameChar_y-8,10,10);
    fill(0);
    //face
    fill(0)
    ellipse(gameChar_x-3,gameChar_y-54,3,2);
    fill(255,105,180);
    triangle(gameChar_x-2,gameChar_y-60,gameChar_x+2,gameChar_y-53,gameChar_x+7,gameChar_y-63);
    ellipse(gameChar_x-7,gameChar_y-52,2,2)
    
	}
	else if(isRight)
	{stroke(255)
		// add your walking right code
         stroke(0,0,0)
    fill (255,192,203)
    ellipse(gameChar_x-1,gameChar_y-51,10,20);
   //body
    fill(255,182,193);
    ellipse(gameChar_x-1,gameChar_y-26,20,30);
    fill(255,105,180)
    ellipse(gameChar_x-10,gameChar_y-26,8,8);
    fill(255,105,180)
    ellipse(gameChar_x+8,gameChar_y-26,8,8);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-35,2,2);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-30,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-25,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-20,2,2);
     fill	(30,144,255) 
     triangle(gameChar_x+0,gameChar_y-40,gameChar_x-13,gameChar_y-35,gameChar_x-13,gameChar_y-45);
     //legs
    fill(255,105,180)
    ellipse(gameChar_x+5,gameChar_y-8,10,10);
    fill(255,105,180)
    ellipse(gameChar_x-5,gameChar_y-8,10,10);
    fill(0);
    //face
    fill(0)
    ellipse(gameChar_x+1,gameChar_y-54,3,2);
    fill(255,105,180);
    triangle(gameChar_x-1,gameChar_y-60,gameChar_x-6,gameChar_y-53,gameChar_x-11,gameChar_y-63);
    ellipse(gameChar_x+5,gameChar_y-52,2,2)   
        
	}
    
   
	else if(isFalling || isPlummeting)
	{stroke(255)
		// add your jumping facing forwards code
  stroke(0,0,0)
    fill (255,192,203)
    ellipse(gameChar_x-1,gameChar_y-51,20,20);
   //body
    fill(255,182,193);
    ellipse(gameChar_x-1,gameChar_y-26,30,30);
    fill(255,105,180)
    ellipse(gameChar_x-15,gameChar_y-35,8,8);
    fill(255,105,180)
    ellipse(gameChar_x+13,gameChar_y-35,8,8);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-35,2,2);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-30,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-25,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-20,2,2);
   fill	(30,144,255) 
     triangle(gameChar_x+0,gameChar_y-40,gameChar_x-13,gameChar_y-40,gameChar_x-13,gameChar_y-48);
    fill(30,144,255) 
     triangle(gameChar_x-2,gameChar_y-40,gameChar_x+11,gameChar_y-40,gameChar_x+11,gameChar_y-48);
     //legs
    fill(255,105,180)
    ellipse(gameChar_x+11,gameChar_y-9,10,10);
    fill(255,105,180)
    ellipse(gameChar_x-13,gameChar_y-9,10,10);
    //face
    fill(255,105,180);
    triangle(gameChar_x-6,gameChar_y-61,gameChar_x-11,gameChar_y-55,gameChar_x-15,gameChar_y-65);
    fill(255,105,180);
    triangle(gameChar_x+4,gameChar_y-61,gameChar_x+8,gameChar_y-55,gameChar_x+13,gameChar_y-65);
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-53,5,5);
    fill(0);
    ellipse(gameChar_x+3,gameChar_y-53,5,5);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-49,2,2)
    fill(255,0,0);
    triangle(gameChar_x-1,gameChar_y-47,gameChar_x-4,gameChar_y-45,gameChar_x+2,gameChar_y-45);
    
	}
	else
	{
		// add your standing front facing code
stroke(0,0,0)
    fill (255,192,203)
    ellipse(gameChar_x-1,gameChar_y-51,20,20);
   //body
    fill(255,182,193);
    ellipse(gameChar_x-1,gameChar_y-26,30,30);
    fill(255,105,180)
    ellipse(gameChar_x-10,gameChar_y-26,8,8);
    fill(255,105,180)
    ellipse(gameChar_x+8,gameChar_y-26,8,8);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-35,2,2);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-30,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-25,2,2);
     fill(0);
    ellipse(gameChar_x-1,gameChar_y-20,2,2);
   fill	(30,144,255) 
     triangle(gameChar_x+0,gameChar_y-40,gameChar_x-13,gameChar_y-35,gameChar_x-13,gameChar_y-45);
    fill(30,144,255) 
     triangle(gameChar_x-2,gameChar_y-40,gameChar_x+11,gameChar_y-35,gameChar_x+11,gameChar_y-45);
     //legs
    fill(255,105,180)
    ellipse(gameChar_x+5,gameChar_y-8,10,10);
    fill(255,105,180)
    ellipse(gameChar_x-5,gameChar_y-8,10,10);
    //face
    fill(255,105,180);
    triangle(gameChar_x-6,gameChar_y-61,gameChar_x-11,gameChar_y-55,gameChar_x-15,gameChar_y-65);
    fill(255,105,180);
    triangle(gameChar_x+4,gameChar_y-61,gameChar_x+8,gameChar_y-55,gameChar_x+13,gameChar_y-65);
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-53,5,5);
    fill(0);
    ellipse(gameChar_x+3,gameChar_y-53,5,5);
    fill(0);
    ellipse(gameChar_x-1,gameChar_y-49,2,2)
    fill(255,0,0);
    triangle(gameChar_x-1,gameChar_y-47,gameChar_x-4,gameChar_y-45,gameChar_x+2,gameChar_y-45);
   
	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    if(isPlummeting==false){
        if(isLeft == true){
            gameChar_x -= 3;
        }
        else if( isRight == true){
             gameChar_x += 3;
        }

        if(gameChar_y<floorPos_y){
            gameChar_y +=2;
            isFalling = true;
        }else{
            isFalling=false;
        }
    }
}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
        
        if(keyCode == 65){
            isLeft = true;    
        }
        else if (keyCode == 68){
            isRight = true ;
        }
         else if (keyCode == 87){
            isFalling = true;

        if(gameChar_y==floorPos_y){ 
          gameChar_y -= 170;
          isFalling=true ; }
         }
    
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if(keyCode == 65){
        isLeft = false;
        
    }
    else if (keyCode == 68){
        isRight = false ;
        
    }
     else if (keyCode == 87){
        isJumping = false ;
    } 

}

   
