import React, { createContext, useState } from 'react';

export const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
  const [priceValues, setPriceValues] = useState([100, 1000000]);

  return (
    <PriceContext.Provider value={{ priceValues, setPriceValues }}>
      {children}
    </PriceContext.Provider>
  );
};
