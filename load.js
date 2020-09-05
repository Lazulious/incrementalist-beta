var vs = ["p"];
function updater() {
  setTimeout(() => {
    if (user.tab == "Increment") {
      updateip();
      updateEquationIP();
      for (let i = 0; i < vs.length; i++) {
        for (let k = 0; k < 5; k++) {
          updateIncrement(vs[i], k, "x");
          updateIncrement(vs[i], k, "Cost");
        }
      }
    }
    updater();
  }, (1000 / updateRate));
}
