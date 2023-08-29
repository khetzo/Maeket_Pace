// AdvertisementContext.js
import React, { createContext, useContext, useState } from 'react';

const AdvertisementContext = createContext();

export const useAdvertisementContext = () => useContext(AdvertisementContext);

export const AdvertisementProvider = ({ children }) => {
  const [adNotifications, setAdNotifications] = useState([]);

  const addAdvertisementNotification = (notification) => {
    setAdNotifications([notification, ...adNotifications]);
  };

  const contextValue = {
    adNotifications,
    addAdvertisementNotification,
  };

  return (
    <AdvertisementContext.Provider value={contextValue}>
      {children}
    </AdvertisementContext.Provider>
  );
};
