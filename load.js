function updater() {
  setTimeout(() => {
    if (user.tab == "Automation") {
      updateAutoIP();
      updateAutoIncrementP();
    }
    if (user.tab == "Increment") {
      for (let i = 0; i < 5; i++) {updateIncrementP(i)}
      updateEquationIP();
    }
    updateip();
    updatepbip();
    updater();
  }, (1000 / updateRate));
}
