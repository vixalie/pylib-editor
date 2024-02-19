import { composite } from "@/util";
import { useCallback } from "react";
import classes from "./ActionIcon.module.css";

interface ActionIconProps {
  size?: "s" | "m" | "l" | "xl" | "xxl";
  variant?: "filled" | "transparent";
  color?: "primary" | "secondary" | "danger" | "warn" | "success" | "info";
  className?: React.HTMLAttributes["className"];
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ActionIcon(props: React.PropsWithChildren<ActionIconProps>) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.disabled ?? false) {
        return;
      }
      props.onClick?.(e);
    },
    [props.disabled, props.onClick]
  );

  return (
    <button
      className={composite(
        classes,
        "action-icon-button",
        `size-${props.size ?? "m"}`,
        `variant-${props.variant ?? "secondary"}`,
        `color-${props.color ?? "transparent"}`,
        props.className ?? ""
      )}
      disabled={props.disabled ?? false}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
