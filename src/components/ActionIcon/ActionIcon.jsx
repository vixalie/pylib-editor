import cx from "clsx";
import { prop } from "ramda";
import { useCallback } from "react";
import classes from "./ActionIcon.module.css";

/**
 * @typedef {object} ActionIconProps
 * @property {"s" | "m" | "l" | "xl" | "xxl"} [size]
 * @property {"filled" | "subtle" | "transparent"} [variant]
 * @property {"primary" | "secondary" | "danger" | "warn" | "success" | "info"} [color]
 * @property {string[]} [additionalClasses]
 * @property {boolean} [disabled]
 * @property {import("react").MouseEventHandler<HTMLButtonElement>} [onClick]
 */

/**
 * @param {import("react").PropsWithChildren<ActionIconProps>} props
 */
export default function ActionIcon(props) {
  const handleClick = useCallback(
    (e) => {
      if (props.disabled ?? false) {
        return;
      }
      props.onClick?.(e);
    },
    [props.disabled, props.onClick]
  );

  return (
    <button
      className={cx(
        prop("action-icon-button", classes),
        prop(`size-${props.size ?? "m"}`, classes),
        prop(`variant-${props.variant ?? "secondary"}`, classes),
        prop(`color-${props.color ?? "transparent"}`, classes),
        ...(props.additionalClasses ?? [])
      )}
      disabled={props.disabled ?? false}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
