import { useEffect } from 'react';
import useSWR from 'swr';

export const useMySWR = (key, fetcher, options) => {
  const { isvalidating, ...rest } = useSWR(key, fetcher, options);

  useEffect(() => {
    if (!isvalidating) {
      console.log('isvalidating: ', isvalidating);
    }
  }, [isvalidating]);
  return rest;
};
