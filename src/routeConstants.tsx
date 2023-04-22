import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Screens/Home";
import NotFound from "./Screens/NotFound";
import Test from "./Screens/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <Home nodes={[]} setNodes={() => {}} data={{}} setData={() => {}} />
    ),
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
