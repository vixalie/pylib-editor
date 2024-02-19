import { ContentLayout } from "@/layout";
import { composite } from "@/util";
import { useAsync } from "@react-hookz/web";
import { event } from "@tauri-apps/api";
import { UnlistenFn } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import classes from "./ProjectGlance.module.css";
import {
  LibraryAuthor,
  LibraryAuthorEmail,
  LibraryCreatedAt,
  LibraryDescription,
  LibraryName,
} from "./components/project_description";
import {
  AveragePhaseLengthStat,
  MaxPhaseLengthStat,
  MinPhaseLengthStat,
  PersistedPhasesStat,
  TotalPhasesLengthStat,
  TotalPhasesStat,
} from "./components/project_stat";
import { GlanceContext, LibraryGlance, defaultGlance } from "./glance_context";
import { libraryStatistics } from "./query_library";

export default function ProjectGlance() {
  let unsubscribeLibraryModifed: UnlistenFn | undefined;
  const [stat, setStat] = useState<LibraryGlance>(defaultGlance);
  const [queryState, queryAction] = useAsync(libraryStatistics);

  useEffect(() => {
    queryAction.execute();
    (async () => {
      unsubscribeLibraryModifed = await event.listen("library_modified", () => {
        queryAction.execute();
      });
    })();

    return () => {
      unsubscribeLibraryModifed?.();
    };
  }, []);
  useEffect(() => {
    setStat(queryState.result ?? defaultGlance);
  }, [queryState.result]);

  return (
    <ContentLayout disableClose title="词库项目概要">
      <GlanceContext.Provider value={stat}>
        <div className={composite(classes, "zone", "description")}>
          <LibraryName />
          <LibraryAuthor />
          <LibraryAuthorEmail />
          <LibraryDescription />
          <LibraryCreatedAt />
        </div>
        <div className={composite(classes, "zone", "statistics")}>
          <PersistedPhasesStat />
          <TotalPhasesStat />
        </div>
        <div className={composite(classes, "zone", "statistics")}>
          <TotalPhasesLengthStat />
        </div>
        <div className={composite(classes, "zone", "statistics")}>
          <MinPhaseLengthStat />
          <MaxPhaseLengthStat />
          <AveragePhaseLengthStat />
        </div>
      </GlanceContext.Provider>
    </ContentLayout>
  );
}
