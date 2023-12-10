import { useEffect, useState } from "react";

export const useDebounce = <T>(
  value: T,
  delay?: number
): { debouncedValue: T; isLoading: boolean } => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, delay || 5000);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return { debouncedValue, isLoading };
};
export default useDebounce;
