let regionRadioWrapper =document.getElementById("region-radio-wrapper");
let productRadioWrapper =document.getElementById("product-radio-wrapper");
checkBox(regionRadioWrapper,[{
    name: "region",
    value: "华东",
    text: "华东"
},{
    name: "region",
    value: "华北",
    text: "华北"
},{
    name: "region",
    value: "华南",
    text: "华南"
}])
checkBox(productRadioWrapper,[{
    name: "product",
    value: "手机",
    text: "手机"
},{
    name: "product",
    value: "笔记本",
    text: "笔记本"
},{
    name: "product",
    value: "智能音箱",
    text: "智能音箱"
}])
var source = myData();
tableWrapper(source);
