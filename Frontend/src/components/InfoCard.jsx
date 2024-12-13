import React from 'react';

const InfoCard = ({ number, description }) => {    
  return (
    <div className="flex flex-col items-center  dark:bg-background-tertiary dark:text-text-secondary justify-center p-4 bg-white shadow-md rounded-lg w-64">
      <h1 className="text-4xl  dark:text-green-700 font-bold text-blue-600">{number} </h1>
      <p className="mt-2 dark:text-white font-bold text-gray-500">{description}</p>
    </div>
  );
};

export default InfoCard;
