function prestige() {
  if (user.ip.pp.gte(ppreq)) {
    resetPrestige();
    user.ip.x = getincp(1, "cost");
    user.ip.sac = getincp(1, "cost");
    user.ip.pp = getincp(1, "cost");
    user.pp.x = user.pp.x.plus(getppgain());
    user.pp.sac = user.pp.sac.plus(getppgain());
    user.pp.ap = user.pp.ap.plus(getppgain());
    user.pp.total = user.pp.total.plus(getppgain());
    user.pp.extra = 0;
    updateip();
    updateautomation();
    updateautomate();
    updatescaleinc();
    updatesacip();
    updateincx();
    updateinc();
    updatepp();
    updateppgain();
    unlockip();
    unlockpp();
  }
}
