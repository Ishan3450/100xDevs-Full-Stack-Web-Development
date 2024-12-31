import { useEffect, useState } from "react";

function useDebounce(inputValue, timeTillDebounce) {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, timeTillDebounce * 1000);
 
    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);
  return debouncedValue;
}

export default useDebounce;
