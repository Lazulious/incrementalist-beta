//Data
var achievement = {}
achievement.titles = {}
/*achievement.hasReward = {}*/
for (let i = 1; i <= 2; i++) {
  for (let k = 1; k <= 6; k++) {
    let id = "ach" + i + "-" + k;
    achievement.titles[id] = d(id + "Title").textContent;
    /*achievement.hasReward[id] = d(id).textContent.includes("Reward");*/
  }
}

//Check Data
setInterval(() => {
  if (!user.achievements.includes("ach1-1") && user.increment.p[0] >= 1) {completeAchievement("ach1-1")}
  let automating = false;
  for (let i = 0; i <= 4; i++) {if (user.automate.incrementP[i] || user.automate.incrementM[i]) {automating = true}}
  if (!user.achievements.includes("ach1-2") && (user.automate.ip || automating)) {completeAchievement("ach1-2")}
  if (!user.achievements.includes("ach1-3") && user.sacrifice.ip >= 1) {completeAchievement("ach1-3")}
  if (!user.achievements.includes("ach1-4") && user.increment.m[0] >= 1) {completeAchievement("ach1-4")}
  if (!user.achievements.includes("ach1-5") && user.sacrifice.ip >= 2) {completeAchievement("ach1-5")}
  if (!user.achievements.includes("ach1-6") && user.sacrifice.ip >= 3) {completeAchievement("ach1-6")}
  if (!user.achievements.includes("ach2-1") && user.increment.ip >= 2500) {completeAchievement("ach2-1"); unlockAchievement()}
  if (!user.achievements.includes("ach2-2") && user.increment.p[0] >= 1000 && user.increment.p[1] >= 500 && (user.increment.p[0] > (user.increment.p[1] * 2))) {completeAchievement("ach2-2")}
  if (!user.achievements.includes("ach2-3") && user.increment.e[0] >= 1) {completeAchievement("ach2-3")}
  /*if (!user.achievements.includes("ach2-4")) {completeAchievement("ach2-4")}
  if (!user.achievements.includes("ach2-5")) {completeAchievement("ach2-5")}
  if (!user.achievements.includes("ach2-6")) {completeAchievement("ach2-6")}*/
}, 1000);

//Functions
function completeAchievement(id) {
  user.achievements.push(id);
  rpc("achIncomplete", "achComplete", id);
  alertify.message(achievement.titles[id]);
}
function completeAchievements() {for (let i = 0; i < user.achievements.length; i++) {rpc("achIncomplete", "achComplete", user.achievements[i])}}
function decompleteAchievement(id) {
  if (user.achievements.includes(id)) {
    user.achievements.splice(user.achievements.indexOf(id), 1);
    rpc("achComplete", "achIncomplete", id);
  }
}
function decompleteAchievements() {for (let i = 0; i < user.achievements.length; i++) {rpc("achComplete", "achIncomplete", user.achievements[i])}}
function updateAchievement() {
  d("ach2-1Req").textContent = e(2500);
  d("ach2-1Reward").textContent = e(100);
  d("ach2-2Req").textContent = e(1000);
  d("ach2-2Reward").textContent = e(5);
}
function unlockAchievement() {
  let ach = user.achievements;
  if (ach.includes("ach2-1")) {sc("ach2-1Unlocks")} else {hc("ach2-1Unlocks")}
}