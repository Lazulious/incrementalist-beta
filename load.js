//Refresh
function updater() {
  setTimeout(() => {
    if (user.tab == "Automation") {
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
    }
    updateip();
    updatepbip();
    updater();
  }, (1000 / updateRate));
}

//Load Data

//Reset Data
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
  let x = nd(1).minus(1);
  let y = 0;
  /*let x = nd(1e27).minus(1);
  let y = 4;*/
  user.ip.x = user.ip.x.plus(x);
  user.ip.sac = user.ip.sac.plus(x);
  user.sacrifice.ip += y;
}
