//Refresh
var updating = false;
function updater() {
  updating = true;
  setTimeout(() => {
    updateTab(user.tab);
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
    decompleteAchievements();
    user = setUser();
    user.version = "0.2.0-beta-v4.1";
  }
  if (user.version == "0.2.0-beta-v4.1") {
    console.log("Loaded Version " + user.version);
    user.timeStart = Date.now();
    if (user.achievements.includes("ach2-1")) {user.achievements.splice(user.achievements.indexOf("ach2-1"), 1, "ach1-6")}
    if (user.achievements.includes("ach2-2")) {user.achievements.splice(user.achievements.indexOf("ach2-2"), 1, "ach2-1")}
    if (user.achievements.includes("ach2-3")) {user.achievements.splice(user.achievements.indexOf("ach2-3"), 1, "ach2-2")}
    user.version = "0.2.0-beta-v5";
  }
  if (user.version == "0.2.0-beta-v5") {
    console.log("Loaded Version " + user.version);
  }
  d("version").textContent = user.version;
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
  if (user.automate.ip) {runAutomationIP(); updateAutomateIP()}
  for (let i = 0; i < 6; i++) {
    if (user.automate.incrementP[i]) {runAutomationIncrementP(i); updateAutomateIncrementP(i)}
    if (user.automate.incrementM[i]) {runAutomationIncrementM(i); updateAutomateIncrementM(i)}
  }
}

//Reset Data
function confirmResetAll() {
  if (user.confirmation.reset) {
    alertify.confirm("Are you sure you want to reset? You will lose all of your previous progress!", () => {alertify.warning("Game Reset")}, resetAll());
  }
  else {resetAll()}
}
function resetAll() {
  decompleteAchievements();
  user = setUser();
  user.timeStart = Date.now();
  unlocking();
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
    user.increment.e[i] = 0;
  }
  user.scaling.p = 0;
  user.scaling.m = 0;
  user.ip.x = nd(1);
  user.ip.sac = nd(1);
}
