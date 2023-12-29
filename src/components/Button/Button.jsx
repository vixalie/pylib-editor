import cx from "clsx";
import { isNil, prop } from "ramda";
import { useCallback } from "react";
import classes from "./Button.module.css";

/**
 * @typedef {import("react").HTMLAttributes["className"]} ClassName
 * @typedef {import("react").ButtonHTMLAttributes<HTMLButtonElement>} ButtonHTMLAttributes
 *
 * @typedef {Object} ButtonProps
 * @property {ClassName} [className]
 * @property {import("react").ReactNode} [leftIcon]
 * @property {"xs" | "s" | "m" | "l" | "xl" | "xxl"} [size]
 * @property {"fill" | "outline" | "transparent"} [variant]
 * @property {"primary" | "secondary" | "danger" | "warn" | "success" | "info"} [color]
 */

/**
 * @param {import("react").PropsWithChildren<ButtonProps & ButtonHTMLAttributes>} props
 */
export default function Button({
  className,
  leftIcon,
  size,
  variant,
  color,
  disabled,
  onClick,
  children,
  ...rest
}) {
  const handleClick = useCallback(
    (e) => {
      if (disabled ?? false) {
        return;
      }
      onClick?.(e);
    },
    [disabled, onClick]
  );

  return (
    <button
      className={cx(
        prop("button", classes),
        prop(`size-${size ?? "m"}`, classes),
        prop(`color-${color ?? "secondary"}`, classes),
        prop(`variant-${variant ?? "fill"}`, classes),
        className ?? ""
      )}
      disabled={disabled ?? false}
      onClick={handleClick}
      {...rest}
    >
      {!isNil(leftIcon) && leftIcon}
      {!isNil(children) && children}
    </button>
  );
}
