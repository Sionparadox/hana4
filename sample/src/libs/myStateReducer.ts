import { useCallback, useReducer, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMyReducer = <R extends (pre: S, action: any) => S, S>(
  reducer: R,
  initArg: S,
  init?: (s: S) => S
) => {
  const [state, setState] = useState(init ? init(initArg) : initArg);
  const dispatch = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (action: any) => setState((state) => reducer(state, action)),
    [reducer]
  );
  return [state, dispatch] as const;
};

const reducer = <T>(state: T, action: T | ((val: T) => T)): T =>
  isActionFunciton<T>(action) ? action(state) : action;
export const useMyState = <T>(init: T | (() => T)) => {
  const [state, dispatch] = useReducer(
    reducer<T>,
    isInitializerFunction(init) ? init() : init
  );
  return [state, dispatch] as const;
};

function isActionFunciton<T>(x: unknown): x is (t: T) => T {
  return typeof x === 'function';
}
function isInitializerFunction<T>(x: unknown): x is () => T {
  return typeof x === 'function';
}
