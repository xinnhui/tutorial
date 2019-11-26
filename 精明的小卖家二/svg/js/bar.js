function Histogram(source) {
    let canvasHeight = 200;
    let canvasWidth = 200;
    let canvasXHeigth = 250;
    let canvasXWidth = 10;
    let canvasYWidth = 300;
    let canvasYHeigth = 10;
    var columnWidth = 10;
    var spacing = 20;
    var columnColor = "#0f0"
    var xyColumn = "#00f"
    var columnMax = Math.max.apply(null,source);
    var proporation = columnMax / canvasHeight;
    let start = '<?xml version="1.0" standalone="no"?>'
    +'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" '
    +'"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
    +'<svg width="400" height="400" version="1.1"'
    +'xmlns="http://www.w3.org/2000/svg">';
    let end = "</svg>"
    let canvasX =  "<rect x='20' y='"+ 20+"'height='" + canvasXHeigth
    + "' width='" + canvasXWidth + "' fill='" +  xyColumn + "'/>";
    let canvasY =  "<rect x='10' y='"+ canvasXHeigth +"'height='" + canvasYHeigth
    + "' width='" + canvasYWidth + "' fill='" +  xyColumn + "'/>";
    var columnList = [];
    for (var i = 0; i < source.length; i++) {
        // console.log(source[i]);
        // console.log(proporation);
        console.log();
        columnList += "<rect x='" + (spacing * (i+1)+20) + "' y='"+(canvasXHeigth- source[i] / proporation)
        + "' width='" + columnWidth +"' height='" + source[i] / proporation
        + "' fill='" +  columnColor + "'/>";
    }
    return start +canvasX +canvasY +columnList+ end;
}