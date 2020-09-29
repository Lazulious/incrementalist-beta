function setUser() {
  return {
    ip: {x: nd(1), sac: nd(1), total: nd(1), highest: nd(1)},
    increment: {ip: 0, p: [0, 0, 0, 0, 0], m: [0, 0, 0, 0, 0], e: [0, 0, 0, 0, 0]},
    auto: {ip: 0, incrementP: 0, incrementM: 0, incrementE: 0},
    automate: {ip: false, incrementP: [false, false, false, false, false], incrementM: [false, false, false, false, false], incrementE: [false, false, false, false, false]},
    sacrifice: {ip: 0, pp: 0},
    scaling: {p: 0, m: 0, e: 0},
    pp: {x: nd(0), sac: nd(0), total: nd(0), highest: nd(0)},
    pt: {"pt1-1": false, "pt1-2": false, "pt1-3": false},
    notation: "Scientific",
    confirmation: {reset: true, sacrifice: true},
    achievements: [],
    tab: "Increment",
    timeStart: "now",
    timeLastOnline: "now",
    version: "0.3.0-beta-v1.1",
  }
}

//Data
var user = setUser();
var brokenUser = setUser();
const updateRate = 20;
var infinite = ndn(1, 100);
const maxTicks = 100000;
const tickSpeed = 50;
const showInfinite = true;

//Unlock Data
function unlocking() {
  unlockAutomation();
  unlockSacrifice();
  unlockAchievement();
  unlockIP();
  unlockPP();
}

//Manipulate Data
function simulateTime(ms) {
  let seconds = ms / 1000;
  if (seconds > 100000) {seconds = 100000}
  secondsDone = 0;
  for (secondsDone = 0; secondsDone < seconds; secondsDone++) {
    passiveTick(1000 / tickSpeed);
    automationTick(10);
  }
  
  /*let ticks = ms / tickSpeed;
  if (ticks > maxTicks) {ticks = maxTicks}
  let ticksDone = 0;
  for (ticksDone = 0; ticksDone < ticks; ticksDone++) {
    passiveTick();
    if ((ticksDone / 2) == Math.floor(ticksDone / 2)) {automationTick()}
  }*/
}
function passiveTick(ticks) {
  if (typeof ticks == "undefined") {ticks = 1}
  if (user.automate.ip) {increment(getAutomateIPBulk().times(ticks))}
}

//Update Data
function updateip() {
  d("ipx").textContent = e(user.ip.x);
  if (user.automate.ip) {d("ipSecx").textContent = e(getIncrementx(getAutoIPx()))}
  else {d("ipSecx").textContent = e(nd(0))}
  updatepbip();
}
function updatepp() {
  d("ppx").textContent = e(user.pp.x);
  if (false) {}
  else {d("ppSecx").textContent = e(nd(0))}
  updatepbpp();
}
function updateTab(str) {
  if (str == "Options") {
    
  }
  else if (str == "Achievements") {
    updateAchievement("ach1-6");
  }
  else if (str == "Statistics") {
    updateStatistics();
  }
  else if (str == "Automation") {
    updateAutoIP();
    updateAutoIncrementP();
    updateAutoIncrementM();
    updateAutoIncrementE();
  }
  else if (str == "Sacrifice") {
    updateSacrificeIP();
  }
  else if (str == "Scaling") {
    updateScalingP();
    updateScalingM();
    updateScalingE();
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
  else if (str == "Prestige") {
    updatePrestige();
    updatePrestigeTree();
    updatePrestigeTreex();
  }
}

//Initialization
var setBrokenUser = true;
if (user.timeStart === "now") {user.timeStart = Date.now()}
load();
setBrokenUser = true;
updater();

initiateAutomation();

d("version").textContent = "Version " + user.version;

function progress() {
  resetAll();
  let ip = ndn(1, 100);
  user.ip.x = ip;
  user.ip.sac = ip;
  user.ip.total = ip;
  user.sacrifice.ip = 11;
  for (let i = 1; i <= 6; i++) {completeAchievement("ach1-" + i, false)}
  for (let i = 1; i <= 4; i++) {completeAchievement("ach2-" + i, false)}
  user.increment.ip = 5000;
  let pp = ndn(0, 0);
  user.pp.x = pp;
  user.pp.sac = pp;
  user.pp.total = pp;
}
progress();
unlocking();
tab("Prestige");

const tempHideIds = [];
for (let i = 0; i < tempHideIds.length; i++) {h(tempHideIds[i])}
const tempHideClasses = [];
for (let i = 0; i < tempHideClasses.length; i++) {hc(tempHideClasses[i])}
