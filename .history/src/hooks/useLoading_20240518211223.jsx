import { useState, createContext, useContext } from 'react';

// Create a context for loading state
const LoadingContext = createContext({});

// Provider component to wrap the application and provide loading state and functions
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to access loading state and functions
export const useLoading = () => useContext(LoadingContext);
