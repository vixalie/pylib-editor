import useProjectStore from "@/context/project";
import { UnlistenFn, listen } from "@tauri-apps/api/event";
import { path } from "ramda";
import { useEffect } from "react";

export async function useGlobalListener() {
  let unsubscribeLibraryLoaded: UnlistenFn | undefined;
  let unsubscribeLibraryModified: UnlistenFn | undefined;

  useEffect(() => {
    (async () => {
      unsubscribeLibraryLoaded = await listen("library_loaded", (event) => {
        useProjectStore.setState({
          projectName: path(["payload", "name"], event),
        });
      });
      unsubscribeLibraryModified = await listen("library_modified", (event) => {
        useProjectStore.setState({
          projectName: path(["payload", "name"], event),
        });
      });
    })();

    return () => {
      unsubscribeLibraryLoaded?.();
      unsubscribeLibraryModified?.();
    };
  }, []);

  return null;
}
