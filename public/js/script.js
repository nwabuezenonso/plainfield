//Function for the hamburger menu
function myFunction(x) {
    x.classList.toggle("change");
    document.querySelector('.navbar ul').classList.toggle("active");
    // document.querySelector('.menu-btn i').classList.toggle("active");
}

var videoPlayer = document.getElementById("videoPlayer")
var myVideo = document.getElementById("myVideo")

function stopVideo(){
    videoPlayer.style.display = "none"
}

function playVideo(file){
    myVideo.src = file
    videoPlayer.style.display = 'block'
}
