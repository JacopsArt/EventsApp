import React, { createContext, useState, useEffect } from "react";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, categoriesRes, usersRes] = await Promise.all([
          fetch("http://localhost:3000/events"),
          fetch("http://localhost:3000/categories"),
          fetch("http://localhost:3000/users"),
        ]);

        if (!eventsRes.ok || !categoriesRes.ok || !usersRes.ok) {
          throw new Error("HTTP error while fetching data");
        }

        const [eventsData, categoriesData, usersData] = await Promise.all([
          eventsRes.json(),
          categoriesRes.json(),
          usersRes.json(),
        ]);

        setEvents(eventsData);
        setCategories(categoriesData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const contextValue = {
    events,
    setEvents,
    users,
    setUsers,
    categories,
    setCategories,
    error,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};
