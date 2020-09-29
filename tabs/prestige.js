//Buttons
function prestige() {
  if (user.ip.sac.gte(1e100)) {
    let gain = getPPGain();
    user.pp.x = user.pp.x.plus(gain);
    user.pp.sac = user.pp.sac.plus(gain);
    user.pp.total = user.pp.total.plus(gain);
    resetPrestige();
    unlockAutomation();
    unlockSacrifice();
    unlockIP();
    unlockPP();
  }
}
function pt(row, column) {
  let id = "pt" + row + "-" + column;
  let cost = getPrestigeTreeCost(id);
  if (user.pp.x.gte(cost) && !user.pt[id]) {
    user.pp.x = user.pp.x.minus(cost);
    user.pt[id] = true;
    updatePrestigeTreeCost();
  }
}

//Data
const pts = {
  "pt1-1": {
    type: "rowIncrease",
    effect: ["pt1-2", "pt1-3"],
    baseCost: 1,
    scaleCost: 2,
  },
  "pt1-2": {
    type: "rowIncrease",
    effect: ["pt1-1", "pt1-3"],
    baseCost: 1,
    scaleCost: 2,
  },
  "pt1-3": {
    type: "rowIncrease",
    effect: ["pt1-1", "pt1-2"],
    baseCost: 1,
    scaleCost: 2,
  },
}

//Get Data
function getPPGain() {
  return user.ip.sac.plus(1).log10().divide(100).max(0).floor();
}
function getPrestigeNext() {
  return nd(1e100).pow(user.ip.sac.plus(1).log10().divide(100).max(0).plus(1).floor());
}
function getPrestigeTreex(id) {
  if (id == "pt1-1") {return user.pp.sac.plus(1).ln().plus(1)}
  if (id == "pt1-2") {return user.pp.sac.plus(1).log10()}
  if (id == "pt1-3") {return user.pp.sac.plus(1).sqrt().log10().plus(1)}
}
function getPrestigeTreeCost(id) {
  if (pts[id].type == "rowIncrease") {
    if (user.pt[id]) {return nd(0)}
    let effected = 0;
    for (let i = 0; i < pts[id].effect.length; i++) {if (user.pt[pts[id].effect[i]]) {effected++}}
    return nd(pts[id].baseCost).times(nd(pts[id].scaleCost).pow(effected));
  }
}

//Unlock Data
function unlockPP() {
  let sac = user.sacrifice.pp;
  let pp = user.pp.sac;
  if (pp.gte(1)) {s("ptr1")} else {h("ptr1")}
}

//Update Data
const goalsPP = [nd(1)];
const goalsPPSac = [0];
const unlocksPP = ["Prestige Tree"];
function updatepbpp() {
  let index = 0;
  for (let i = 0; i < goalsPP.length; i++) {if (user.pp.sac.gte(goalsPP[i]) && user.sacrifice.pp >= goalsIPSac[i]) {index = i + 1}}
  let g = goalsPP[index];
  let s = goalsPPSac[index];
  let u = unlocksPP[index];
  if (g == undefined) {g = goalsPP[index - 1]}
  if (s == undefined) {s = goalsPPSac[index - 1]}
  if (u == undefined) {u = "End Game"}
  let sacCost = getSacrificePPCost();
  if (g.gt(sacCost)) {
    g = sacCost;
    u = "Sacrifice";
  }
  d("pbppsac").textContent = e(user.pp.sac);
  d("pbppgoal").textContent = e(g);
  d("pbppunlock").innerHTML = u;
  d("pbpp").style.width = user.pp.sac.divide(g).times(100) + "%";
  if (user.pp.sac.divide(g) > 1) {d("pbpp").style.width = "100%"}
}
function updatePrestige() {
  d("ppGain").textContent = e(getPPGain());
  d("ppNext").textContent = e(getPrestigeNext().minus(user.ip.sac));
}
function updatePrestigeTree() {
  for (let i = 1; i <= 1; i++) {
    for (let k = 1; k <= 3; k++) {
      let id = "pt" + i + "-" + k;
      if (user.pp.x.gte(getPrestigeTreeCost(id)) && !user.pt[id]) {rpc("cantBuy", "canBuy", id)}
      else {rpc("canBuy", "cantBuy", id)}
    }
  }
}
function updatePrestigeTreex() {
  for (let i = 1; i <= 1; i++) {
    for (let k = 1; k <= 3; k++) {
      let id = "pt" + i + "-" + k;
      if (d(id) != null && d(id).style.display != null) {
        d(id + "x").textContent = e(getPrestigeTreex(id), 2, 2);
        /*d(id + "Cost").textContent = e(getPrestigeTreeCost(id));*/
      }
    }
  }
}
function updatePrestigeTreeCost() {
  for (let i = 1; i <= 1; i++) {
    for (let k = 1; k <= 3; k++) {
      let id = "pt" + i + "-" + k;
      if (d(id) != null && d(id).style.display != null) {
        d(id + "Cost").textContent = e(getPrestigeTreeCost(id));
      }
    }
  }
}
