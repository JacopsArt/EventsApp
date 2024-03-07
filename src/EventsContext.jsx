import React, { useState, useEffect, createContext, useContext } from "react";

const EventsContext = createContext();

export const useEventsContext = () => useContext(EventsContext);

export const EventsContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/categories");
    if (response.ok) {
      const data = await response.json();
      setCategories(data);
    }
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  return (
    <EventsContext.Provider value={{ categories, users }}>
      {children}
    </EventsContext.Provider>
  );
};
