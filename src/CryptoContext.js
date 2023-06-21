import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    currency === "rub"
      ? setSymbol("₽")
      : currency === "eur"
      ? setSymbol("€")
      : setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
