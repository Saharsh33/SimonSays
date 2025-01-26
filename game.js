var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var toggle = false;
level=0;//level counter

$(document).keydown(function(){//chech for keypress
    if (!toggle) {//checks if toggle is false
        $("h1").text("Level "+level);
        nextSequence();//starts game
        toggle=true;
    }
});


$(".btn").click(function(){//looking for btn class elements that got clicked
    var userChosenColor = $(this).attr("id");//storing id of clicked element
    userClickedPattern.push(userChosenColor);//inserting id of clicked button into userClickedPattern array
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);//send value of current entry index to checkAnswer function
});

function nextSequence() {
    level++;//level increament
    $("h1").text("Level "+level);//prints current level
    var randomNumber = Math.random();
    randomNumber=Math.floor(randomNumber*4);//generating random number
    var randomChosenColor=buttonColors[randomNumber];//using randomnumber to slect color from array
    gamePattern.push(randomChosenColor);//inserting that color into gamePattern array
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);//click animation
    playSound(randomChosenColor);


}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");//playing sound of button that clicked
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");//apply class
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");//remove class after 100ms
    },100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {//take currentLevel as index and matches to both arrays game and input one
        
        if (userClickedPattern.length===gamePattern.length) {//if both array lengths are equal which means level is completed
            userClickedPattern=[];
            setTimeout(function(){nextSequence()},1000);//calls nextSequence again after 1000ms
        }
    } else {
        $("h1").text("Game Over,press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        var gameOverSound = new Audio("./sounds/wrong.mp3");
        gameOverSound.play();
        startOver();
    }
}

function startOver(){
    level=0;//sets initial variable and arrays to default
    gamePattern=[];
    userClickedPattern=[];
    toggle=false;
    setTimeout(function(){
        $("h1").text("Press A Key to Start");
    },1000);
    
}
//code by Saharsh
