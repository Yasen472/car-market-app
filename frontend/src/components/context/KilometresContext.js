import React, { createContext, useState } from 'react';

export const KilometresContext = createContext();

export const KilometresProvider = ({ children }) => {
  const [kilometresValues, setKilometresValues] = useState([5000, 1000000]);

  return (
    <KilometresContext.Provider value={{ kilometresValues, setKilometresValues }}>
      {children}
    </KilometresContext.Provider>
  );
};
