//Refresh
var updating = false;
function updater() {
  updating = true;
  setTimeout(() => {
    updateTab(user.tab);
    /*if (user.tab == "Automation") {
      updateAutoIP();
      updateAutoIncrementP();
      updateAutoIncrementM();
    }
    if (user.tab == "Sacrifice") {
      updateSacrificeIP();
      updateSacrificeIPCost();
    }
    if (user.tab == "Scaling") {
      updateScalingP();
    }
    if (user.tab == "Increment") {
      for (let i = 0; i < 5; i++) {
        updateIncrementP(i);
        updateIncrementM(i);
      }
      updateCoefficientP();
      updateCoefficientM();
      updateEquationIP();
    }*/
    updateip();
    updatepbip();
    updater();
  }, (1000 / updateRate));
}
function fixnd() {
  user.ip.x = nd(user.ip.x);
  user.ip.sac = nd(user.ip.sac);
  user.ip.total = nd(user.ip.total);
  user.ip.highest = nd(user.ip.highest);
}

//Save Data
function save() {localStorage.setItem("user", JSON.stringify(user)); alertify.success("Game Saved")}
setInterval(() => {save()}, 60000);

//Load Data
function load() {
  let data = JSON.parse(localStorage.getItem("user"));
  if (data != null) {loadData(data)}
  else {unlocking(); updater()}
}
function loadData(data) {
  user = data;
  if (user.version == "0.2.0-beta-v4") {
    console.log("Loaded Version " + user.version);
  }
  fixnd();
  tab(user.tab);
  completeAchievements();
  loadOffline();
  loadAutomation();
}
function loadOffline() {
  if (!updating) {updater()}
  unlocking();
  save();
}
function loadAutomation() {
  if (user.automate.ip) {runAutomationIP()}
  for (let i = 0; i < 6; i++) {
    if (user.automate.incrementP[i]) {runAutomationIncrementP(i)}
    if (user.automate.incrementM[i]) {runAutomationIncrementM(i)}
  }
}

//Reset Data
function confirmResetAll() {
  if (user.confirmation.reset) {
    alertify.confirm("Are you sure you want to reset? You will lose all of your previous progress!", () => {alertify.warning("Game Reset")});
  }
  else {resetAll()}
}
function resetAll() {
  decompleteAchievements();
  user = setUser();
  save();
  console.log("Game Reset");
}
function resetSacrificeIP() {
  if (user.automate.ip) {automateIP()}
  for (let i = 0; i <= 4; i++) {
    if (user.automate.incrementP[i]) {automateIncrementP(i)}
    if (user.automate.incrementM[i]) {automateIncrementM(i)}
  }
  user.auto.ip = 0;
  user.auto.incrementP = 0;
  user.auto.incrementM = 0;
  for (let i = 0; i <= 4; i++) {
    user.increment.p[i] = 0;
    user.increment.m[i] = 0;
  }
  user.ip.x = nd(1);
  user.ip.sac = nd(1);
}

//Other
function progress() {
  /*let x = nd(1e38).minus(1);
  user.ip.x = user.ip.x.plus(x);
  user.ip.sac = user.ip.sac.plus(x);
  user.sacrifice.ip += 6;
  for (let i = 1; i <= 6; i++) {completeAchievement("ach1-" + i)}
  for (let i = 1; i <= 3; i++) {completeAchievement("ach2-" + i)}
  user.increment.ip += 1000;*/
}
