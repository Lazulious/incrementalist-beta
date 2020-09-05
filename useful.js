function e(obj, exp, dec) {
  if (typeof obj == "undefined") {return "error-e1"}
  if (typeof exp == "undefined") {exp = 2}
  if (typeof dec == "undefined") {dec = 0}
  if (obj.e >= 6) {
    return obj.m.toFixed(exp) + "e" + comma(obj.e);
  }
  else {
    return comma((obj.m * (Math.pow(10, obj.e))).toFixed(dec));
  }
}

function nd(x) {return new Decimal(x)}
function d(x) {return document.getElementById(x)}
function dc(x) {return document.getElementsByClassName(x)}
function h(x) {document.getElementById(x).style.display = "none"}
function hc(x) {x = dc(x); for (let i = 0; i < x.length; i++) {x[i].style.display = "none"}}
function s(x) {document.getElementById(x).style.display = ""}
function sc(x) {x = dc(x); for (let i = 0; i < x.length; i++) {x[i].style.display = ""}}
function del(a, b) {document.addEventListener(a, b)}
function wel(a, b) {window.addEventListener(a, b)}
function cb(str) {var el = document.createElement("textarea"); el.value = str; el.setAttribute("readonly", ""); el.style = {position: "absolute", left: "-9999px"}; document.body.appendChild(el); cb2(el); document.body.removeChild(el); alert("Copied to clipboard")}
function cb2(el) {el = (typeof el === "string") ? document.querySelector(el) : el; if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {var editable = el.contentEditable; var readOnly = el.readOnly; el.contentEditable = true; el.readOnly = true; var range = document.createRange(); range.selectNodeContents(el); var selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); el.setSelectionRange(0, 999999); el.contentEditable = editable; el.readOnly = readOnly} else {el.select()} document.execCommand("copy")}
function ndn(m, e) {return new Decimal(m).times(nd(10).pow(e))}
/*function comma(x) {return x}*/
/*function comma(x) {return Number(x).toLocaleString()}*/
function comma(x) {return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}

function as(arr, index, del, value) {
  let remove = 0;
  if (del) {remove = 1} else {remove = 0}
  arr.splice(index, remove, value);
}
function tab(t) {
  h("tabAutomation");
  h("tabSacrifice");
  h("tabScaling");
  h("tabIncrement");
  h("tabPrestige");
  h("tabAscension");
  s("tab" + t);
}
