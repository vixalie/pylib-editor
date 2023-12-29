import cx from "clsx";
import { isNil, omit, prop } from "ramda";
import classes from "./Input.module.css";

/**
 * @typedef {import("react").HTMLAttributes["className"]} ClassName
 * @typedef {import("react").InputHTMLAttributes<HTMLInputElement>} InputHTMLAttributes
 *
 * @typedef {Object} InputProps
 * @property {ClassName} [className]
 * @property {ClassName} [inputClassName]
 * @property {import("react").ReactNode} [leftSection]
 * @property {import("react").ReactNode} [valueControlSection]
 * @property {import("react").ReactNode} [rightSection]
 * @property {"xs" | "s" | "m" | "l" | "xl" | "xxl"} [size]
 * @property {"fill" | "outline" | "underline" | "transparent"} [variant]
 * @property {"primary" | "secondary" | "danger" | "warn" | "success" | "info"} [color]
 */

/**
 * @param {InputProps & InputHTMLAttributes} props
 */
function Input({
  className,
  inputClassName,
  leftSection,
  valueControlSection,
  rightSection,
  size,
  variant,
  color,
  ...rest
}) {
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
        {...rest}
      />
      {!isNil(valueControlSection) && (
        <div className={prop("value-control-container", classes)}>
          {valueControlSection}
        </div>
      )}
      {!isNil(rightSection) && (
        <div className={prop("right-section-container", classes)}>
          {rightSection}
        </div>
      )}
    </div>
  );
}

/**
 * @param {InputProps & InputHTMLAttributes} props
 */
Input.Text = function (props) {
  return <Input {...omit(["type"], props)} type="text" />;
};

/**
 * @param {InputProps & InputHTMLAttributes} props
 */
Input.Number = function (props) {
  const [value, setValue] = useState(props.value);
  const handleInput = (e) => {
    setValue(e.target.value);
    props.onInput?.(e);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };
  return (
    <Input
      {...omit(["type", "value", "onChange", "onInput"], props)}
      value={value}
      onChange={handleChange}
      onInput={handleInput}
      type="number"
    />
  );
};

export default Input;
