function setUser() {
  return {
    ip: {x: nd(1), sac: nd(1)},
    increment: {p: [0, 0, 0, 0, 0], m: [0, 0, 0, 0, 0], e: [0, 0, 0, 0, 0]},
    tab: "Increment",
  }
}
//Vars
var user = setUser();
const updateRate = 10;

//Unlock Data
function unlocking() {unlockIP()}
function unlockIP() {
  let sac = user.ip.sac;
  if (sac.gte(1000)) {sc("ipIncrementP1Unlocks")} else {hc("ipIncrementP1Unlocks")}
}

//Update Data
function updateip() {
  d("ipx").textContent = user.ip.x;
}

//Initialization
function progress() {
  let x = nd(1000).minus(1);
  user.ip.x = user.ip.x.plus(x);
  user.ip.sac = user.ip.sac.plus(x);
}

unlocking();
updater();

const tempHideA = [];
for (let i = 0; i < tempHideA.length; i++) {h(tempHideA[i])}
const tempHideB = ["ipEquationMUnlocks", "ipEquationEUnlocks", "ipIncrementP2Unlocks", "ipIncrementP3Unlocks", "ipIncrementP4Unlocks", "coefficient"];
for (let i = 0; i < tempHideB.length; i++) {hc(tempHideB[i])}
