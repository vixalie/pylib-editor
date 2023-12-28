import { createHashRouter } from "react-router-dom";
import BootLayout from "./layout/BootLayout";

const appRoutes = createHashRouter([
  {
    path: "/",
    element: <BootLayout />,
    children: [],
  },
]);

export default appRoutes;
