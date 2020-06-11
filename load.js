//Intervals
function saving() {setInterval(() => {if (focused) {user.time = Date.now(); save(); clickrate = 0/*; obj = user*/}}, 1000)}
function save() {localStorage.setItem("user", JSON.stringify(user)); brokenUser = user}

//Loading
function load() {
  let data = JSON.parse(localStorage.getItem("user"));
  brokenUser = data;
  if (data != null && data.version != null) {loadData(data)}
  else {updates(); unlocking()}
}
function ndify(obj) {
  user.ip.x = nd(user.ip.x);
  user.ip.sac = nd(user.ip.sac);
  user.ip.pp = nd(user.ip.pp);
  user.ip.total = nd(user.ip.total);
  user.sacrifice.ip = nd(user.sacrifice.ip);
  user.pp.x = nd(user.pp.x);
  user.pp.sac = nd(user.pp.sac);
  user.pp.ap = nd(user.pp.ap);
  user.pp.total = nd(user.pp.total);
  user.sacrifice.pp = nd(user.sacrifice.pp);
}
function loadsame(obj1, obj2, array) {for (let i = 0; i < array.length; i++) {obj1[array[i]] = obj2[array[i]]}}
function loadData(data) {
  user = data;
  if (user.version == "0.0.0") {
    console.log("Loaded version " + user.version);
    user.active.displaypause = false;
    user.confirm = setUser().confirm;
    user.version = "0.1.0";
  }
  if (user.version == "0.1.0") {
    console.log("Loaded version " + user.version);
    console.log(typeof user.sacrifice.ip.x);
    if (typeof user.sacrifice.ip.x == "undefined") {user.sacrifice.ip = user.sacrifice.ip} else {user.sacrifice.ip = user.sacrifice.ip.x}
    if (typeof user.sacrifice.pp.x == "undefined") {user.sacrifice.pp = user.sacrifice.pp} else {user.sacrifice.pp = user.sacrifice.pp.x}
    if (typeof user.sacrifice.ap.x == "undefined") {user.sacrifice.ap = user.sacrifice.ap} else {user.sacrifice.ap = user.sacrifice.ap.x}
    if (typeof user.sacrifice.tp.x == "undefined") {user.sacrifice.tp = user.sacrifice.tp} else {user.sacrifice.tp = user.sacrifice.tp.x}
    if (typeof user.sacrifice.dp.x == "undefined") {user.sacrifice.dp = user.sacrifice.dp} else {user.sacrifice.dp = user.sacrifice.dp.x}
    if (typeof user.sacrifice.gp.x == "undefined") {user.sacrifice.gp = user.sacrifice.gp} else {user.sacrifice.gp = user.sacrifice.gp.x}
    if (nd(user.ip.sac).gte(1e30) && nd(user.sacrifice.ip).gte(10000)) {sacrifice('ip')}
    user.version = "0.1.1";
  }
  if (user.version == "0.1.1") {
    console.log("Loaded version " + user.version);
    user.pp.extra = 0;
    user.version = "0.2.0";
  }
  if (user.version == "0.2.0") {
    console.log("Loaded version " + user.version);
  }
  ndify(user);
  tab(user.tab);
  loadOffline();
  loadAutomate();
}
let skipped = false;
function loadOffline(ms) {
  s("offline");
  let timeOffline = 0;
  if (typeof ms == "undefined") {timeOffline = Math.abs(user.time - Date.now())}
  else {timeOffline = ms}
  d("timeOffline").textContent = time(nd(timeOffline));
  let maxTicks = 1e6;
  let tickSpeed = 20; //Milliseconds per Tick
  if (false) {} //Are you buying max?
  else {
    let ticks = timeOffline / tickSpeed;
    if (ticks > maxTicks) {ticks = maxTicks; tickSpeed = timeOffline / ticks}
    let checkTicks = 10;
    let rate = getautomaterate().times(tickSpeed).times(checkTicks).divide(1000);
    let ticksRan = 0;
    let runTick = () => {
      setTimeout (() => {
        if (skipped) {ticksRan = ticks - checkTicks}
        ticksRan += checkTicks;
        if (user.automate.inc.x) {gainip(tickSpeed * checkTicks)}
        for (let i = 1; i <= 5; i++) {
          if (user.automate.inc.p[i] && user.ip.x.gte(getincp(i, "cost", rate).times(100))) {user.inc.p[i] += Number(e(rate))}
          if (user.automate.inc.m[i] && user.ip.x.gte(getincm(i, "cost", rate).times(100))) {user.inc.m[i] += Number(e(rate))}
          if (user.automate.inc.e[i] && user.ip.x.gte(getince(i, "cost", rate).times(100))) {user.inc.e[i] += Number(e(rate))}
        }
        if (ticksRan < ticks) {
          d("pboffline").style.width = 100 * ticksRan / ticks + "%";
          d("ticksOffline").textContent = e(nd(ticksRan)) + "/" + e(nd(ticks));
          runTick();
        }
        else {
          d("pboffline").style.width = "100%";
          d("ticksOffline").textContent = e(nd(ticks)) + "/" + e(nd(ticks));
          reveal();
        }
      }, 1);
    }
    if (ticks >= checkTicks) {runTick()}
    else {reveal()}
  }
  updates();
  unlocking();
  user.time = Date.now();
  save();
  console.log("Offline time: " + time(nd(timeOffline)));
}
function skipOffline() {skipped = true}
function loadAutomate() {
  let pme = ["p", "m", "e"];
  for (let i = 0; i < 3; i++) {
    if (user.automate.scale.inc[pme[i]]) {autoInterval.scale.inc[pme[i]]()}
    for (let j = 1; j <= 5; j++) {if (user.automate.inc[pme[i]][j]) {autoInterval.inc[pme[i]](j)}}
  }
  if (user.automate.inc.x) {autoInterval.inc.x()}
}

//Resets
function resetSacrifice(layer) {
  if (layer == "ip") {
    user.automation.inc = {x: false, p: false, m: false, e: false}
    user.automate.scale.inc = {p: false, m: false, e: false}
    user.automate.inc = {p: ["null", false, false, false, false, false], m: ["null", false, false, false, false, false], e: ["null", false, false, false, false, false]}
    user.inc = {x: 0, p: ["null", 0, 0, 0, 0, 0], m: ["null", 0, 0, 0, 0, 0], e: ["null", 0, 0, 0, 0, 0]}
    user.scale.inc = {p: 0, m: 0, e: 0}
    return;
  }
}
function resetPrestige() {resetSacrifice("ip"); user.automation.scale.inc = {p: false, m: false, e: false}; user.sacrifice.ip = nd(1)}

//Other
function updates() {
  for (let i = 0; i < settingids.length; i++) {updatesetting(settingids[i])}
  updateip();
  updateautomation();
  updateautomaterate();
  updateautomate();
  updatescale();
  updatesac();
  updateincx();
  updateinc();
  updatepp();
  updateppgain();
  updateversion();
}
const tempHide = ["ap", "space2", "tp", "space3", "dp", "space4", "gp", "btabap", "btabtp", "btabdp", "btabgp", "btabach"];
for (let i = 0; i < tempHide.length; i++) {h(tempHide[i])}
