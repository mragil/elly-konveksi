import { useState, useEffect } from 'react';

type DebounceOptions = {
  delay?: number;
}

export function useDebounce<T>(value: T, options?: DebounceOptions): T {
  const { delay = 500 } = options || {};
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
