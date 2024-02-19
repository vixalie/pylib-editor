import { createHashRouter } from "react-router-dom";
import { BootLayout } from "./layout";
import { NewLibrary, ProjectGlance, Welcome } from "./pages";
import PhaseList from "./pages/PhaseList/PhaseList";

const appRoutes = createHashRouter([
  {
    path: "/",
    element: <BootLayout />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "new", element: <NewLibrary /> },
      { path: "project", element: <ProjectGlance /> },
      { path: "browse", element: <PhaseList /> },
    ],
  },
]);

export default appRoutes;
