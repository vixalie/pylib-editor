import { createHashRouter } from "react-router-dom";
import BootLayout from "./layout/BootLayout";
import Welcome from "./pages/Welcome/Welcome";

const appRoutes = createHashRouter([
  {
    path: "/",
    element: <BootLayout />,
    children: [{ index: true, element: <Welcome /> }],
  },
]);

export default appRoutes;
