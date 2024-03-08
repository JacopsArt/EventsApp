import React, { createContext, useState, useEffect } from "react";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsResponse = await fetch("http://localhost:3000/events");
      const eventsData = await eventsResponse.json();
      setEvents(eventsData);

      const categoriesResponse = await fetch(
        "http://localhost:3000/categories"
      );
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      const usersResponse = await fetch("http://localhost:3000/users");
      const usersData = await usersResponse.json();
      setUsers(usersData);
    };

    fetchData();
  }, []);

  const addEvent = async (eventData) => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    const newEvent = await response.json();
    setEvents([...events, newEvent]);
  };

  return (
    <EventsContext.Provider value={{ events, users, categories, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
