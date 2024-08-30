const reduce = (arr, fn, initValue) => {
  if (!arr || !Array.isArray(arr)) return [];

  let i = 0;
  let acc = initValue ?? ((i = 1), arr[0]);

  for (; i < arr.length; i += 1) {
    acc = fn(acc, arr[i]);
  }
};
