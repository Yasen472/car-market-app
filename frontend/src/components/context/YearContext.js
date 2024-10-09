import React, { createContext, useState } from 'react';

export const YearContext = createContext();

export const YearProvider = ({ children }) => {
  const [yearValues, setYearValues] = useState([1900, 2024]);

  return (
    <YearContext.Provider value={{ yearValues, setYearValues }}>
      {children}
    </YearContext.Provider>
  );
};
