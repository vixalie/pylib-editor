import { ContentLayout } from "@/layout";
import { composite } from "@/util";
import classes from "./PhaseList.module.css";
import Search from "./components/Search";

export default function PhaseList() {
  return (
    <ContentLayout title="浏览词库">
      <div className={composite(classes, "list-page")}>
        <div classes={composite(classes, "list-container")}>
          <Search />
        </div>
        <div classes={composite(classes, "editor-container")}></div>
      </div>
    </ContentLayout>
  );
}
