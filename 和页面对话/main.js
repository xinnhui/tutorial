var btn = document.getElementById("submit-btn");
btn.onclick = function() {
    console.log(document.getElementById("name").value);
}

var input = document.getElementById("name");
input.onkeydown = function(event) {
    switch (event.keyCode) {
        case 13:
            console.log(document.getElementById("name").value);
            break;
        case 27:
            document.getElementById("name").value = "";
            break;
    }
   
} 
