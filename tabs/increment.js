//Buttons
function clickIncrement() {
  if (user.achievements.includes("ach2-1")) {increment(100)}
  else {increment(1)}
  user.increment.ip++;
}
function increment(bulk) {
  if (typeof bulk == "undefined") {bulk = 1}
  user.ip.x = user.ip.x.plus(getIncrementx(bulk));
  user.ip.sac = user.ip.sac.plus(getIncrementx(bulk));
  user.ip.total = user.ip.total.plus(getIncrementx(bulk));
  if (user.ip.x.gt(user.ip.highest)) {user.ip.highest = user.ip.x}
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
function buyIncrementE(n) {
  let cost = getIncrementECost(n);
  if (user.ip.x.gte(cost)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment.e[n]++;
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
  let En = -1;
  for (let i = 0; i < 2; i++) {if (d("incrementE" + i).style.display != "none") {En = i}}
  let E = getIncrementE(En);
  for (let i = (En - 1); i > -1; i--) {E = E.plus(getIncrementE(i))}
  E = E.plus(1);
  return p.times(m).pow(E).times(bulk);
}
function getIncrementP(n) {return nd(n + 1).pow(nd(n)).times(user.increment.p[n])}
function getIncrementPCost(n) {
  if (user.achievements.includes("ach2-2")) {return nd(1).plus(nd(0.125).times(nd(2).pow(n)).times(nd(0.9).pow(user.scaling.p)).divide(5)).pow(user.increment.p[n]).round()}
  else {return nd(1).plus(nd(0.125).times(nd(2).pow(n)).times(nd(0.9).pow(user.scaling.p))).pow(user.increment.p[n]).round()}
}
function getIncrementPRatio(n) {
  if (user.achievements.includes("ach2-2")) {return nd(1).plus(nd(0.125).times(nd(2).pow(n)).times(nd(0.9).pow(user.scaling.p)).divide(5))}
  else {return nd(1).plus(nd(0.125).times(nd(2).pow(n)).times(nd(0.9).pow(user.scaling.p)))}
}
function getIncrementM(n) {return nd(3).pow(n).times(user.increment.m[n]).plus(1)}
function getIncrementMCost(n) {return nd(1e7).times(nd(1).plus(0.3579).pow(n + 1).pow(user.increment.m[n]))}
function getIncrementMRatio(n) {return nd(1).plus(0.3579).pow(n + 1)}
function getIncrementE(n) {return nd(user.increment.e[n] + 1).log10().divide(3.5 / (Math.sqrt(n + 1)))}
function getIncrementECost(n) {return nd(1e30).times(nd(1e30).pow(user.increment.e[n] * (n + 1)))}
function getIncrementERatio(n) {return nd(1e30).pow(n)}

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
  d("ipEquationP").textContent = e(p);
  let mn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementM" + i).style.display != "none") {mn = i}}
  let m = getIncrementM(mn);
  for (let i = (mn - 1); i > -1; i--) {m = m.times(getSacrificeIPM()).times(getIncrementM(i))}
  d("ipEquationM").textContent = e(m);
  let En = -1;
  for (let i = 0; i < 2; i++) {if (d("incrementE" + i).style.display != "none") {En = i}}
  let E = getIncrementE(En);
  for (let i = (En - 1); i > -1; i--) {E = E.plus(getIncrementE(i))}
  E = E.plus(1);
  d("ipEquationE").textContent = e(E, 2, 2);
  d("ipEquationResult").textContent = e(p.times(m).pow(E));
  if (user.achievements.includes("ach2-1")) {d("ipEquationClickResult").textContent = e(p.times(m).pow(E).times(100))}
}
function updateCoefficientP() {
  let arr = dc("coefficientP");
  for (let i = 0; i < arr.length; i++) {arr[i].textContent = e(getSacrificeIPP())}
}
function updateCoefficientM() {
  let arr = dc("coefficientM");
  for (let i = 0; i < arr.length; i++) {arr[i].textContent = e(getSacrificeIPM())}
}
function updateCoefficientE() {
  let arr = dc("coefficientE");
  for (let i = 0; i < arr.length; i++) {arr[i].textContent = e(getSacrificeIPE())}
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
function updateIncrementE(n) {
  if (d("incrementE" + n).style.display != "none") {
    d("incrementE" + n + "x").textContent = e(getIncrementE(n), 2, 2);
    d("incrementE" + n + "Cost").textContent = e(getIncrementECost(n));
    if (user.ip.x.lt(getIncrementECost(n))) {rpc("canBuy", "cantBuy", "incrementE" + n + "b")}
    else {rpc("cantBuy", "canBuy", "incrementE" + n + "b")}
  }
}
