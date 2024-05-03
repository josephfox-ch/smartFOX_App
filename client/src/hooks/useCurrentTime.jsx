import { useState, useEffect } from 'react';

const useCurrentTime = (locale = 'en-EN', options = {}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const defaultOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      timeZoneName: 'short',
      ...options
    };

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString(locale, defaultOptions));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [locale, options]);

  return currentTime;
};

export default useCurrentTime;