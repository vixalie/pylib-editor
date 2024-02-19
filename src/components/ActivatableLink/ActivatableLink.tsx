import cx from "clsx";
import { defaultTo, isNil, pick, pipe, prop } from "ramda";
import { useMemo } from "react";
import { Link, LinkProps, NavLink, NavLinkProps } from "react-router-dom";
import classes from "./ActivatableLink.module.css";

interface ActivatableLinkProps extends Partial<NavLinkProps | LinkProps> {
  activatable?: boolean;
  onAction?: () => void | Promise<void>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const defaultActivatable = pipe(defaultTo(true), prop("activatable"));

export default function ActivatableLink(props: React.PropsWithChildren<ActivatableLinkProps>) {
  const LinkComponent = useMemo(
    () => (props.activatable ?? false ? NavLink : Link),
    [props.activatable]
  );
  const linkProps = useMemo(() => {
    if (!isNil(props.onAction)) {
      return {
        onClick: props.onAction,
      };
    } else {
      return pick(["end", "to", "replace"], props);
    }
  }, [props.activatable, props.onAction, classes]);
  const linkStyle = useMemo(
    () =>
      isNil(props.onAction) && (props.activatable ?? false)
        ? ({ isActive }) =>
            cx([prop("activatable-link", classes), isActive ? prop("active", classes) : ""])
        : cx([prop("activatable-link", classes)]),
    [props.activatable, props.onAction, classes]
  );

  return (
    <LinkComponent className={linkStyle} {...linkProps}>
      {!isNil(props.leftIcon) && props.leftIcon}
      {!isNil(props.children) && props.children}
      {!isNil(props.rightIcon) && props.rightIcon}
    </LinkComponent>
  );
}
