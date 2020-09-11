function e(obj, exp, dec) {
  if (typeof obj == "undefined") {return "error-e1"}
  if (typeof exp == "undefined") {exp = 2}
  if (typeof dec == "undefined") {dec = 0}
  if (obj.e >= 6) {return obj.m.toFixed(exp) + "e" + comma(obj.e)}
  else {return ((obj.m * (Math.pow(10, obj.e))).toFixed(dec)).toLocaleString()}
}

function nd(x) {return new Decimal(x)}
function d(x) {return document.getElementById(x)}
function dc(x) {return document.getElementsByClassName(x)}
function h(x) {document.getElementById(x).style.display = "none"}
function hc(x) {x = document.getElementsByClassName(x); for (let i = 0; i < x.length; i++) {x[i].style.display = "none"}}
function s(x) {document.getElementById(x).style.display = ""}
function sc(x) {x = document.getElementsByClassName(x); for (let i = 0; i < x.length; i++) {x[i].style.display = ""}}
function st(x) {document.getElementById(x).style.display = "table-cell"}
function del(a, b) {document.addEventListener(a, b)}/** */
function wel(a, b) {window.addEventListener(a, b)}/** */
function cb(str) {var el = document.createElement("textarea"); el.value = str; el.setAttribute("readonly", ""); el.style = {position: "absolute", left: "-9999px"}; document.body.appendChild(el); cb2(el); document.body.removeChild(el); alert("Copied to clipboard")}/** */
function cb2(el) {el = (typeof el === "string") ? document.querySelector(el) : el; if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {var editable = el.contentEditable; var readOnly = el.readOnly; el.contentEditable = true; el.readOnly = true; var range = document.createRange(); range.selectNodeContents(el); var selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); el.setSelectionRange(0, 999999); el.contentEditable = editable; el.readOnly = readOnly} else {el.select()} document.execCommand("copy")}/** */
function ndn(m, e) {return new Decimal(m).times(nd(10).pow(e))}
function ac(cl, id) {id = document.getElementById(id); let arr = id.className.split(" "); if (arr.indexOf(cl) == -1) {id.className += " " + cl}}
function rc(cl, id) {id = document.getElementById(id); let arr = id.className.split(" "); let reg = new RegExp(cl, "g"); if (arr.indexOf(cl) >= 0) {id.className = id.className.replace(reg, "")}}
function rpc(cl1, cl2, id) {id = document.getElementById(id); let arr = id.className.split(" "); let reg = new RegExp(cl1, "g"); if (arr.indexOf(cl1) >= 0 && arr.indexOf(cl2) == -1) {id.className = id.className.replace(reg, cl2)}}
function as(arr, index, del, value) {if (typeof value == "undefined") {value = "Nothing"} let remove = 0; if (del) {remove = 1} else {remove = 0} arr.splice(index, remove, value)} /** */

function tab(t) {
  h("tabAutomation");
  h("tabSacrifice");
  h("tabScaling");
  h("tabIncrement");
  h("tabPrestige");
  h("tabAscension");
  s("tab" + t);
  user.tab = t;
}
