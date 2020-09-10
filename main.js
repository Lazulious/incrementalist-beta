function setUser() {
  return {
    ip: {x: nd(1), sac: nd(1)},
    increment: {p: [0, 0, 0, 0, 0], m: [0, 0, 0, 0, 0], e: [0, 0, 0, 0, 0]},
    auto: {ip: 0, incrementP: 0},
    automate: {ip: false, incrementP: [false, false, false, false, false]},
    tab: "Increment",
  }
}
//Vars
var user = setUser();
const updateRate = 20;

//Unlock Data
function unlocking() {unlockip(); unlockAutomation()}
const goalsIP = [nd(1000), nd(2500), nd(10000), nd(50000), nd(250000)];
const unlocksIP = ["Variable P<sub>1</sub>", "Automate IP", "Variable P<sub>2</sub>", "Variable P<sub>3</sub>", "Automate P Gain"];
function unlockip() {
  let sac = user.ip.sac;
  if (sac.gte(1000)) {sc("ipIncrementP1Unlocks")} else {hc("ipIncrementP1Unlocks")}
  if (sac.gte(2500)) {st("tabAutomationb"); st("tabIncrementb"); s("autoIP")} else {h("tabAutomationb"); h("tabIncrementb"); h("autoIP")}
  if (sac.gte(10000)) {sc("ipIncrementP2Unlocks")} else {hc("ipIncrementP2Unlocks")}
  if (sac.gte(50000)) {sc("ipIncrementP3Unlocks")} else {hc("ipIncrementP3Unlocks")}
  if (sac.gte(250000)) {s("autoP")} else {h("autoP")}
}
function unlockAutomation() {
  if (user.auto.ip >= 1) {s("autoIPState")} else {h("autoIPState")}
  if (user.auto.incrementP >= 1) {sc("autoIncrementPUnlocks")} else {hc("autoIncrementPUnlocks")}
}

//Update Data
function updateip() {d("ipx").textContent = e(user.ip.x)}

//Initialization
unlocking();
updater();
tab("Increment");

const tempHideA = ["autoIncrementP0State", "autoIncrementP1State", "autoIncrementP2State", "autoIncrementP3State", "autoIncrementP4State"];
for (let i = 0; i < tempHideA.length; i++) {h(tempHideA[i])}
const tempHideB = ["ipEquationMUnlocks", "ipEquationEUnlocks", "ipIncrementP4Unlocks", "coefficient"];
for (let i = 0; i < tempHideB.length; i++) {hc(tempHideB[i])}
