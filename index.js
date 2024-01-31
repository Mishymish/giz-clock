function openPomodoro() {
    $("#pomodoro").removeClass("pomodoroEffect");
    $(".minute").html("25");
    $(".second1").html("0");
    $(".second2").html("0");
    $("#break").addClass("pomodoroEffect");

} 
window.addEventListener("load", openPomodoro);

var interval;
let breakClicked = false;
var pauseArray = [];
let pauseClicked = false;
let stopClicked = false;


    $("#play").click(function() {
        disableBtn();
        playButtonSound();
        playTimer(); 
   });

   $("#break").click(function() {
    breakTimer();
    });

    
    $("#pause").click(function() {
        pauseButtonSound();
        pauseTimer();
    });

    $("#stop").click(function(){
       stopTimer();
      
     
    });

    $("#pomodoro").click(function() {
    location.reload();
    });


function pauseTimer() {
        clearInterval(interval);
        pauseClicked = true;
        
        $("body").css("background", "#E6A4B4");
        $(".timer").css("background", "#F3D7CA");
  
        var mins = $(".minute").html();
        var secs1 = $(".second1").html();
        var secs2 = $(".second2").html();
    
        pauseArray.push(mins);
        pauseArray.push(secs1);
        pauseArray.push(secs2);
        enableBtn();

}

function stopTimer() {
         clearInterval(interval);
         stopClicked = true;
        stopButtonSound();
        openPomodoro();
        $("body").css("background", "#DED0B6");
        $(".timer").css("background", "#B2A59B");
        enableBtn();

      
}

function breakTimer() {
    clearInterval(interval);
    breakClicked = true;
    enableBtn();

    $("#pomodoro").addClass("pomodoroEffect");
    $("#break").removeClass("pomodoroEffect");
   
    $(".minute").html("5");
    $(".second1").html("0");
    $(".second2").html("0");

    $("body").css("background", "#DED0B6");
    $(".timer").css("background", "#B2A59B");
}

function playTimer() {
    $("body").css("background", " #789461");
    $(".timer").css("background", "#DBE7C9");
   

        var minutes = 25;
        var seconds = 60 * minutes; 

        if(stopClicked){
            minutes = 25;
            seconds = minutes * 60;
            stopClicked = false;
            pauseClicked = false;
         
        }


         if(breakClicked){
            minutes = 5;
            seconds = 60 * minutes;    
            breakClicked = false;
            pauseClicked = false;
         } 

     
         if(pauseClicked){
          minutes = parseInt(pauseArray[0]) ;
          seconds = parseInt(pauseArray[1] + pauseArray[2]);
          seconds = minutes * 60 + seconds;
          pauseClicked = false;
          pauseArray = [];
      
          }  

          interval = setInterval(function() {
          seconds = seconds - 1; 
   
            minutes = Math.floor(seconds / 60);
             var remainingSeconds = seconds % 60;

             if(minutes === 0 && remainingSeconds === 0){
                playTimesUpSound();
                clearInterval(interval);
             }
            
             remainingSeconds = remainingSeconds.toString().split('');
            var remainingSecond = remainingSeconds.map(Number);

             var sec1 = remainingSecond[0];
             var sec2= remainingSecond[1];
        
              if(remainingSecond < 10){
               sec2 = remainingSecond[0];
                remainingSecond[0] = 0;
               sec1 = remainingSecond[0];
              }

              $(".minute").html(minutes);
               $(".second1").html(sec1);
             $(".second2").html(sec2);

             
             }, 1000);

}

function playTimesUpSound() {
    var audio = new Audio("./sounds/TimesUp.wav");
    audio.play();
}

function playButtonSound() {
    var audio = new Audio("./sounds/play.mp3");
    audio.play();
}

function pauseButtonSound() {
    var audio = new Audio("./sounds/pause.mp3");
    audio.play();
}

function stopButtonSound() {
    var audio = new Audio("./sounds/stop.mp3");
    audio.play();
}

function disableBtn() {
    document.getElementById("play").disabled = true;
}

function enableBtn() {
    document.getElementById("play").disabled = false;
}



