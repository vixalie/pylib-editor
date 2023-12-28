import cx from "clsx";
import { prop } from "ramda";
import classes from "./Spacer.module.css";

/**
 * @typedef {import("react").HTMLAttributes["className"]} ClassName
 *
 * @typedef {Object} SpacerProps
 * @property {ClassName} [className]
 */

/**
 * @param {SpacerProps} props
 */
export default function Spacer(props) {
  return (
    <div
      className={cx(prop("spacer", classes), prop("className", props))}
    ></div>
  );
}
