import { composite } from "@/util";
import classes from "./Divider.module.css";

interface DividerProps {
  thickness?: number;
}

function Divider(props: DividerProps) {
  return (
    <hr
      className={composite(classes, "divider")}
      style={{
        borderTopWidth: `${props.thickness ?? 1}px`,
        height: `${props.thickness ?? 1}px`,
      }}
    />
  );
}

Divider.Vertical = function (props: DividerProps) {
  return (
    <hr
      className={composite(classes, "divider")}
      style={{
        borderLeftWidth: `${props.thickness ?? 1}px`,
        width: `${props.thickness ?? 1}px`,
      }}
    />
  );
};

export default Divider;
