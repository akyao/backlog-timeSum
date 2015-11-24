/*
 * thanks to ClassListUtil
 * http://d.hatena.ne.jp/vividcode/20111014/1318589166
 */
var ClassListUtil = {};
(function ns() {
var toUnicodeEscapedString = function toUnicodeEscapedString( str ) {
    // ECMAScript は UTF-16 ベースなのでサロゲートペアの扱いもこれで良い
    var strt = [];
    var i, len, j;
    for( i = 0, len = str.length; i < len; ++ i ) {
        var s = "\\u";
        var n = str.charCodeAt( i ).toString( 16 );
        for( j = 4 - n.length; 0 < j; -- j ) s += "0";
        s += n;
        strt.push( s );
    }
    return strt.join( "" );
};
ClassListUtil.toUnicodeEscapedString = toUnicodeEscapedString;
var createRegExp = function createRegExp( className ) {
    return new RegExp( "(?:^|[\x09\x0A\x0C\x0D\x20])"
            + toUnicodeEscapedString( className ) + "(?=$|[\x09\x0A\x0C\x0D\x20])", "g" );
};
ClassListUtil.createRegExp = createRegExp;
var add = function add( elem, className ) {
    var list = elem.classList;
    if( list && list.add ) {
        list.add( className );
    } else {
        this._add( elem, createRegExp( className ), className );
    }
};
ClassListUtil.add = add;
var remove = function remove( elem, className ) {
    var list = elem.classList;
    if( list && list.remove ) {
        list.remove( className );
    } else {
        this._remove( elem, createRegExp( className ) );
    }
};
ClassListUtil.remove = remove;
var contains = function contains( elem, className ) {
    var list = elem.classList;
    if( list && list.contains ) {
        return list.contains( className );
    } else {
        return _contains( elem, createRegExp( className ) );
    }
};
ClassListUtil.contains = contains;
var toggle = function toggle( elem, className ) {
    var list = elem.classList;
    if( list && list.toggle ) {
        return list.toggle( className );
    } else {
        return _toggle( elem, createRegExp( className ), className );
    }
};
ClassListUtil.toggle = toggle;
var _add = function _add( elem, regexp, className ) {
    var targetClassListStr = elem.className;
    if( ! regexp.test( targetClassListStr ) ) {
        elem.className = targetClassListStr + " " + className;
    }
};
ClassListUtil._add = _add;
var _remove = function _remove( elem, regexp ) {
    var targetClassListStr = elem.className;
    elem.className = elem.className.replace( regexp, "" );
};
ClassListUtil._remove = _remove;
var _contains = function _contain( elem, regexp ) {
    var targetClassListStr = elem.className;
    return regexp.test( targetClassListStr );
};
ClassListUtil._contains = _contains;
var _toggle = function _toggle( elem, regexp, className ) {
    var hasClassName = _contains( elem, regexp );
    if( hasClassName ) {
        _remove( elem, regexp );
    } else {
        _add( elem, regexp, className );
    }
    return ! hasClassName;
};
ClassListUtil._toggle = _toggle;
})();

(function(){

  var tbl = document.getElementById("issues-table");

  if ( tbl ) {
    var estTimeSum = 0;
    var actTimeSum = 0;
    for (var i = 0; i < tbl.rows.length; i++) {
      // row loop
      var row = tbl.rows[i];
      var isChildRow = ClassListUtil.contains(row, "childIssueRow");
      if (!isChildRow) {
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
    }

    console.log("予定:" + estTimeSum);
    console.log("実績:" + actTimeSum);
  }
})();
