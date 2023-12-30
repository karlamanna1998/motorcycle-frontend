"use client"
import React, { createContext, useState, ReactNode, useCallback, Dispatch, SetStateAction } from 'react';

interface LoaderContextProps {
  loading: boolean;
  setLoading : Dispatch<SetStateAction<boolean>>
}

const defaultState = {
    loading : false,
    setLoading : (status : boolean)=>{}
} as LoaderContextProps

export const LoaderContext = createContext<LoaderContextProps>(defaultState);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

