import { defaultTo, prop } from "ramda";
import classes from "./Divider.module.css";

/**
 * @typedef (object) DividerProps
 * @property {number} [thickness]
 */

const defaultThickness = defaultTo(1);

/**
 * @param {DividerProps} props
 */
function Divider(props) {
  return (
    <hr
      className={prop("divider", classes)}
      style={{
        borderTopWidth: `${defaultThickness(props.thickness)}px`,
        height: `${defaultThickness(props.thickness)}px`,
      }}
    />
  );
}

/**
 * @param {DividerProps} props
 */
Divider.Vertical = function (props) {
  return (
    <hr
      className={prop("divider", classes)}
      style={{
        borderLeftWidth: `${defaultThickness(props.thickness)}px`,
        width: `${defaultThickness(props.thickness)}px`,
      }}
    />
  );
};

export default Divider;
