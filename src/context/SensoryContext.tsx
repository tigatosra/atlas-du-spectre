"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SensoryContextType {
  lowSensoryMode: boolean;
  setLowSensoryMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  toggleLowSensoryMode: () => void;
}

const SensoryContext = createContext<SensoryContextType | undefined>(undefined);

export function SensoryProvider({ children }: { children: React.ReactNode }) {
  const [lowSensoryMode, setLowSensoryMode] = useState<boolean>(false);

  const toggleLowSensoryMode = () => {
    setLowSensoryMode((prev) => !prev);
  };

  useEffect(() => {
    if (lowSensoryMode) {
      document.documentElement.classList.add("low-sensory");
    } else {
      document.documentElement.classList.remove("low-sensory");
    }
  }, [lowSensoryMode]);

  return (
    <SensoryContext.Provider
      value={{ lowSensoryMode, setLowSensoryMode, toggleLowSensoryMode }}
    >
      {children}
    </SensoryContext.Provider>
  );
}

export function useSensory() {
  const context = useContext(SensoryContext);
  if (!context) {
    throw new Error("useSensory must be used within a SensoryProvider");
  }
  return context;
}
