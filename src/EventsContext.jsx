// In EventsContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchEvents();
    await fetchCategories();
    await fetchUsers();
  };

  const fetchEvents = async () => {
    const response = await fetch("http://localhost:3000/events");
    const data = await response.json();
    setEvents(data);
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/categories");
    const data = await response.json();
    setCategories(data);
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    setUsers(data);
  };

  const updateEvent = async (editedEvent) => {
    const response = await fetch(
      `http://localhost:3000/events/${editedEvent.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedEvent),
      }
    );
    const updatedEvent = await response.json();
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteUser = async (userId) => {
    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    });
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const updateUser = async (userId, userData) => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const updatedUser = await response.json();
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const addEvent = async (newEvent) => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    const addedEvent = await response.json();
    setEvents((prevEvents) => [...prevEvents, addedEvent]);
  };

  const addCategory = async (newCategory) => {
    const response = await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });
    const addedCategory = await response.json();
    setCategories((prevCategories) => [...prevCategories, addedCategory]);
    return addedCategory;
  };

  const contextValue = {
    events,
    setEvents,
    users,
    setUsers,
    categories,
    setCategories,
    updateEvent,
    deleteUser,
    updateUser,
    addEvent,
    addCategory,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};

