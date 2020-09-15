//Buttons
function buyAutomationIP() {
  if (user.ip.x.gte(getAutoIPCost())) {
    user.ip.x = user.ip.x.minus(getAutoIPCost());
    user.auto.ip++;
    if (user.automate.ip) {automateIP(); automateIP()}
    unlockAutomation();
  }
}
var automatingIP = false;
function automateIP() {
  user.automate.ip = !user.automate.ip;
  if (!automatingIP) {
    automatingIP = setInterval(() => {
      if (user.automate.ip) {
        increment(getAutomateIPBulk());
      }
    }, (nd(1000).divide(getAutomateIPRate()).toNumber()));
  }
  else {clearInterval(automatingIP); automatingIP = false}
  updateAutomateIP();
}
function buyAutomationIncrementP() {
  if (user.ip.x.gte(getAutoIncrementPCost())) {
    user.ip.x = user.ip.x.minus(getAutoIncrementPCost());
    user.auto.incrementP++;
    for (let i = 0; i <= 4; i++) {if (user.automate.incrementP[i]) {automateIncrementP(i); automateIncrementP(i)}}
    unlockAutomation();
  }
}
var automatingIncrementP = [false, false, false, false, false];
function automateIncrementP(n) {
  user.automate.incrementP[n] = !user.automate.incrementP[n];
  if (!automatingIncrementP[n]) {
    automatingIncrementP[n] = setInterval(() => {
      if (user.automate.incrementP[n]) {
        let ratio = getIncrementPRatio(n);
        let canBuy = Decimal.affordGeometricSeries(user.ip.x, 1, ratio, user.increment.p[n]);
        if (canBuy.gte(user.auto.incrementP)) {
          user.ip.x = user.ip.x.minus(Decimal.sumGeometricSeries(user.auto.incrementP, 1, ratio, user.increment.p[n]));
          user.increment.p[n] += user.auto.incrementP;
        }
        else {
          user.ip.x = user.ip.x.minus(Decimal.sumGeometricSeries(canBuy, 1, ratio, user.increment.p[n]));
          user.increment.p[n] += canBuy.toNumber();
        }
      }
    }, 100);
  }
  else {clearInterval(automatingIncrementP[n]); automatingIncrementP[n] = false}
  updateAutomateIncrementP(n);
}
function buyAutomationIncrementM() {
  if (user.ip.x.gte(getAutoIncrementMCost())) {
    user.ip.x = user.ip.x.minus(getAutoIncrementMCost());
    user.auto.incrementM++;
    for (let i = 0; i <= 4; i++) {if (user.automate.incrementM[i]) {automateIncrementM(i); aytomateIncrementM(i)}}
    unlockAutomation();
  }
}
var automatingIncrementM = [false, false, false, false, false];
function automateIncrementM(n) {
  user.automate.incrementM[n] = !user.automate.incrementM[n];
  if (!automatingIncrementM[n]) {
    automatingIncrementM[n] = setInterval(() => {
      if (user.automate.incrementM[n]) {
        let ratio = getIncrementMRatio(n);
        let canBuy = Decimal.affordGeometricSeries(user.ip.x, 1e7, ratio, user.increment.m[n]);
        if (canBuy.gte(user.auto.incrementM)) {
          user.ip.x = user.ip.x.minus(Decimal.sumGeometricSeries(user.auto.incrementM, 1e7, ratio, user.increment.m[n]));
          user.increment.m[n] += user.auto.incrementM;
        }
        else {
          user.ip.x = user.ip.x.minus(Decimal.sumGeometricSeries(canBuy, 1e7, ratio, user.increment.m[n]));
          user.increment.m[n] += canBuy.toNumber();
        }
      }
    }, 100);
  }
  else {clearInterval(automatingIncrementM[n]); automatingIncrementM[n] = false}
  updateAutomateIncrementM(n);
}

//Get Data
function getAutoIPx() {return nd(user.auto.ip)}
function getAutoIPCost() {return nd(1000).times(nd(10).pow(user.auto.ip)).round()}
function getAutomateIPRate() {if (user.auto.ip > 20) {return nd(20)} else {return nd(user.auto.ip)}}
function getAutomateIPBulk() {if (user.auto.ip > 20) {return nd(user.auto.ip).divide(20)} else {return nd(1)}}
function getAutoIncrementPx() {return nd(10).times(user.auto.incrementP)}
function getAutoIncrementPCost() {return nd(100000).times(nd(100).pow(user.auto.incrementP)).round()}
function getAutoIncrementMx() {return nd(10).times(user.auto.incrementM)}
function getAutoIncrementMCost() {return nd(1e20).times(nd(100000).pow(user.auto.incrementM))}

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
function updateAutoIncrementM() {
  d("autoMx").textContent = e(getAutoIncrementMx());
  d("autoMCost").textContent = e(getAutoIncrementMCost());
  if (user.ip.x.lt(getAutoIncrementMCost())) {rpc("canBuy", "cantBuy", "autoMb")}
  else {rpc("cantBuy", "canBuy", "autoMb")}
}
function updateAutomateIncrementM(n) {
  if (user.automate.incrementM[n]) {d("autoIncrementM" + n + "State").style.borderColor = "rgb(100, 200, 50)"}
  else {d("autoIncrementM" + n + "State").style.borderColor = "rgb(220, 20, 60)"}
}
