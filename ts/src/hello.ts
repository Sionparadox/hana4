function fail(message: string): never {
  throw new Error(`Invariant Failure : ${message}`);
  // JS는 return undefined; 가 생략
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== 'string') {
    fail(`param should be a string, not ${typeof param}`);
  }

  // 여기에서 param의 타입은 string으로 알려짐
  param.toUpperCase();
}

workWithUnsafeParam('jk');
