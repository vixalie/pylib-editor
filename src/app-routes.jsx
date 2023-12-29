import { createHashRouter } from "react-router-dom";
import BootLayout from "./layout/BootLayout";
import NewLibraray from "./pages/NewLibrary";
import Welcome from "./pages/Welcome";

const appRoutes = createHashRouter([
  {
    path: "/",
    element: <BootLayout />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "new", element: <NewLibraray /> },
    ],
  },
]);

export default appRoutes;
