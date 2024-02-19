import { invoke } from "@tauri-apps/api/core";
import { message } from "@tauri-apps/plugin-dialog";
import dayjs from "dayjs";
import { path } from "ramda";
import { defaultGlance } from "./glance_context";

export async function libraryStatistics() {
  try {
    const stat = await invoke("library_glance", {});
    let createdAt = path(["meta", "createdAt"], stat) ?? 0;
    if (createdAt !== 0) {
      createdAt = dayjs.unix(createdAt).format("YYYY-MM-DD HH:mm:ss ZZ");
    } else {
      createdAt = null;
    }
    return {
      name: path(["meta", "name"], stat),
      author: path(["meta", "author"], stat) ?? null,
      email: path(["meta", "email"], stat) ?? null,
      description: path(["meta", "description"], stat) ?? null,
      createdAt,
      totalPhases: path(["stat", "total"], stat) ?? 0,
      totalPersistedPhases: path(["stat", "persists"], stat) ?? 0,
      totalDraftPhases: path(["stat", "drafts"], stat) ?? 0,
      maxPhaseLength: path(["stat", "maxLength"], stat) ?? 0,
      minPhaseLength: path(["stat", "minLength"], stat) ?? 0,
      avgPhaseLength: path(["stat", "averageLength"], stat) ?? 0,
      totalPhaseLength: path(["stat", "totalLength"], stat) ?? 0,
    };
  } catch (e) {
    console.error("[error]Load library statistics: ", e);
  }
  return defaultGlance;
}

export async function modifyLibraryMeta(targetProperty: string, newValue: string) {
  try {
    await invoke("modify_library_meta", {
      targetProperty,
      newValue,
    });
  } catch (e) {
    console.error("[error]Modify library name: ", e);
    message("未能完成词库元信息的修改和保存，请检查词库文件是否可以访问并重试。", {
      title: "词库元信息修改出现错误",
      type: "error",
    });
  }
}
