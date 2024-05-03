import { useEffect } from 'react';

const useKeydown = (key, action, condition = true) => {
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode === key && condition) {
        action();
      }
    };

    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, [key, action, condition]);
};

export default useKeydown;
