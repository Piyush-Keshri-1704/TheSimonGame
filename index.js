


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

  
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentName)
{
    if(gamePattern[currentName] === userClickedPattern[currentName])
    {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
            
        }
        

    }



    else {

        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");

    startOver();

    }

    
}

function startOver()
{
    level = 0;
    started  = false;
    gamePattern = [];
}

function nextSequence() {

    userClickedPattern = [];
  level++;

  
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

