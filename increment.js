//Buttons
function increment(bulk) {
  if (typeof bulk == "undefined") {bulk = 1}
  user.ip.x = user.ip.x.plus(getIncrementx(bulk));
  user.ip.sac = user.ip.sac.plus(getIncrementx(bulk));
  unlockIP();
}
function buyIncrementP(n) {
  let cost = getIncrementPCost(n);
  if (user.ip.x.gte(cost)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment.p[n]++;
  }
}
function buyIncrementM(n) {
  let cost = getIncrementMCost(n);
  if (user.ip.x.gte(cost)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment.m[n]++;
  }
}

//Get Data
function getIncrementx(bulk) {
  if (typeof bulk == "undefined") {bulk = 1}
  let pn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementP" + i).style.display != "none") {pn = i}}
  let p = getIncrementP(pn);
  for (let i = (pn - 1); i > -1; i--) {p = p.times(getSacrificeIPP()).plus(getIncrementP(i))}
  let mn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementM" + i).style.display != "none") {mn = i}}
  let m = getIncrementM(mn);
  for (let i = (mn - 1); i > -1; i--) {m = m.times(getSacrificeIPM()).times(getIncrementM(i))}
  return p.times(m).times(bulk);
}
function getIncrementP(n) {return nd(n + 1).pow(nd(n)).times(user.increment.p[n])}
function getIncrementPCost(n) {
  return nd(1).plus(nd(0.125).times(nd(2).pow(n)).times(nd(0.9).pow(user.scaling.p))).pow(user.increment.p[n]).round();
}
function getIncrementPRatio(n) {
  if (n == 0) {return nd(1).plus(nd(0.125).times(nd(0.9).pow(user.scaling.p)))}
  else if (n == 1) {return nd(1).plus(nd(0.25).times(nd(0.9).pow(user.scaling.p)))}
  else if (n == 2) {return nd(1).plus(nd(0.5).times(nd(0.9).pow(user.scaling.p)))}
  else if (n == 3) {return nd(1).plus(nd(1).times(nd(0.9).pow(user.scaling.p)))}
  else if (n == 4) {return nd(1).plus(nd(2).times(nd(0.9).pow(user.scaling.p)))}
}
function getIncrementM(n) {return nd(3).pow(n).times(user.increment.m[n]).plus(1)}
function getIncrementMCost(n) {return nd(1e7).times(nd(1).plus(0.3579).pow(n + 1).pow(user.increment.m[n]))}
function getIncrementMRatio(n) {
  if (n == 0) {return nd(1).plus(0.3579)}
  else if (n == 1) {return nd(1).plus(0.8439)}
  else if (n == 2) {return nd(1).plus(1.5038)}
  else if (n == 3) {return nd(1).plus(2.4)}
  else if (n == 4) {return nd(1).plus(3.6168)}
}

//Update Data
function updatepbip() {
  d("pbipsac").textContent = e(user.ip.sac);
  let index = 0;
  for (let i = 0; i < goalsIP.length; i++) {if (user.ip.sac.gte(goalsIP[i])) {index = i + 1}}
  let g = goalsIP[index];
  let u = unlocksIP[index];
  if (g == undefined) {g = goalsIP[index - 1]}
  if (u == undefined) {u = "Nothing"}
  if (g.gt(getSacrificeIPCost())) {
    g = getSacrificeIPCost();
    u = "Sacrifice";
  }
  d("pbipgoal").textContent = e(g);
  d("pbipunlock").innerHTML = u;
  d("pbip").style.width = user.ip.sac.divide(g).times(100) + "%";
  if (user.ip.sac.divide(g) > 1) {d("pbip").style.width = "100%"}
}
function updateEquationIP() {
  let pn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementP" + i).style.display != "none") {pn = i}}
  let p = getIncrementP(pn);
  for (let i = (pn - 1); i > -1; i--) {p = p.times(getSacrificeIPP()).plus(getIncrementP(i))}
  d("equationP").textContent = e(p);
  let mn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementM" + i).style.display != "none") {mn = i}}
  let m = getIncrementM(mn);
  for (let i = (mn - 1); i > -1; i--) {m = m.times(getSacrificeIPM()).times(getIncrementM(i))}
  d("equationM").textContent = e(m);
  d("equationResult").textContent = e(p.times(m));
}
function updateCoefficientP() {
  let arr = dc("coefficientP");
  for (let i = 0; i < arr.length; i++) {arr[i].textContent = e(getSacrificeIPP())}
}
function updateCoefficientM() {
  let arr = dc("coefficientM");
  for (let i = 0; i < arr.length; i++) {arr[i].textContent = e(getSacrificeIPM())}
}
function updateIncrementP(n) {
  if (d("incrementP" + n).style.display != "none") {
    d("incrementP" + n + "x").textContent = e(getIncrementP(n));
    d("incrementP" + n + "Cost").textContent = e(getIncrementPCost(n));
    if (user.ip.x.lt(getIncrementPCost(n))) {rpc("canBuy", "cantBuy", "incrementP" + n + "b")}
    else {rpc("cantBuy", "canBuy", "incrementP" + n + "b")}
  }
}
function updateIncrementM(n) {
  if (d("incrementM" + n).style.display != "none") {
    d("incrementM" + n + "x").textContent = e(getIncrementM(n));
    d("incrementM" + n + "Cost").textContent = e(getIncrementMCost(n));
    if (user.ip.x.lt(getIncrementMCost(n))) {rpc("canBuy", "cantBuy", "incrementM" + n + "b")}
    else {rpc("cantBuy", "canBuy", "incrementM" + n + "b")}
  }
}
