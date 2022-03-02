//Function for the hamburger menu
function myFunction(x) {
    x.classList.toggle("change");
    document.querySelector('.navbar ul').classList.toggle("active");
    // document.querySelector('.menu-btn i').classList.toggle("active");
}

//function for phone view navigation bar
// document.querySelector('.menu-btn').addEventListener('click', ()=>{
//     document.querySelector('.navbar .menu').classList.toggle("active");
//     document.querySelector('.menu-btn i').classList.toggle("active");
// })

//Faq script
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
