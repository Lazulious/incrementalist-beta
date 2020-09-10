//Buttons
function buyAutomationIP() {
  if (user.ip.x.gte(getAutoIPCost())) {
    user.ip.x = user.ip.x.minus(getAutoIPCost());
    user.auto.ip++;
    if (user.automate.ip) {automateIP(); automateIP()}
    unlockAutomation();
  }
}
function automateIP() {
  if (user.auto.ip >= 1) {
    user.automate.ip = !user.automate.ip;
    automateIPLoop();
    updateAutomateIP();
  }
}
function buyAutomationIncrementP() {
  if (user.ip.x.gte(getAutoIncrementPCost())) {
    user.ip.x = user.ip.x.minus(getAutoIncrementPCost());
    user.auto.incrementP++;
    for (let i = 0; i <= 4; i++) {if (user.automate.incrementP[i]) {automateIncrementP(i); automateIncrementP(i)}}
    unlockAutomation();
  }
}
function automateIncrementP(n) {
  if (user.auto.incrementP >= 1) {
    user.automate.incrementP[n] = !user.automate.incrementP[n];
    automateIncrementPLoop(n);
    updateAutomateIncrementP(n);
  }
}

//Automation Functions
var automatingIP = false;
function automateIPLoop() {
  if (!automatingIP) {automatingIP = setInterval(() => {if (user.automate.ip) {increment(getAutomateIPBulk())}}, (nd(1000).divide(getAutomateIPRate()).toNumber()))}
  else {clearInterval(automatingIP); automatingIP = false}
}
var automatingIncrementP = [false, false, false, false, false];
function automateIncrementPLoop(n) {
  if (!automatingIncrementP[n]) {
    automatingIncrementP[n] = setInterval(() => {
      if (user.automate.incrementP) {
        let ratio = getIncrementPRatio(n);
        let canBuy = Decimal.affordGeometricSeries(user.ip.x, 1, ratio, user.increment.p[n]);
        let bulk = getAutomateIncrementPBulk();
        if (canBuy.gte(bulk)) {
          user.ip.x = user.ip.x.minus(Decimal.sumGeometricSeries(bulk, 1, ratio, user.increment.p[n]));
          user.increment.p[n] += bulk.toNumber();
        }
        else {
          user.ip.x = user.ip.x.minus(Decimal.sumGeometricSeries(canBuy, 1, ratio, user.increment.p[n]));
          user.increment.p[n] += canBuy.toNumber();
        }
      }
    }, 100);
  }
  else {clearInterval(automatingIncrementP[n]); automatingIncrementP[n] = false}
}

//Get Data
function getAutoIPx() {return nd(user.auto.ip)}
function getAutoIPCost() {return nd(1000).times(nd(10).pow(user.auto.ip))}
function getAutomateIPRate() {if (user.auto.ip > 10) {return nd(10)} else {return nd(user.auto.ip)}}
function getAutomateIPBulk() {if (user.auto.ip > 10) {return nd(user.auto.ip).divide(10)} else {return nd(1)}}
function getAutoIncrementPx() {return nd(10).times(user.auto.incrementP)}
function getAutoIncrementPCost() {return nd(100000).times(nd(10).pow(user.auto.incrementP))}
function getAutomateIncrementPBulk() {if (user.auto.incrementP > 10) {return nd(10).times(user.auto.incrementP).divide(10)} else {return nd(1)}}

//Update Data
function updateAutoIP() {
  d("autoIPx").textContent = e(getAutoIPx());
  d("autoIPCost").textContent = e(getAutoIPCost());
  if (user.ip.x.lt(getAutoIPCost())) {rpc("canBuy", "cantBuy", "autoIPb")}
  else {rpc("cantBuy", "canBuy", "autoIPb")}
}
function updateAutomateIP() {
  if (user.automate.ip) {d("autoIPState").style.borderColor = "rgb(100, 200, 50)"}
  else {d("autoIPState").style.borderColor = "rgb(220, 20, 60)"}
}
function updateAutoIncrementP() {
  d("autoPx").textContent = e(getAutoIncrementPx());
  d("autoPCost").textContent = e(getAutoIncrementPCost());
  if (user.ip.x.lt(getAutoIncrementPCost())) {rpc("canBuy", "cantBuy", "autoPb")}
  else {rpc("cantBuy", "canBuy", "autoPb")}
}
function updateAutomateIncrementP(n) {
  if (user.automate.incrementP[n]) {d("autoIncrementP" + n + "State").style.borderColor = "rgb(100, 200, 50)"}
  else {d("autoIncrementP" + n + "State").style.borderColor = "rgb(220, 20, 60)"}
}
