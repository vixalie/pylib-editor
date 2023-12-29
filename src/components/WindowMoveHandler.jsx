import cx from "clsx";
import { prop } from "ramda";
import classes from "./WindowMoveHandler.module.css";

export default function WindowMoveHandler() {
  return (
    <div
      data-tauri-drag-region
      className={cx(prop("window-drag-region", classes))}
    ></div>
  );
}
