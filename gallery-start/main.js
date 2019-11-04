const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 遍历图片并添加至缩略图区 */
var pic = new Array();
var i;
for(i=1; i<=5; i++){
   pic.push("./images/pic" + i + ".jpg");
   const newImage = document.createElement('img');
    newImage.setAttribute('src', pic[i - 1]);
    thumbBar.appendChild(newImage);
    alert("xx");
    
    newImage.addEventListener('click', (e) => {
        alert(i,pic[i - 1]);
        var src = e.target.getAttribute("src");
        switchPic(src);
    })
    // displayedImage.onclick= switchPic;
    }
// btn.onckick= function() {opacityPic()};
/* 编写 变亮/变暗 按钮 */

function switchPic(src){
    // alert(src[1]);
    displayedImage.setAttribute('src', src);
}

btn.onclick= function () {
    alert("opcation");
   if(btn.getAttribute("class")==="dark") {
       btn.setAttribute("class", "light");
       btn.textContent = "变亮";
       overlay.style.backgroundColor = "rgba(0, 0, 0, .5)";
   }else {
    btn.setAttribute("class", "dark");
    btn.textContent = "变暗";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
   }
}