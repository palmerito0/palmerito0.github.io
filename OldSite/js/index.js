var audio;

$(document).ready(function() {
    audio = new Audio('../assets/easy.mp3');
});

$("#easy").on("click", function(){
    audio.play();
});