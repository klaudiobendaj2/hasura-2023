import React, { createContext, useContext, useState } from "react";

// Create the CartContext
const AppContext = createContext();

// Create a provider component for the AppContext
const withContext = (Component) => (props) => {
  const [currentUserId, setCurrentUserId] = useState();

  return (
    <AppContext.Provider value={{ currentUserId, setCurrentUserId }}>
      <Component {...props} />
    </AppContext.Provider>
  );
};

// Custom hook to use the values passed from the provider
const useChatContext = () => {
  const data = useContext(AppContext);
  return { ...data };
};

export { useChatContext, withContext };
