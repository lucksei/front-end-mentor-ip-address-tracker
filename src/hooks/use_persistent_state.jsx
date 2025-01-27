import React from "react";
import { useState } from "react";

export const usePersistentState = (key, defaultValue) => {
  // Initialize state with either persisted value or default value
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  // Update state and persist to local storage
  const setPersistentValue = (value) => {
    setState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Sync in with local storage from other tabs
  React.useEffect(() => {
    const handleStorageChange = () => {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setState(JSON.parse(storedValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [state, setPersistentValue];
};
