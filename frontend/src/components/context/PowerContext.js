import React, { createContext, useState } from 'react';

export const PowerContext = createContext();

export const PowerProvider = ({ children }) => {
  const [powerValues, setPowerValues] = useState([50, 1000]);

  return (
    <PowerContext.Provider value={{ powerValues, setPowerValues }}>
      {children}
    </PowerContext.Provider>
  );
};
