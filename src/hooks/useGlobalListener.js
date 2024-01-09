import useProjectStore from "@/context/project";
import { listen } from "@tauri-apps/api/event";
import { prop } from "ramda";

export async function useGlobalListener() {
  let unsubscribeProjectLoaded;

  useEffect(() => {
    (async () => {
      unsubscribeProjectLoaded = await listen("project_loaded", (event) => {
        useProjectStore.setState({ projectName: prop("name", event) });
      });
    })();

    return () => {
      unsubscribeProjectLoaded?.();
    };
  }, []);

  return null;
}
