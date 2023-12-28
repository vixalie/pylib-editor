import ContentLayout from "@/layout/ContentLayout";
import { prop } from "ramda";
import classes from "./Welcome.module.css";

export default function Welcome() {
  return (
    <ContentLayout disableClose>
      <div className={prop("position-container", classes)}>
        <div className={prop("welcome-content", classes)}>
          <h1>拼音输入法词库编辑工具</h1>
          <span className={prop("version", classes)}>版本 0.1.0.alpha</span>
        </div>
      </div>
    </ContentLayout>
  );
}
