import { prop } from "ramda";
import classes from "./Spacer.module.css";

export default function Spacer() {
  return <div className={prop("spacer", classes)}></div>;
}
