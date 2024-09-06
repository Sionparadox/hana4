export function deepCopy(obj) {
  if (!isObject(obj)) return obj;
  const ret = {};
  for (let k of Reflect.ownKeys(obj)) {
    ret[k] = deepCopy(obj[k]);
  }
  return ret;
}
