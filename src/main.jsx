import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";
import { Root } from "./components/Root";
import { EventsProvider } from "./EventsContext";

const Main = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <EventsPage />,
        },
        {
          path: "/event/:eventId",
          element: <EventPage />,
        },
      ],
    },
  ]);

  return (
    <ChakraProvider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </ChakraProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
