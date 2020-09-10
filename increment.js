//Buttons
function increment(bulk) {
  if (typeof bulk == "undefined") {bulk = 1}
  user.ip.x = user.ip.x.plus(getIncrementx(bulk));
  user.ip.sac = user.ip.sac.plus(getIncrementx(bulk));
  unlockip();
}
function buyIncrementP(n) {
  let cost = getIncrementPCost(n);
  if (user.ip.x.gte(cost)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment.p[n]++;
  }
}

//Get Data
function getIncrementx(bulk) {
  if (typeof bulk == "undefined") {bulk = 1}
  let pn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementP" + i).style.display != "none") {pn = i}}
  let p = getIncrementP(pn);
  for (let i = (pn - 1); i > -1; i--) {p = p.plus(getIncrementP(i))}
  return p.times(bulk);
}
function getIncrementP(n) {return nd(n + 1).pow(nd(n)).times(user.increment.p[n])}
function getIncrementPCost(n) {return nd(1).plus(nd(0.125).times(nd(2).pow(n))).pow(user.increment.p[n]).floor()}
function getIncrementPRatio(n) {if (n == 0) {return nd(1.125)} else if (n == 1) {return nd(1.25)} else if (n == 2) {return nd(1.5)} else if (n == 3) {return nd(2)} else if (n == 4) {return nd(3)}}

//Update Data
function updatepbip() {
  d("pbipsac").textContent = e(user.ip.sac);
  let index = 0;
  for (let i = 0; i < goalsIP.length; i++) {if (user.ip.sac.gte(goalsIP[i])) {index = i + 1}}
  let g = goalsIP[index];
  let u = unlocksIP[index];
  if (g == undefined) {g = goalsIP[index - 1]}
  if (u == undefined) {u = "Nothing"}
  d("pbipgoal").textContent = e(g);
  d("pbipunlock").innerHTML = u;
  d("pbip").style.width = user.ip.sac.divide(g).times(100) + "%";
  if (user.ip.sac.divide(g) > 1) {d("pbip").style.width = "100%"}
}
function updateEquationIP() {
  let xn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementP" + i).style.display != "none") {xn = i}}
  let x = getIncrementP(xn);
  for (let i = (xn - 1); i > -1; i--) {x = x.plus(getIncrementP(i))}
  d("equationP").textContent = e(x);
}
function updateIncrementP(n) {
  if (d("incrementP" + n).style.display != "none") {
    d("incrementP" + n + "x").textContent = e(getIncrementP(n));
    d("incrementP" + n + "Cost").textContent = e(getIncrementPCost(n));
    if (user.ip.x.lt(getIncrementPCost(n))) {rpc("canBuy", "cantBuy", "incrementP" + n + "b")}
    else {rpc("cantBuy", "canBuy", "incrementP" + n + "b")}
  }
}
