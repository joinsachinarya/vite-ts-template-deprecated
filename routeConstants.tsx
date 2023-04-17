import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./src/Screens/Home";
import NotFound from "./src/Screens/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
