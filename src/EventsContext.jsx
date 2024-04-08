import React, { createContext, useState, useEffect } from "react";

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
    const response = await fetch(`http://localhost:3000/events/${editedEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedEvent),
    });
    const updatedEvent = await response.json();
    setEvents((prevEvents) =>
      prevEvents.map((event) => event.id === updatedEvent.id ? updatedEvent : event)
    );
  };

  const deleteEvent = async (eventId) => {
    await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
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
    deleteEvent,
    addEvent,
    addCategory,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};
