//main
function e(obj, exp, dec) {
  if (typeof obj == "undefined") {return "Error-e1"}
  if (typeof obj == "number") {return "Error-e2"}
  /*if (typeof obj == "string") {return obj}*/
  if (typeof exp == "undefined") {exp = 2}
  if (typeof dec == "undefined") {dec = 0}
  if (dec > 10) {dec = 10}
  if (obj.e >= 1e6) {
    return obj.m.toFixed(exp) + "e" + obj.e.toExponential(exp)/*.replace("1e+", "e")*/.replace("e+", "e");
  }
  else if (obj.e >= 6) {
    if (obj.m.toFixed(exp) >= 10) {obj.m /= 10; obj.e++}
    return obj.m.toFixed(exp) + "e" + obj.e.toLocaleString();
  }
  else {
    let x = obj.m * (10 ** obj.e);
    x = Number(x.toFixed(dec)).toLocaleString();
    if (x.indexOf(".") < 0 && dec > 0) {x += "."}
    for (let i = 1; i <= dec; i++) {
      if (x.toString().charAt(x.toString().length - dec - 1) != ".") {
        x = x.toString() + "0";
      }
    }
    return x;
  }
}
function nd(value) {return new Decimal(value)}
function d(x) {return document.getElementById(x)}
function h(x) {document.getElementById(x).style.display = "none"}
function s(x) {document.getElementById(x).style.display = "inline"}
function del(a, b) {document.addEventListener(a, b)}
function wel(a, b) {window.addEventListener(a, b)}
function time(obj) {
  let x = obj.divide(1000);
  if (x == "Infinity" || typeof x == "null" || typeof obj == "undefined") {return "Infinite Time"}
  let y = e(x.divide(31536000).floor());
  let yy = (y == 1) ? " Year " : " Years ";
  let d = x.divide(31536000).minus(x.divide(31536000).floor()).times(31536000).floor().divide(86400).floor();
  let dd = (d == 1) ? " Day " : " Days ";
  let h = x.divide(86400).minus(x.divide(86400).floor()).times(86400).floor().divide(3600).floor();
  let hh = (h == 1) ? " Hour " : " Hours ";
  let m = x.divide(3600).minus(x.divide(3600).floor()).times(3600).floor().divide(60).floor();
  let mm = (m == 1) ? " Minute " : " Minutes ";
  let s = x.divide(60).minus(x.divide(60).floor()).times(60).toFixed(3)/*.floor()*/;
  let ss = (s == 1) ? " Second " : " Seconds ";
  if (y == 0) {y = ""; yy = ""}
  if (d == 0) {d = ""; dd = ""}
  if (h == 0 || y > 0) {h = ""; hh = ""}
  if (m == 0 || d > 0 || y > 0) {m = ""; mm = ""}
  if (h > 0 || d > 0 || y > 0) {s = ""; ss = ""}
  return y + yy + d + dd + h + hh + m + mm + s + ss;
}
function cb(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el);
  cb2(el);
  document.body.removeChild(el);
  alert("Copied to clipboard");
}
function cb2(el) {
  el = (typeof el === "string") ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  }
  else {el.select()}
  document.execCommand("copy");
}

//other
function tab(t) {
  for (let i = 0; i < tabs.length; i++) {h("tab" + tabs[i])}
  s("tab" + t);
  user.tab = t;
}
