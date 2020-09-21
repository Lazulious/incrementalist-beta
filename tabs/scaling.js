//Buttons
function buyScalingP() {
  if (user.ip.x.gte(getScalingPCost())) {
    user.ip.x = user.ip.x.minus(getScalingPCost());
    user.scaling.p++;
  }
}

//Get Data
function getScalingP() {
  /*return nd(0.9).pow(user.scaling.p);*/
  return nd(0.75).pow(nd(user.scaling.p).pow(4.2).plus(1).log10());
}
function getScalingPCost() {return nd(10).pow(nd(user.scaling.p).times(Math.floor(nd(user.scaling.p).divide(7.5).plus(1))).plus(15))}

//Update Data
function updateScalingP() {
  d("scalingPx").textContent = e(getScalingP(), 0, 2);
  d("scalingPCost").textContent = e(getScalingPCost());
  if (user.ip.x.lt(getScalingPCost())) {rpc("canBuy", "cantBuy", "scalingPb")}
  else {rpc("cantBuy", "canBuy", "scalingPb")}
}
