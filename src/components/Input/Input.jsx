import cx from "clsx";
import { isNil, omit, prop } from "ramda";
import { forwardRef } from "react";
import classes from "./Input.module.css";

/**
 * @typedef {import("react").HTMLAttributes["className"]} ClassName
 * @typedef {import("react").InputHTMLAttributes<HTMLInputElement>} InputHTMLAttributes
 *
 * @typedef {Object} InputProps
 * @property {ClassName} [className]
 * @property {ClassName} [inputClassName]
 * @property {import("react").ReactNode} [leftSection]
 * @property {import("react").ReactNode} [rightSection]
 * @property {"xs" | "s" | "m" | "l" | "xl" | "xxl"} [size]
 * @property {"fill" | "outline" | "underline" | "transparent"} [variant]
 * @property {"primary" | "secondary" | "danger" | "warn" | "success" | "info"} [color]
 */

/**
 * @type {import("react").ForwardRefExoticComponent<import("react").RefAttributes<InputProps & InputHTMLAttributes>>}
 */
const Input = forwardRef(function (
  {
    className,
    inputClassName,
    leftSection,
    valueControlSection,
    rightSection,
    size,
    variant,
    color,
    ...rest
  },
  ref
) {
  return (
    <div
      className={cx(
        prop("input-container", classes),
        prop(`color-${color ?? "secondary"}`, classes),
        prop(`variant-${variant ?? "outline"}`, classes),
        className ?? ""
      )}
    >
      {!isNil(leftSection) && (
        <div className={prop("left-section-container", classes)}>
          {leftSection}
        </div>
      )}
      <input
        className={cx(
          prop("input", classes),
          prop(`size-${size ?? "m"}`, classes),
          inputClassName ?? ""
        )}
        ref={ref}
        {...rest}
      />
      {!isNil(rightSection) && (
        <div className={prop("right-section-container", classes)}>
          {rightSection}
        </div>
      )}
    </div>
  );
});

/**
 * @type {import("react").ForwardRefExoticComponent<import("react").RefAttributes<InputProps & InputHTMLAttributes>>}
 */
Input.Text = forwardRef(function (props, ref) {
  return <Input {...omit(["type"], props)} ref={ref} type="text" />;
});

/**
 * @type {import("react").ForwardRefExoticComponent<import("react").RefAttributes<InputProps & InputHTMLAttributes>>}
 */
Input.Number = forwardRef(function (props, ref) {
  return <Input {...omit(["type"], props)} ref={ref} type="number" />;
});

export default Input;
