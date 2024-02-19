import { composite } from "@/util";
import classes from "./Spacer.module.css";

interface SpacerProps {
  className: React.HTMLAttributes["className"];
}

export default function Spacer(props: SpacerProps) {
  return <div className={composite(classes, "spacer", props.className)}></div>;
}
