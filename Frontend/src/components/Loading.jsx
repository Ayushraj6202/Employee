import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [toggleColor, setToggleColor] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setToggleColor((prev) => !prev);
    }, 2000);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div
      className={`w-full h-full transition-colors duration-1000 ease-in-out 
        ${toggleColor ? 'bg-gray-300 dark:bg-background-primary' : 'bg-gray-400 dark:bg-background-secondary'}`}
    >
    </div>
  );
};

export default Loading;
