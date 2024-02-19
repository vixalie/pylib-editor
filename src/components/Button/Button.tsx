import { composite } from "@/util";
import { isNil } from "ramda";
import { useCallback } from "react";
import classes from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: React.HTMLAttributes["className"];
  leftIcon?: React.ReactNode;
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl";
  variant?: "fill" | "outline" | "transparent";
  color?: "primary" | "secondary" | "danger" | "warn" | "success" | "info";
}

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
}: React.PropsWithChildren<ButtonProps>) {
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
      className={composite(
        classes,
        "button",
        `size-${size ?? "m"}`,
        `color-${color ?? "secondary"}`,
        `variant-${variant ?? "fill"}`,
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
