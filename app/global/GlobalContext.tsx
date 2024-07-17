"use client";

import React, { FC, ReactNode, useState, createContext } from "react";

interface iContext {
  children: ReactNode;
  id?: string | number;
  setID?: React.Dispatch<React.SetStateAction<number | string>>;
}

export const GlobalProvider = createContext({});

export const GlobalContext: FC<iContext> = ({ children }) => {
  const [id, setID] = useState<number | string>(0);
  return (
    <GlobalProvider.Provider value={{ id, setID }}>
      {children}
    </GlobalProvider.Provider>
  );
};
