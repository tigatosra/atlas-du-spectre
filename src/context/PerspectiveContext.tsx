"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserPerspective } from "../types/spectrum";

interface PerspectiveContextType {
  perspective: UserPerspective;
  setPerspective: (perspective: UserPerspective) => void;
  togglePerspective: () => void;
  isAutisticPerspective: boolean;
  isRelativePerspective: boolean;
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined);

export function PerspectiveProvider({ children }: { children: React.ReactNode }) {
  const [perspective, setPerspective] = useState<UserPerspective>("autiste");

  // Load from local storage if available on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("atlas_user_perspective") as UserPerspective;
      if (saved === "autiste" || saved === "proche") {
        setPerspective(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSetPerspective = (newPerspective: UserPerspective) => {
    setPerspective(newPerspective);
    try {
      localStorage.setItem("atlas_user_perspective", newPerspective);
    } catch {
      // ignore
    }
  };

  const togglePerspective = () => {
    handleSetPerspective(perspective === "autiste" ? "proche" : "autiste");
  };

  return (
    <PerspectiveContext.Provider
      value={{
        perspective,
        setPerspective: handleSetPerspective,
        togglePerspective,
        isAutisticPerspective: perspective === "autiste",
        isRelativePerspective: perspective === "proche",
      }}
    >
      {children}
    </PerspectiveContext.Provider>
  );
}

export function usePerspective() {
  const context = useContext(PerspectiveContext);
  if (!context) {
    throw new Error("usePerspective must be used within a PerspectiveProvider");
  }
  return context;
}
