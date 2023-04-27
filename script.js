var buttonColours = ["red", "green", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {

       if(!started) {
              $("#level").text("Level " + level);
              nextSequence();
              started = true;
       }

})

$(".btn").click(function() {
       var userChosenColour = $(this).attr("id");
       userClickedPattern.push(userChosenColour);

       playSound(userChosenColour);

       animatePress(userChosenColour);

       checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
       if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

              console.log("success");

              if (gamePattern.length === userClickedPattern.length) {
                     setTimeout(function (){
                            nextSequence();
                     }, 1000);
              }

       } else {

              console.log("wrong");

              playSound("wrong");

              $("h1").text("Game Over Press Any Key To Restart");

              $(document).keypress(function() {
                     $("h1").text("Press A Key To Start The Game!");
                     startOver();
              })

              $(".btn").click(function() {
                     $("h1").text("Press A Key To Start The Game!");
                     startOver(); 
              })
       }
}

function nextSequence() {
       userClickedPattern = [];

       level++;

       $("#level").text("Level " + level)

       var randomNumber = Math.floor(Math.random() * 4);
       var randomChosenColour = buttonColours[randomNumber];
       gamePattern.push(randomChosenColour);

       $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

       console.log(gamePattern);
}

function playSound(name) {
       var audio = new Audio("sounds/" + name + ".mp3");
       audio.play();
}

function animatePress(currentColour) {
       $("#" + currentColour).addClass("effect")

       setTimeout(function () {
              $("#" + currentColour).removeClass("effect");
       }, 100)
}

function startOver() {
       gamePattern = [];

       started = false;

       level = 0;
}