// src/contexts/EventsContext.js
import React, { createContext, useContext } from "react";

const EventsContext = createContext({});

export const useEvents = () => useContext(EventsContext);

export const EventsProvider = ({ children, events, categories }) => {
  return (
    <EventsContext.Provider value={{ events, categories }}>
      {children}
    </EventsContext.Provider>
  );
};
