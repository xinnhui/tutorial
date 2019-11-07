var nowTime = document.getElementById("time");
var date = new Date();
hello(date.getHours());
function hello (hours){
    if (hours > 6 && hours < 12) {
        nowTime.textContent="上午好!";
    } else if (hours > 12 && hours < 18){
        nowTime.textContent="下午好!";
    }else {
        nowTime.textContent="晚上好!";
    }

}