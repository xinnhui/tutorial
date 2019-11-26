     //创建checkbox组
     function checkBox(checkBoxContanier,checkBoxArry) {
        var checkBoxHtml = [];
        var inputAll = document.createElement("input");
        inputAll.setAttribute("type", "checkbox");
        checkBoxContanier.appendChild(inputAll);
        inputAll.setAttribute("checkbox-type", "all");
        checkBoxHtml.push(inputAll);
        for (var i = 0; i < checkBoxArry.length; i++) {
           var input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("checkbox-type", "item");
            input.setAttribute("name", checkBoxArry[i].name);
            input.setAttribute("value", checkBoxArry[i].value);
            if(i === 0) {
                input.setAttribute("checked", true);
            }
            var text = document.createTextNode(checkBoxArry[i].text);
            checkBoxContanier.appendChild(input);
            checkBoxContanier.appendChild(text);
            checkBoxHtml.push(input);
        }

        // 点击选择
        checkBoxContanier.onclick = function(e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            var count = 0;
            // e.preventDefault();
            if (target.getAttribute("checkbox-type")==="all") {
                for( var i = 1; i< checkBoxHtml.length; i++) {
                    if(checkBoxHtml[0].checked){
                        checkBoxHtml[i].checked = true;
                    }else {
                        // checkBoxHtml[i].checked = false;
                    }
                }
            }else {
                for (var i = 1; i < checkBoxHtml.length; i++){
                   
                    if(checkBoxHtml[i].checked === true){
                        count++;
                        // console.log(count + "i" + i);
                    }
                }
                // console.log(count + "i" + i);
                if (count === 0) {
                    target.checked = true;
                }else if( count === checkBoxHtml.length -1) {
                        checkBoxHtml[0].checked = true;
                        // target.checked = true;
                } else if ( count === checkBoxHtml.length -2) {
                  
                    checkBoxHtml[0].checked = false;
                  
                    // target.checked = false;
                } else {
                   
                }
            }
            //生成表格
            var source = myData();
            tableWrapper(source);
        }

    }