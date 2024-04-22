import { useState, useEffect, useCallback } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error loading the localStorage key [" + key + "]: ", error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting the localStorage key [" + key + "]: ", error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        const parsedItem = item ? JSON.parse(item) : initialValue;
        if (parsedItem !== storedValue) {
          setStoredValue(parsedItem);
        }
      } catch (error) {
        console.error("Error syncing with localStorage key [" + key + "]: ", error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue, storedValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;

