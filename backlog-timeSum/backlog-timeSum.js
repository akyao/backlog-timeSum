(function(){

  var tbl = document.getElementById("issues-table");

  if ( tbl ) {
    var estTimeSum = 0;
    var actTimeSum = 0;
    for (var i = 0; i < tbl.rows.length; i++) {
      // row loop
      var row = tbl.rows[i];
      for (var j = 0; j < row.cells.length; j++) {
        // cell loop
        var cell = row.cells[j];
        var dataAttr = cell.getAttribute("data-column-name");
        if (dataAttr == "estimatedHours") {
          estTimeSum = estTimeSum + Number(cell.innerHTML);
        } else if (dataAttr == "actualHours") {
          actTimeSum = actTimeSum + Number(cell.innerHTML);
        }
      }
    }

    console.log("予定:" + estTimeSum);
    console.log("実績:" + actTimeSum);
  }
})();
