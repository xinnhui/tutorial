var avatarContainer = document.getElementById("avatarContainer");
var avatar = document.getElementById("avatar");
var bodyWidth = document.querySelector("body").clientWidth;
console.log(bodyWidth);
var start = 0;
var end = 0;
var x = 0;
var z = 0;
avatar.addEventListener("touchstart", function(event) {
    var touch = event.changedTouches[0];
    start = touch.pageX;
    // console.log(start);
    // console.log(typeof(start) + start + "start");
},false)
avatar.addEventListener("touchend", function(event) {
    var touch = event.changedTouches;
    // for (z; z > bodyWidth * 0.93 * .85 * 6 + bodyWidth * 0.93 * .01 * 18 - bodyWidth * .97;  z += (end - start) ) {
        for (var i =0; i< touch.length; i++) {
            end = touch[i].pageX;
            z += (end - start)
            if (z <  -(bodyWidth * .39)){
                z =  -(bodyWidth * .39);
                // console.log(z);
                // console.log("zin");
            }

            if ( z > 0) {
                z = 0;
            }
            // console.log(z);
            // console.log(end);
            // console.log(bodyWidth * 0.93 * .85 * 6 + bodyWidth * 0.93 * .01 * 18 - bodyWidth * .97);
            // console.log(z + "zout");
            }
    // }
  
},false)
avatar.addEventListener("touchmove",function(event){
    var touch = event.changedTouches;
    for (var i =0; i< touch.length; i++) {
        var pageX = touch[i].pageX; 
        // console.log(pageX);
        // var pageY = touch.pageY;
        x  = z + (pageX - start);
        console.log(x);
        console.log(bodyWidth * .39 + "xxxxxxxxxxx");
        if (x < -(bodyWidth * .39)){
            console.log(x + "rrrrrrr");
            return;
          
        }

        if ( x > bodyWidth * 0.93 * 0.01 * 3.5) {
            return;
        }
    // console.log(x);
        // console.log(z +"z" + pageX +"pX" + start + "st");
        avatar.style.transform = "translateX(" + x + "px)"
    }
  
    // console.log(end);
   
   
    // console.log(typeof(pageX) + pageX + "move");
    // console.log( start - pageX );
},false)

//点击事件 

avatar.addEventListener('touchstart', function(e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    var id = target.id;
    console.log("touchStart");
    switch (id) {
        case "avatar1":
            var avatarList = document.querySelectorAll(".avatarItem");
            for (var i = 0; i < avatarList.length; i++) {
            if(avatarList[i].querySelector("img").getAttribute("class")){
            avatarList[i].querySelector("img").setAttribute("class", "");
            }
            avatarList[0].querySelector("img").setAttribute("class" ,"selected");
            } 
            break; 
        case "avatar2":
            var avatarList = document.querySelectorAll(".avatarItem");
            for (var i = 0; i < avatarList.length; i++) {
            if(avatarList[i].querySelector("img").getAttribute("class")){
            avatarList[i].querySelector("img").setAttribute("class", "");
            }
            avatarList[1].querySelector("img").setAttribute("class" ,"selected");
            } 
            break; 
        case "avatar3":
            var avatarList = document.querySelectorAll(".avatarItem");
            for (var i = 0; i < avatarList.length; i++) {
            if(avatarList[i].querySelector("img").getAttribute("class")){
            avatarList[i].querySelector("img").setAttribute("class", "");
            }
            avatarList[2].querySelector("img").setAttribute("class" ,"selected");
            } 
            break;
        case "avatar4":
            var avatarList = document.querySelectorAll(".avatarItem");
            for (var i = 0; i < avatarList.length; i++) {
            if(avatarList[i].querySelector("img").getAttribute("class")){
            avatarList[i].querySelector("img").setAttribute("class", "");
            }
            avatarList[3].querySelector("img").setAttribute("class" ,"selected");
            } 
            break; 
        case "avatar5":
            var avatarList = document.querySelectorAll(".avatarItem");
            for (var i = 0; i < avatarList.length; i++) {
            if(avatarList[i].querySelector("img").getAttribute("class")){
            avatarList[i].querySelector("img").setAttribute("class", "");
            }
            avatarList[4].querySelector("img").setAttribute("class" ,"selected");
            } 
            break; 
        case "avatar6":
            var avatarList = document.querySelectorAll(".avatarItem");
            for (var i = 0; i < avatarList.length; i++) {
            if(avatarList[i].querySelector("img").getAttribute("class")){
            avatarList[i].querySelector("img").setAttribute("class", "");
            }
            avatarList[5].querySelector("img").setAttribute("class" ,"selected");
            } 
            break;  
    }
},false)