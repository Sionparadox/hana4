import { useEffect } from 'react';

export const useTimeout = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number,
  ...args: unknown[]
) => {
  useEffect(() => {
    const timer = setTimeout(cb, delay, ...args);

    return () => clearTimeout(timer);
  }, [cb, delay, args]);
};

export const useInterval = <
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(
  cb: T,
  delay: number,
  ...args: unknown[]
) => {
  useEffect(() => {
    const timer = setInterval(cb, delay, ...args);

    return () => clearInterval(timer);
  }, [cb, delay, args]);
};
