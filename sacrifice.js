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
function getSacrificeIPP() {return nd(user.sacrifice.ip + 1).pow(1.25).floor()}
function getSacrificeIPM() {return nd(100).times(nd((Math.max(2, user.sacrifice.ip) - 2) / 30 + 1).log10()).plus(1).floor()}
function getSacrificeIPE() {return nd(1)}
function getSacrificeIPCost() {return nd(1e7).times(nd(1e5).times(user.sacrifice.ip + 1).pow(user.sacrifice.ip)).round()}

//Update Date
function updateSacrificeIP() {
  if (user.ip.sac.lt(getSacrificeIPCost())) {rpc("canBuy", "cantBuy", "sacrificeIP")}
  else {rpc("cantBuy", "canBuy", "sacrificeIP")}
  d("sacrificeIPP").textContent = e(getSacrificeIPP());
  d("sacrificeIPM").textContent = e(getSacrificeIPM());
  d("sacrificeIPE").textContent = e(getSacrificeIPE());
  if (user.sacrifice.ip == 0) {d("sacrificeIPUnlock").textContent = "Variable M, P Multiplier"}
  else if (user.sacrifice.ip == 2) {d("sacrificeIPUnlock").textContent = "M Multiplier"}
  else {d("sacrificeIPUnlock").textContent = "Nothing"}
}
function updateSacrificeIPCost() {
  if (user.ip.sac.lt(getSacrificeIPCost())) {d("sacrificeIPCost").textContent = e(getSacrificeIPCost().minus(user.ip.sac))}
  else {d("sacrificeIPCost").textContent = 0}
}
