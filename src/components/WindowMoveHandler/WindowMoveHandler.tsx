import { composite } from "@/util";
import classes from "./WindowMoveHandler.module.css";

export default function WindowMoveHandler() {
  return <div data-tauri-drag-region className={composite(classes, "window-drag-region")}></div>;
}
