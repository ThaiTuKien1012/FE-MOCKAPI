import React, { createContext, useCallback } from 'react';
import toast from 'react-hot-toast';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const showSuccess = useCallback((message) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right'
    });
  }, []);

  const showError = useCallback((message) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right'
    });
  }, []);

  const showInfo = useCallback((message) => {
    toast(message, {
      duration: 4000,
      position: 'top-right'
    });
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        showSuccess,
        showError,
        showInfo
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

