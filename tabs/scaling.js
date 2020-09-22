//Buttons
function buyScalingP() {
  if (user.ip.x.gte(getScalingPCost())) {
    user.ip.x = user.ip.x.minus(getScalingPCost());
    user.scaling.p++;
  }
}
function buyScalingM() {
  if (user.ip.x.gte(getScalingMCost())) {
    user.ip.x = user.ip.x.minus(getScalingMCost());
    user.scaling.m++;
  }
}

//Get Data
function getScalingP() {return nd(0.75).pow(nd(Math.pow(user.scaling.p, 4.2) + 1).log10())}
function getScalingPCost() {return nd(10).pow(nd(user.scaling.p).times(Math.floor(nd(user.scaling.p).divide(7.5).plus(1))).plus(15))}
function getScalingM() {return nd(0.5).pow(nd(Math.pow(user.scaling.m, 1.25) + 1).log10())}
function getScalingMCost() {return nd(10).pow(nd(2).times(user.scaling.m).times(Math.floor(nd(user.scaling.m).divide(7.5).plus(1))).plus(37))}

//Update Data
function updateScalingP() {
  d("scalingPx").textContent = e(getScalingP(), 0, 2);
  d("scalingPCost").textContent = e(getScalingPCost());
  if (user.ip.x.lt(getScalingPCost())) {rpc("canBuy", "cantBuy", "scalingPb")}
  else {rpc("cantBuy", "canBuy", "scalingPb")}
}
function updateScalingM() {
  d("scalingMx").textContent = e(getScalingM(), 0, 2);
  d("scalingMCost").textContent = e(getScalingMCost());
  if (user.ip.x.lt(getScalingMCost())) {rpc("canBuy", "cantBuy", "scalingMb")}
  else {rpc("cantBuy", "canBuy", "scalingMb")}
}
