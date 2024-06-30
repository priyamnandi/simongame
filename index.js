// alert("working !!");

var level=0;
var buttonColours= [ "red" ,"blue","green", "yellow" ];
var gamePattern= [];
var userClickedPattern=[];
var keypressed=false;

function nextSequence()
{    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor( Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);

}

function playSound(name)
{
    var aud= new Audio("./sounds/"+name+".mp3");
    aud.play();
}

function animatePress(curretColour)
{
    $("."+curretColour).addClass("pressed");
    setTimeout(function() {
        $("."+curretColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){

  
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    
        } else {
    
        //  $("h1").text("GAME OVER");
         var gameOver= new Audio("./sounds/wrong.mp3");
         gameOver.play();
            $("h1").text("GAME OVER, Press Any Key to Restart");
            $("body").addClass("bodyred");

            setTimeout(function(){
                $("body").removeClass("bodyred");
            },100);
         keypressed=false;
         level=0;
         gamePattern=[];
         userClickedPattern=[];
    
        }
    
}
$(document).on("keydown", function(event) {
    
    if(!keypressed)
    {
        nextSequence();
        keypressed=true;
    }
});



$(".box").on("click", function(event) {
    var clickedButton = event.target; //target returns the entire html subject to the event 
    

    var classes = $(clickedButton).attr("class").split(" "); //class attribute of the subbject html
    var userChosenColour = classes[0];
    playSound(userChosenColour);
    animatePress(userChosenColour);

    
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1); 
});
 //example level 3 starts so eemptyu userPatter, on click , a colour is pushed at 0th so size-1 is passed, then game[0]==userPattern[0] true then 2nd clr
//   pushed on clicl nd its index passed, nd after checking again the final click then 3rd clr, now when clr equal,
//  lenght==length so NextSeq() called to inc the level and gamePattern

