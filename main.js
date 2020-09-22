function setUser() {
  return {
    ip: {x: nd(1), sac: nd(1), total: nd(1), highest: nd(1)},
    increment: {ip: 0, p: [0, 0, 0, 0, 0], m: [0, 0, 0, 0, 0], e: [0, 0, 0, 0, 0]},
    auto: {ip: 0, incrementP: 0, incrementM: 0, incrementE: 0},
    automate: {ip: false, incrementP: [false, false, false, false, false], incrementM: [false, false, false, false, false], incrementE: [false, false, false, false, false]},
    sacrifice: {ip: 0},
    scaling: {p: 0, m: 0},
    notation: "Scientific",
    confirmation: {reset: true, sacrifice: true},
    achievements: [],
    tab: "Increment",
    timeStart: "now",
    version: "0.2.0-beta-v5",
  }
}
//Data
var user = setUser();
const updateRate = 20;

//Unlock Data
function unlocking() {unlockIP(); unlockAutomation(); unlockSacrifice(); unlockAchievement()}
const goalsIP = [nd(1000), nd(2500), nd(10000), nd(50000), nd(250000), nd(1e6), nd(5e9), nd(1e13), nd(5e15), nd(1e21), nd(2.5e21), nd(7.5e21), nd(3.3e33), nd(1e38), nd(1e44), nd(2.25e45), nd(5.8e58), nd(1e308)];
const unlocksIP = ["Variable P<sub>1</sub>", "Automate IP", "Variable P<sub>2</sub>", "Variable P<sub>3</sub>", "Automate P", "Variable P<sub>4</sub>", "Variable M<sub>1</sub>", "Variable M<sub>2</sub>", "Variable M<sub>3</sub>", "Automate M", "Scaling P", "Variable M<sub>4</sub>", "Variable E<sub>1</sub>", "Variable E<sub>2</sub>", "Scaling M", "Variable E<sub>3</sub>", "Variable E<sub>4</sub>", "End Game"];
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
  if (sac.gte(1e13) && ip >= 2) {sc("incrementM2Unlocks")} else {hc("incrementM2Unlocks")}
  if (sac.gte(5e15) && ip >= 2) {sc("incrementM3Unlocks")} else {hc("incrementM3Unlocks")}
  if (sac.gte(1e21) && ip >= 3) {s("autoM")} else {h("autoM")}
  if ((sac.gte(2.5e21) && ip >= 3) || ip >= 4) {st("tabScalingb")} else {h("tabScalingb")}
  if (sac.gte(2.5e21) && ip >= 3) {s("scalingP")} else {h("scalingP")}
  if (sac.gte(7.5e21) && ip >= 3) {sc("incrementM4Unlocks")} else {hc("incrementM4Unlocks")}
  if (sac.gte(3.3e33) && ip >= 5) {sc("incrementE1Unlocks")} else {hc("incrementE1Unlocks")}
  if (sac.gte(1e38) && ip >= 6) {sc("incrementE2Unlocks")} else {hc("incrementE2Unlocks")}
  if (sac.gte(1e44) && ip >= 7) {s("scalingM")} else {h("scalingM")}
  if (sac.gte(2.25e45) && ip >= 7) {sc("incrementE3Unlocks")} else {hc("incrementE3Unlocks")}
  if (sac.gte(5.8e58) && ip >= 8) {sc("incrementE4Unlocks")} else {hc("incrementE4Unlocks")}
}

//Update Data
function updateip() {
  d("ipx").textContent = e(user.ip.x);
  if (user.automate.ip) {d("ipSecx").textContent = e(getIncrementx(getAutoIPx()))}
  else {d("ipSecx").textContent = e(nd(0))}
}
function updateTab(str) {
  if (str == "Options") {
    
  }
  else if (str == "Achievements") {
    
  }
  else if (str == "Statistics") {
    updateStatistics();
  }
  else if (str == "Automation") {
    updateAutoIP();
    updateAutoIncrementP();
    updateAutoIncrementM();
  }
  else if (str == "Sacrifice") {
    updateSacrificeIP();
    updateSacrificeIPCost();
  }
  else if (str == "Scaling") {
    updateScalingP();
    updateScalingM();
  }
  else if (str == "Increment") {
    for (let i = 0; i < 5; i++) {
      updateIncrementP(i);
      updateIncrementM(i);
      updateIncrementE(i);
    }
    updateCoefficientP();
    updateCoefficientM();
    updateCoefficientE();
    updateEquationIP();
  }
}

//Event Listeners
function resize() {
  /*if (window.innerWidth < 825) {
    d("ipText").textContent = " IP";
    d("ipSecText").textContent = "";
  }
  else {
    d("ipText").textContent = " Increment Points";
    d("ipSecText").textContent = "You are gaining ";
  }
  if (window.innerWidth < 550) {
    d("autoIPText").textContent = "IP ";
    d("autoPText").textContent = "P ";
    d("autoMText").textContent = "M ";
    d("ipEquationText").innerHTML = "";
  }
  else {
    d("autoIPText").textContent = "Automate IP Gain ";
    d("autoPText").textContent = "Automate P Variables ";
    d("autoMText").textContent = "Automate M Variables ";
    d("tabAutomationText").textConetnt = "Automation";
    d("ipEquationText").innerHTML = "IP = IP+(P<span class=\"incrementM0Unlocks\">xM</span>)<sup class=\"text ipEquationEUnlocks\">E</sup> &rArr; ";
  }*/
}

//Initialization
/*setNotation("Mixed scientific");*/
load();
save();

updateAchievement();
updateConfirmations();
resize();
if (user.timeStart === "now") {user.timeStart = Date.now()}

//Dev Stuff
function progress() {
  /*let x = nd(1e86);
  user.ip.x = x;
  user.ip.sac = x;
  user.ip.total = x;
  user.sacrifice.ip = 10;*/
  /*for (let i = 1; i <= 6; i++) {completeAchievement("ach1-" + i)}
  for (let i = 1; i <= 3; i++) {completeAchievement("ach2-" + i)}*/
  /*user.increment.ip = 2500;*/
}
progress();
unlocking();

const tempHideA = [];
for (let i = 0; i < tempHideA.length; i++) {h(tempHideA[i])}
const tempHideB = ["autoIncrementEUnlocks"];
for (let i = 0; i < tempHideB.length; i++) {hc(tempHideB[i])}
