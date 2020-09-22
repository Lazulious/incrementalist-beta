//Buttons
function sacrificeIP() {
  if (user.ip.sac.gte(getSacrificeIPCost())) {
    resetSacrificeIP();
    user.sacrifice.ip++;
    unlockIP();
    unlockAutomation();
    unlockSacrifice();
  }
}
//Get Data
function getSacrificeIPP() {return nd(100).times(nd(user.sacrifice.ip / 25 + 1).log10()).plus(1).floor()}
function getSacrificeIPM() {return nd(100).times(nd((Math.max(2, user.sacrifice.ip) - 2) / 30 + 1).log10()).plus(1).floor()}
function getSacrificeIPE() {return nd((Math.max(6, user.sacrifice.ip) - 6) / 4.2 + 1).log10().plus(1)}
function getSacrificeIPCost() {
  if (user.sacrifice.ip >= 10) {return nd(1e25).pow(nd(1.25).pow(user.sacrifice.ip))}
  else if (user.sacrifice.ip >= 7) {return nd(1e7).times(nd(1e5).times(user.sacrifice.ip + 2).pow(user.sacrifice.ip + 1)).round()}
  else {return nd(1e7).times(nd(1e5).times(user.sacrifice.ip + 1).pow(user.sacrifice.ip)).round()}
}

//Update Date
function updateSacrificeIP() {
  if (user.ip.sac.lt(getSacrificeIPCost())) {rpc("canBuy", "cantBuy", "sacrificeIP")}
  else {rpc("cantBuy", "canBuy", "sacrificeIP")}
  d("sacrificeIPP").textContent = e(getSacrificeIPP());
  d("sacrificeIPM").textContent = e(getSacrificeIPM());
  d("sacrificeIPE").textContent = e(getSacrificeIPE(), 2, 2);
  if (user.sacrifice.ip == 0) {d("sacrificeIPUnlock").textContent = "Variable M, P Multiplier"}
  else if (user.sacrifice.ip == 2) {d("sacrificeIPUnlock").textContent = "M Multiplier"}
  else if (user.sacrifice.ip == 4) {d("sacrificeIPUnlock").textContent = "Variable E"}
  else if (user.sacrifice.ip == 6) {d("sacrificeIPUnlock").textContent = "E Multiplier"}
  else {d("sacrificeIPUnlock").textContent = "Nothing"}
}
function updateSacrificeIPCost() {
  if (user.ip.sac.lt(getSacrificeIPCost())) {d("sacrificeIPCost").textContent = e(getSacrificeIPCost().minus(user.ip.sac))}
  else {d("sacrificeIPCost").textContent = 0}
}

//Unlock Data
function unlockSacrifice() {
  let ip = user.sacrifice.ip;
  if (ip >= 1) {s("sacrificeIPPUnlock"); sc("incrementM0Unlocks"); sc("coefficientP")} else {h("sacrificeIPPUnlock"); hc("incrementM0Unlocks"); hc("coefficientP")}
  if (ip >= 3) {s("sacrificeIPMUnlock"); sc("coefficientM")} else {h("sacrificeIPMUnlock"); hc("coefficientM")}
  if (ip >= 5) {sc("incrementE0Unlocks")} else {hc("incrementE0Unlocks")}
  if (ip >= 7) {s("sacrificeIPEUnlock"); sc("coefficientE")} else {h("sacrificeIPEUnlock"); hc("coefficientE")}
}
