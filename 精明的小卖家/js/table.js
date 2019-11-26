let tableWrapperTable = document.getElementById("table-wrapper");
let regionChecked = [];
let productChecked = [];
    //根据select选项获取数据
          
     function myData() {
        let regionArr = new Array();
        regionChecked = [];
       
        regionArr = document.getElementsByName("region");
  
        for (var i = 0; i < regionArr.length; i++) {
            if (regionArr[i].checked){
                regionChecked.push(regionArr[i]);
                // console.log(regionChecked);
            }
        }
        let productArr = new Array();
        productChecked = [];
        productArr = document.getElementsByName("product");
        for (var i = 0; i < productArr.length; i++) {
            if (productArr[i].checked){
                productChecked.push(productArr[i]);
                // console.log(productChecked);
            }
        }
        var source = [];
        for (var j = 0; j < productChecked.length; j++){
            for (var i = 0; i< sourceData.length; i++) {
                if (sourceData[i].product === productChecked[j].value) {
                    for (var z = 0; z < regionChecked.length; z++) {
                            if (sourceData[i].region === regionChecked[z].value) {
                                // console.log(sourceData[i]);
                            source.push(sourceData[i]);
                        }
                    }
                }
            }
        }
    
        // console.log(source);
        return source;
    }
    function tableWrapper(source) {
        let table = document.createElement("table");
        //表头
        let tr = document.createElement("tr");
        if (productChecked.length > 1 && regionChecked.length === 1) {
            table.appendChild(tr);
            let th2 = document.createElement("th");
            th2.textContent = "地区";
            tr.appendChild(th2);
            let th = document.createElement("th");
            th.textContent = "商品";
            tr.appendChild(th);
           
        } else {
            table.appendChild(tr);
            let th = document.createElement("th");
            th.textContent = "商品";
            tr.appendChild(th);
            let th2 = document.createElement("th");
            th2.textContent = "地区";
            tr.appendChild(th2);

        }
        
        for (var i = 0; i < 12; i++) {
            var th3 = document.createElement("th");
            th3.textContent = i + "月";
            tr.appendChild(th3);
        }
        //表格数据
        var tag = 0;//代表已经建立的行数
        for (var i = 0; i < source.length; i++){
            var tr2 = document.createElement("tr");
           
            table.appendChild(tr2);
            if (productChecked.length > 1 && regionChecked.length === 1) {
                if (tag % productChecked.length === 0){
                    var td2 = document.createElement("th");
                    td2.rowSpan = productChecked.length;
                    td2.textContent = source[i].region;
                    tr2.appendChild(td2);
                    console.log(tag);
                }
                tag++;
                var td1 = document.createElement("th");
                td1.textContent = source[i].product;
                tr2.appendChild(td1);
            }else {
                if ( tag % regionChecked.length === 0){
                    var td1 = document.createElement("th");
                    td1.rowSpan = regionChecked.length;
                    td1.textContent = source[i].product;
                    tr2.appendChild(td1);
                }
                tag++;
                
                var td2 = document.createElement("th");
                td2.textContent = source[i].region;
                tr2.appendChild(td2);
            }
        
       
          
            for ( var j = 0; j < 12; j++){
                var td = document.createElement("td");
                td.textContent = source[i].sale[j];
                tr2.appendChild(td);
            }
        }
        tableWrapperTable.textContent = "";
        tableWrapperTable.appendChild(table);
        // return table;
    }