import cx from "clsx";
import { defaultTo, isNil, pick, pipe, prop } from "ramda";
import { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./ActivatableLink.module.css";

/**
 * @typedef {import("react-router-dom").NavLinkProps} NavLinkProps
 * @typedef {import("react-router-dom").LinkProps} LinkProps
 * @typedef {NavLinkProps | LinkProps} AnchorProps
 * @typedef {import("react").PropsWithChildren<Partial<AnchorProps>>} ActivatableLinkBase
 *
 * @typedef {Object} ActivatableLinkExtends
 * @property {boolean} [activatable]
 * @property {import("react").ReactNode} [leftIcon]
 * @property {import("react").ReactNode} [rightIcon]
 *
 * @typedef {ActivatableLinkBase & ActivatableLinkExtends} ActivatableLinkProps
 */

const defaultActivatable = pipe(defaultTo(true), prop("activatable"));

/**
 * @param {ActivatableLinkProps} props
 * @returns {import("react").FunctionComponent<ActivatableLinkProps>}
 */
export default function ActivatableLink(props) {
  const LinkComponent = useMemo(
    () => (props.activatable ?? false ? NavLink : Link),
    [props.activatable]
  );
  const linkStyle = useMemo(
    () =>
      props.activatable ?? false
        ? ({ isActive }) =>
            cx([
              prop("activatable-link", classes),
              isActive ? prop("active", classes) : "",
            ])
        : cx([prop("activatable-link", classes)]),
    [props.activatable, classes]
  );

  return (
    <LinkComponent
      className={linkStyle}
      {...pick(["end", "to", "replace"], props)}
    >
      {!isNil(props.leftIcon) && props.leftIcon}
      {!isNil(props.children) && props.children}
      {!isNil(props.rightIcon) && props.rightIcon}
    </LinkComponent>
  );
}
