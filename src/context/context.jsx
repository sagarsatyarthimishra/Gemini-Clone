import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Create a provider component
export const ContextProvider = ({ children }) => {
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  return (
    <AppContext.Provider
      value={{
        prevPrompt,
        setPrevPrompt,
        recentPrompt,
        setRecentPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext };
