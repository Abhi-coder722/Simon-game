var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

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


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startover();
    }

}

function nextSequence() {
// updating the level and giving the random sequences  i.e. game pattern 
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

    // playing sound using this function 
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
    // animating the presses button for few milliseconds
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startover(){
    // one you are out , this will be executed and it will reset all the values
    gamePattern=[];
    level=0;
    started=false;
    userClickedPattern=[];


}



// the above is the modified code for easy understanding and the names are related to the functioning but the code present down works as well half the way 


// var btn_clr = ["red", "blue", "green", "yellow"];

// var g_ptrn = [];

// var user_ptrn = [];

// var started = false;
// var level = 0;

// $(document).keypress(function () {
//     if (!started) {
//         $("#level-title").text("Level " + level);
//         nextSequence();
//         started = true;
//     }
// });

// $(".btn").click(function () {
//     var user_chose = $(this).attr("id");
//     user_ptrn.push(user_chose);

//     playsound(user_chose);
//     animatepress(user_chose);

//     checkAnswer(user_ptrn.length - 1);
// });


// function checkAnswer(currentLevel) {
//     if (user_ptrn[currentLevel] === g_ptrn[currentLevel]) {
//         console.log("Success!");
//         if (user_ptrn.length === g_ptrn.length) {
//             setTimeout(function () {
//                 nextSequence();
//             }, 1000);
//         }
//         else {
//             console.log("wrong");
//             playsound("wrong");
//             $("body").addClass("game-over");
//             setTimeout(function () {
//                 $("body").removeClass("game-over");
//             }, 300);
//             $("h1").text("Game Over, Press Any Key to Restart!!");
//         }
//     }
// };



// function nextSequence() {
//     //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
//     user_ptrn = [];
//     level++;
//     $('h1').text('Level ' + level);
//     var r_n = Math.ceil(Math.random() * 4 - 1);
//     var r_chosen_clr=btn_clr[r_n];
//     g_ptrn.push(r_chosen_clr);
//     $('#' + r_chosen_clr).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//     playsound(r_chosen_clr);
// }
// function playsound(name) {
//     var audio = new Audio('sounds/' + name + ".mp3");
//     audio.play();
// }

// function animatepress(curr_clr) {
//     $("#" + curr_clr).addClass("pressed");
//     setTimeout(function () {
//         $("#" + curr_clr).removeClass("pressed");
//     }, 100);
// }