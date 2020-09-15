function setUser() {
  return {
    ip: {x: nd(1), sac: nd(1)},
    increment: {p: [0, 0, 0, 0, 0], m: [0, 0, 0, 0, 0]},
    auto: {ip: 0, incrementP: 0, incrementM: 0},
    automate: {ip: false, incrementP: [false, false, false, false, false], incrementM: [false, false, false, false, false]},
    sacrifice: {ip: 0},
    scaling: {p: 0},
    tab: "Increment",
  }
}
//Vars
var user = setUser();
const updateRate = 20;

//Unlock Data
function unlocking() {unlockIP(); unlockAutomation(); unlockSacrifice()}
const goalsIP = [nd(1000), nd(2500), nd(10000), nd(50000), nd(250000), nd(1e6), nd(5e9), nd(1e13), nd(5e15), nd(1e21), nd(2.5e21), nd(5e21), nd(1e308)];
const unlocksIP = ["Variable P<sub>1</sub>", "Automate IP", "Variable P<sub>2</sub>", "Variable P<sub>3</sub>", "Automate P", "Variable P<sub>4</sub>", "Variable M<sub>1</sub>", "Variable M<sub>2</sub>", "Variable M<sub>3</sub>", "Automate M", "Scaling P", "Variable M<sub>4</sub>", "End Game"];
function unlockIP() {
  let sac = user.ip.sac;
  let ip = user.sacrifice.ip;
  if (sac.gte(1000)) {sc("incrementP1Unlocks")} else {hc("incrementP1Unlocks")}
  if (sac.gte(2500) || ip >= 1) {st("tabAutomationb")} else {h("tabAutomationb")}
  if (sac.gte(2500)) {s("autoIP")} else {h("autoIP")}
  if (sac.gte(10000)) {sc("incrementP2Unlocks")} else {hc("incrementP2Unlocks")}
  if (sac.gte(50000)) {sc("incrementP3Unlocks")} else {hc("incrementP3Unlocks")}
  if (sac.gte(250000)) {s("autoP")} else {h("autoP")}
  if (sac.gte(1e6)) {sc("incrementP4Unlocks")} else {hc("incrementP4Unlocks")}
  if (sac.gte(1e7) || ip >= 1) {st("tabSacrificeb")} else {h("tabSacrificeb")}
  if (sac.gte(5e9) && ip >= 1) {sc("incrementM1Unlocks")} else {hc("incrementM1Unlocks")}
  if (sac.gte(1e13) && ip >= 1) {sc("incrementM2Unlocks")} else {hc("incrementM2Unlocks")}
  if (sac.gte(5e15) && ip >= 1) {sc("incrementM3Unlocks")} else {hc("incrementM3Unlocks")}
  if (sac.gte(1e21) && ip >= 1) {s("autoM")} else {h("autoM")}
  if (sac.gte(2.5e21) || ip >= 5) {st("tabScalingb")} else {h("tabScalingb")}
  if (sac.gte(2.5e21)) {s("scalingP")} else {h("scalingP")}
  if (sac.gte(5e21) && ip >= 1) {sc("incrementM4Unlocks")} else {hc("incrementM4Unlocks")}
}
function unlockAutomation() {
  if (user.auto.ip >= 1) {s("autoIPState")} else {h("autoIPState")}
  if (user.auto.incrementP >= 1) {sc("autoIncrementPUnlocks")} else {hc("autoIncrementPUnlocks")}
  if (user.auto.incrementM >= 1) {sc("autoIncrementMUnlocks")} else {hc("autoIncrementMUnlocks")}
}
function unlockSacrifice() {
  let ip = user.sacrifice.ip;
  if (ip >= 1) {s("sacrificeIPPUnlock"); sc("incrementM0Unlocks"); sc("coefficientP")} else {h("sacrificeIPPUnlock"); hc("incrementM0Unlocks"); hc("coefficientP")}
  if (ip >= 3) {s("sacrificeIPMUnlock"); sc("coefficientM")} else {h("sacrificeIPMUnlock"); hc("coefficientM")}
}

//Update Data
function updateip() {
  d("ipx").textContent = e(user.ip.x);
  if (user.automate.ip) {d("ipSecx").textContent = e(getIncrementx(getAutoIPx()))}
  else {d("ipSecx").textContent = 0}
}

//Event Listeners
function resize() {
  if (window.innerWidth < 825) {
    d("ipText").textContent = " IP";
    d("ipSecText").textContent = "";
    if (window.innerWidth < 550) {
      d("autoIPText").textContent = "IP ";
      d("autoPText").textContent = "P ";
      d("autoMText").textContent = "M ";
    }
    else {
      d("autoIPText").textContent = "Automate IP Gain ";
      d("autoPText").textContent = "Automate P Variables ";
      d("autoMText").textContent = "Automate M Variables ";
    }
  }
  else {
    d("ipText").textContent = " Increment Points";
    d("ipSecText").textContent = "You are gaining ";
  }
}

//Initialization
progress();
unlocking();
updater();
resize();
st("tabOptionsb");
st("tabIncrementb");
tab("Increment");

const tempHideA = [];
for (let i = 0; i < tempHideA.length; i++) {h(tempHideA[i])}
const tempHideB = ["ipEquationEUnlocks", "coefficient", "sacrificeIPEUnlocks", "autoIncrementMUnlocks"];
for (let i = 0; i < tempHideB.length; i++) {hc(tempHideB[i])}
