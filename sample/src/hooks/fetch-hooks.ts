import { useEffect, useState } from 'react';

const ABORT_REASON = 'My UseFetch Clean-up!';
const cache: Record<string, unknown> = {};

interface ErrorWithMessage {
  message: string;
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  typeof error.message === 'string';

const toErrorWithMessage = (error: unknown) =>
  isErrorWithMessage(error) ? error : new Error(JSON.stringify(error));

export const useFetch = <T>(
  url: string,
  isCache: boolean = false,
  depArr: unknown[] = []
) => {
  const [result, setResult] = useState<T>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorWithMessage>();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    (async function () {
      try {
        if (isCache && url in cache) setResult(cache[url] as T);
        setLoading(true);
        const data = (await fetch(url, { signal }).then((res) => {
          if (res.ok) return res.json();
          throw new Error(`${res.status} ${res.statusText}`);
        })) as T;

        setResult(data);
        setError(undefined);
        if (isCache) cache[url] = data;
      } catch (error) {
        if (error && String(error) !== ABORT_REASON) {
          setError(toErrorWithMessage(error));
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => abortController.abort(ABORT_REASON);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depArr);

  return { data: result, isLoading, error };
};
