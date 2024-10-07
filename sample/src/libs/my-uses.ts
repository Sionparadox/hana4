import { useCallback, useReducer, useState } from 'react';
/**
  const [state, setState] = useMyState(...);
  useMyState(1) | useSuseMyStatetate(() => 1)

  setState(x) 
    ->-> dispatch(x) =>=> reducer(s, x);
  setState(pre => ..)
    ->-> dispatch(pre => ...) =>=> reducer(s, pre => ...);
 */
// type WithoutParamFunction<T> = () => T;
// type SS<X> = (x: X) => X;

// useMyState(() => () => 1) ,  setState(() => 9)
export function useMyState<S>(init: S | (() => S)) {
  const [state, dispatch] = useReducer(
    (pre: S, action: S | ((s: S) => S)) =>
      isActionFunction<S>(action) ? action(pre) : action,
    isInitializerFunction<S>(init) ? init() : init
    // init instanceof Function ? init() : init
  );

  return [state, dispatch] as const;
}

function isInitializerFunction<T>(x: unknown): x is () => T {
  return typeof x === 'function';
}
function isActionFunction<T>(x: unknown): x is (t: T) => T {
  return typeof x === 'function';
}

// why S & Function is not callable...
// type X = { id: number } & number;
// const x: X = { id: 1 };
// console.log('🚀  x:', x);

/**
 * const [state, dispatch] = useMyReducer(...);
 * useMyReducer(pre => !pre, false)
 * useMyReducer((pre, action) => pre + action, false)
 *
 * dispatch() | dispatch(10) | dispatch({type: 'plus...})
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMyReducer = <R extends (pre: S, action: any) => S, S>(
  reducer: R,
  initArg: S,
  init?: (s: S) => S
) => {
  const [state, setState] = useState(init ? init(initArg) : initArg);

  const dispatch = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (action?: any) => {
      setState((pre) => reducer(pre, action));
    },
    [reducer]
  );

  return [state, dispatch] as const;
};
