//Buttons
function increment() {
  user.ip.x = user.ip.x.plus(getIncrementx());
  user.ip.sac = user.ip.sac.plus(getIncrementx());
}
function buyIncrement(v, n) {
  let cost = getIncrement(v, n, "Cost");
  if (user.ip.x.gte(cost)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment[v][n]++;
    unlockIP();
  }
}

//Get Data
function getIncrementx() {
  let pn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementP" + i).style.display != "none") {pn = i}}
  let p = getIncrement("p", pn, "x");
  for (let i = (pn - 1); i > -1; i--) {p = p.plus(getIncrement("p", i, "x"))}
  return p;
}
function getIncrement(v, n, type) {
  if (v == "p") {
    if (type == "x") {return nd(n + 1).pow(nd(n)).times(user.increment.p[n])}
    else if (type == "Cost") {return nd(1).plus(nd(0.125).times(nd(2).pow(n))).pow(user.increment.p[n]).floor()}
  }
}

//Update Data
function updateEquationIP() {
  let xn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementP" + i).style.display != "none") {xn = i}}
  let x = getIncrement("p", xn, "x");
  for (let i = (xn - 1); i > -1; i--) {x = x.plus(getIncrement("p", i, "x"))}
  d("equationP").textContent = x;
}
function updateIncrement(v, n, type) {
  let id = "increment" + v.toUpperCase() + n + type;
  if (d(id).style.display != "none") {
    d(id).textContent = e(getIncrement(v, n, type));
  }
}
