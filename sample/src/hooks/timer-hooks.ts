import { useEffect } from 'react';

type CBT<T> = (...args: T[]) => void;
export default function <T>(cb: CBT<T>, delay: number) {
  useEffect(() => {
    const tmout = setTimeout(() => cb, delay);
    return () => clearTimeout(tmout);
  });
}
