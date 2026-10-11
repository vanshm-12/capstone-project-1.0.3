"use client";

import { useState } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    const item = window.localStorage.getItem(key);

    if (item !== null) return JSON.parse(item);

    return initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);

    if (typeof window === "undefined") return;

    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
