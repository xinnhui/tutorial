var time = document.getElementById("time");
var addressList = document.getElementById("addrssList");
var bodyWidth = document.querySelector("body").clientWidth;
var start = 0;
var end = 0;
var x = 0;
var z = 0;
addressList.addEventListener("touchstart", function(event) {
    var touch = event.changedTouches[0];
    start = touch.pageX;
    console.log(start);
    // console.log(typeof(start) + start + "start");
},false)
addressList.addEventListener("touchend", function(event) {
    var touch = event.changedTouches;
    // for (z; z > bodyWidth * 0.93 * .85 * 6 + bodyWidth * 0.93 * .01 * 18 - bodyWidth * .97;  z += (end - start) ) {
        for (var i =0; i< touch.length; i++) {
            end = touch[i].pageX;
            z += (end - start)
            // if ((end - start) >  bodyWidth * 0.93 * .85 * 6 + bodyWidth * 0.93 * .01 * 18 - bodyWidth * .97){
            //     break;
            // }
            // console.log(end);
            // console.log(z);
            }
    // }
  
},false)
addressList.addEventListener("touchmove",function(event){
    var touch = event.changedTouches;
    for (var i =0; i< touch.length; i++) {
        var pageX = touch[i].pageX;
        // console.log(pageX);
        // var pageY = touch.pageY;
        x  = z + (pageX - start);
    console.log(x);
        // console.log(z +"z" + pageX +"pX" + start + "st");
        addressList.style.transform = "translateX(" + x + "px)"
    }
  
    // console.log(end);
   
   
    // console.log(typeof(pageX) + pageX + "move");
    // console.log( start - pageX );
},false)