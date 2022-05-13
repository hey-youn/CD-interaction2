let keypressed = [];
let title = document.getElementById("");


let interval = setInterval(changeBackground, 30000);
document.addEventListener('keydown', function(evt) {
    clearInterval(interval);
    document.body.classList.remove("flash");
    working.classList.remove("screaming");

    var panic = document.getElementById("panica1");
    panic.classList.remove("show");
   
    warnings.classList.remove("showa");
    warningsB.classList.remove("showa");
    warningsC.classList.remove("showa");

    interval = setInterval(changeBackground, 10000);
    keypressed.push(evt.key);
});

interval = setInterval(changeBackground, 10000);


function changeBackground() {
    document.body.classList.add("flash");
    var working = document.getElementById("working");
    working.classList.add("screaming");

    var panic = document.getElementById("panica1");
    panic.classList.add("show");

    var warnings = document.getElementById("warning");
    warnings.classList.add("showa");

    var warningsB = document.getElementById("warning2");
    warningsB.classList.add("showa");

    var warningsC = document.getElementById("warning3");
    warningsC.classList.add("showa");
;
}
