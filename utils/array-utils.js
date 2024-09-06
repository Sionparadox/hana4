export const range = (s, e, step = s > e ? -1 : 1) => {
  if (e == undefined && s === 0) return [0];
  if (e == undefined && s !== 0) s > 0 ? ((e = s), (s = 1)) : (e = -1);
  if (step === 0 || s === e) return [s];
  if ((s - e) * step > 0) return [];
  let minus = false;
  if (s > e) {
    minus = true;
    s *= -1;
    e *= -1;
    step *= -1;
  }
  const ret = [];

  for (let i = s; i <= e; i += step) {
    ret.push(i);
  }
  return minus ? ret.map((a) => (a *= -1)) : ret;
};
