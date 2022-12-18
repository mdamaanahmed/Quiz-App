import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [preset, setPreset] = useState("roomToBottom");
  const [enterAnimation, setEnterAnimation] = useState("");
  const [exitAnimation, setExitAnimation] = useState("");
  const [questions, setQuestions] = useState({});
  const [type, setType] = useState({});
  const [currentType, setCurrentType] = useState("");

  return (
    <AppContext.Provider
      value={{
        preset,
        enterAnimation,
        exitAnimation,
        questions,
        type,
        currentType,
        setPreset,
        setEnterAnimation,
        setExitAnimation,
        setQuestions,
        setType,
        setCurrentType
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
