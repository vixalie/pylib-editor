import { ContentLayout } from "@/layout";
import { composite } from "@/util";
import classes from "./Welcome.module.css";

export default function Welcome() {
  return (
    <ContentLayout disableClose>
      <div className={composite(classes, "position-container")}>
        <div className={composite(classes, "welcome-content")}>
          <h1>拼音输入法词库编辑工具</h1>
          <span className={composite(classes, "version")}>版本 0.1.0.alpha</span>
        </div>
      </div>
    </ContentLayout>
  );
}
