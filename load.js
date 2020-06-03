function brokenCheck() {setTimeout(() => {if (d("loading").style.display != "none") {s("debug"); s("loadingmsg"); return true} else {h("debug"); h("loadingmsg"); return false}}, 1000)}
function saving() {setInterval(() => {if (focused) {user.time = Date.now(); save(); clickrate = 0/*; obj = user*/}}, 1000)}
function save() {localStorage.setItem("user", JSON.stringify(user)); brokenUser = user}
function load() {
  let data = JSON.parse(localStorage.getItem("user"));
  brokenUser = data;
  if (data != null) {loadData(data)}
}
function ndify(obj) {
  for (key in obj.ip) {user.ip[key] = nd(obj.ip[key])}
  for (key in obj.pp) {user.pp[key] = nd(obj.pp[key])}
  for (key in obj.ap) {user.ap[key] = nd(obj.ap[key])}
  for (key in obj.tp) {user.tp[key] = nd(obj.tp[key])}
  for (key in obj.dp) {user.dp[key] = nd(obj.dp[key])}
  for (key in obj.gp) {user.gp[key] = nd(obj.gp[key])}
  user.sacrifice.ip.x = nd(user.sacrifice.ip.x);
  user.sacrifice.pp.x = nd(user.sacrifice.pp.x);
  user.sacrifice.ap.x = nd(user.sacrifice.ap.x);
  user.sacrifice.tp.x = nd(user.sacrifice.tp.x);
  user.sacrifice.dp.x = nd(user.sacrifice.dp.x);
  user.sacrifice.gp.x = nd(user.sacrifice.gp.x);
}
function loadsame(obj1, obj2, array) {for (let i = 0; i < array.length; i++) {obj1[array[i]] = obj2[array[i]]}}
function loadData(d) {
  let data = d;
  user = data;
  if (user.version == "0.0.0") {
    console.log("Loaded version " + user.version);
    user.confirm = {}
    user.version = "0.1.0";
  }
  if (user.version == "0.1.0") {
    console.log("Loaded version " + user.version);
    user.confirm = data.confirm;
  }
  ndify(user);
  user.time = Date.now();
  tab(user.tab);
  loadOffline();
  loadAutomate();
}
function loadOffline() {
  let timeOffline = Math.abs(user.time - Date.now());
  if (user.automate.inc.x) {
    user.ip.x = user.ip.x.plus(timeOffline / 1000 * getincxx());
    user.ip.sac = user.ip.sac.plus(timeOffline / 1000 * getincxx());
    user.ip.pp = user.ip.pp.plus(timeOffline / 1000 * getincxx());
    user.ip.total = user.ip.total.plus(timeOffline / 1000 * getincxx());
  }
  updates();
  unlocking();
  user.time = Date.now();
  save();
  console.log("Offline time: " + time(nd(timeOffline)));
}
function loadAutomate() {
  let pme = ["p", "m", "e"];
  for (let i = 0; i < 3; i++) {
    if (user.automate.scale.inc[pme[i]]) {autoInterval.scale.inc[pme[i]]()}
    for (let j = 1; j <= 5; j++) {if (user.automate.inc[pme[i]][j]) {autoInterval.inc[pme[i]](j)}}
  }
  if (user.automate.inc.x) {autoInterval.inc.x()}
}
function updates() {
  for (let i = 0; i < settingids.length; i++) {updatesetting(settingids[i])}
  updateip();
  updateautomation();
  updateautomaterate();
  updateincx();
  updateinc();
  updateautomate();
  updatescale();
  updatesac();
  updateversion();
}
const tempHide = ["pp", "space1", "ap", "space2", "tp", "space3", "dp", "space4", "gp", "ince5", "btabpp", "btabap", "btabtp", "btabdp", "btabgp", "automationince", "btabach"];
for (let i = 0; i < tempHide.length; i++) {h(tempHide[i])}
