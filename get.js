function getautomateincxrate() {return nd(1).times(gamespeed)}
function getautomaterate(type) {
  if (typeof type == "undefined") {type = "rate"}
  let rate = nd(100).times(gamespeed);
  if (type == "rate") {
    if (rate.gt(100)) {return nd(100)}
    else {return rate}
  }
  if (type == "bulk") {
    if (rate.gt(100)) {return nd(rate).divide(100).floor()}
    else {return nd(1)}
  }
}
function getautomationincp(num, type) {if (type == "rate") {return nd(1)}}
function getincxx() {
  let x = nd();
  for (let i = 1; i <= 5; i++) {x = x.plus(getincp(i, "x"))}
  for (let i = 1; i <= 5; i++) {x = x.times(getincm(i, "x"))}
  for (let i = 1; i <= 5; i++) {x = x.pow(getince(i, "x"))}
  x = x.times(user.sacrifice.ip.x);
  return x;
}
function getincp(num, type) {
  if (type == "x") {return nd(num).pow(num - 1).times(user.inc.p[num])}
  if (type == "cost") {return nd(10).times(nd(2).pow((nd(user.inc.p[num]).times(nd(user.inc.p[num]).plus(1).log10()).times(nd(1).minus(nd(0.1).times(nd(0.5).pow(num - 1))).pow(user.scale.inc.p)).divide(6 - num)))).floor()}
}
function getincm(num, type) {
  if (type == "x") {return nd(3).pow(num - 1).times(user.inc.m[num]).plus(1)}
  if (type == "cost") {return nd(1e6).times(nd(3).pow((nd(user.inc.m[num]).times(nd(user.inc.m[num]).plus(1).log10()).times(nd(1).minus(nd(0.1).times(nd(0.5).pow(num - 1))).pow(nd(user.scale.inc.m).divide(2))).divide(6 - num)))).floor()}
}
function getince(num, type) {
  if (type == "x") {return nd(nd(user.inc.e[num]).divide(nd(2).sqrt()).plus(1).log10()).plus(1)}
  if (type == "cost") {return nd(1e29).pow(nd(num + 1).pow(nd(user.inc.e[num]).times(nd(1).divide(getscaleince(num)))))}
}
function getscaleincp(num) {return nd(1).divide(nd(1).minus(nd(0.1).times(nd(0.5).pow(num - 1))).pow(user.scale.inc.p))}
function getscaleincm(num) {return nd(1).divide(nd(1).minus(nd(0.1).times(nd(0.5).pow(num - 1))).pow(nd(user.scale.inc.m).divide(2)))}
function getscaleince(num) {return nd(1).divide(nd(1).minus(nd(0.0141).times(nd(0.5).pow(num - 1))).pow(nd(user.scale.inc.e).divide(4)))}
function getscaleincpcost() {return nd(1.6).pow(user.scale.inc.p).floor()}
function getscaleincmcost() {return nd(2.1).pow(user.scale.inc.m).floor()}
function getscaleincecost() {
  if (user.scale.inc.e >= 225) {return nd(13.8).pow(user.scale.inc.e).floor()}
  else if (user.scale.inc.e >= 175) {return nd(7.4).pow(user.scale.inc.e).floor()}
  else if (user.scale.inc.e >= 125) {return nd(4.2).pow(user.scale.inc.e).floor()}
  else {return nd(2.6).pow(user.scale.inc.e).floor()}
}
function getsacipxnext() {
  if (user.sacrifice.ip.x.gte(2.5e6)) {return user.sacrifice.ip.x.plus(nd(nd(user.ip.sac.log10()).times(10).log10()).pow(nd(user.ip.sac.log10()).divide(1.5).sqrt()).times(user.sacrifice.ip.x.sqrt()))}
  else {return user.sacrifice.ip.x.plus(nd(nd(user.ip.sac.log10()).plus(10).log10()).pow(nd(user.ip.sac.log10()).divide(1.5).sqrt()).times(user.sacrifice.ip.x.sqrt()))}
}
function getsacipcost() {
  if (user.sacrifice.ip.count >= 75) {return nd(1e46).times(nd(2).pow(user.sacrifice.ip.count))}
  else {return nd(1e23).times(nd(2).pow(user.sacrifice.ip.count))}
}
