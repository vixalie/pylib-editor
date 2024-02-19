import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { isNil } from "ramda";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useOpenProject() {
  const navigate = useNavigate();
  const openProjectAction: () => Promise<void> = useCallback(async () => {
    try {
      const selectedProjectFile = await open({
        title: "打开一个词库项目",
        multiple: false,
        filters: [{ name: "词库项目", extensions: ["pylib"] }],
      });
      if (isNil(selectedProjectFile)) return;
      await invoke("load_library", { targetPath: selectedProjectFile.path });
      navigate("/project", { replace: true });
    } catch (e) {
      console.error("Open Project: ", e);
    }
  }, []);
  return openProjectAction;
}
