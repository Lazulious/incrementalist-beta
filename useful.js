function e(obj, exp, dec) {
  if (typeof obj == "undefined") {return "error-e1"}
  if (typeof exp == "undefined") {exp = 2}
  if (typeof dec == "undefined") {dec = 0}
  if (obj.e >= 6) {
    if (obj.m.toFixed(exp) >= 10) {return (obj.m.toFixed(exp) / 10).toFixed(exp) + "e" + (obj.e + 1).toLocaleString()}
    else {return obj.m.toFixed(exp) + "e" + obj.e.toLocaleString()}
  }
  else {return comma((obj.m * (Math.pow(10, obj.e))).toFixed(dec))}
}
function d(x) {return document.getElementById(x)}
function dc(x) {return document.getElementsByClassName(x)}
function h(x) {document.getElementById(x).style.display = "none"}
function hc(x) {x = document.getElementsByClassName(x); for (let i = 0; i < x.length; i++) {x[i].style.display = "none"}}
function s(x) {document.getElementById(x).style.display = ""}
function sc(x) {x = document.getElementsByClassName(x); for (let i = 0; i < x.length; i++) {x[i].style.display = ""}}
function st(x) {document.getElementById(x).style.display = "table-cell"}
function ac(cl, id) {document.getElementById(id).classList.add(cl)}
function rc(cl, id) {document.getElementById(id).classList.remove(cl)}
function rpc(cl1, cl2, id) {id = document.getElementById(id); id.classList.remove(cl1); id.classList.add(cl2)}
function comma(x) {return Number(x).toLocaleString()}

function nd(x) {return new Decimal(x)}
function ndn(m, e) {return new Decimal(m).times(nd(10).pow(e))}
function del(a, b) {document.addEventListener(a, b)}/**/
function wel(a, b) {window.addEventListener(a, b)}/**/
function cb(str) {var el = document.createElement("textarea"); el.value = str; el.setAttribute("readonly", ""); el.style = {position: "absolute", left: "-9999px"}; document.body.appendChild(el); cb2(el); document.body.removeChild(el); alert("Copied to clipboard")}/**/
function cb2(el) {el = (typeof el === "string") ? document.querySelector(el) : el; if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {var editable = el.contentEditable; var readOnly = el.readOnly; el.contentEditable = true; el.readOnly = true; var range = document.createRange(); range.selectNodeContents(el); var selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); el.setSelectionRange(0, 999999); el.contentEditable = editable; el.readOnly = readOnly} else {el.select()} document.execCommand("copy")}/**/
function as(arr, index, del, value) {if (typeof value == "undefined") {value = "Nothing"} let remove = 0; if (del) {remove = 1} else {remove = 0} arr.splice(index, remove, value)} /**/
function of(element) {return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth}/*?*/

var tabs = ["Options", "Automation", "Sacrifice", "Scaling", "Increment", "Prestige", "Ascension"];
function tab(t) {
  for (let i = 0; i < tabs.length; i++) {h("tab" + tabs[i])}
  s("tab" + t);
  user.tab = t;
}
