import ActionIcon from "@/components/ActionIcon/ActionIcon";
import { IconX } from "@tabler/icons-react";
import { prop } from "ramda";
import { useNavigate } from "react-router-dom";
import classes from "./ContentLayout.module.css";

/**
 * @typedef {Object} ContentLayoutProps
 * @property {boolean} [disableClose]
 * @property {import("react").ReactNode} [title]
 */

/**
 * @param {import("react").PropsWithChildren<ContentLayoutProps>} props
 */
export default function ContentLayout(props) {
  const navigate = useNavigate();

  return (
    <div className={prop("content-layout", classes)}>
      <section className={prop("title", classes)}>
        <div className={prop("title-content", classes)}>{props.title}</div>
        <ActionIcon
          size="s"
          color="secondary"
          variant="transparent"
          disabled={props.disableClose ?? false}
          className={prop("close-button", classes)}
          onClick={() => navigate("/", { replace: true })}
        >
          <IconX stroke="1.5" />
        </ActionIcon>
      </section>
      <section className={prop("content", classes)}>{props.children}</section>
    </div>
  );
}
