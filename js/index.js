var audio;

$(document).ready(function() {
    audio = new Audio('easy.mp3');
});

$("#easy").on("click", function(){
    audio.play();
});