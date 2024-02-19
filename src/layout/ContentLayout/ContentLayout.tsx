import { ActionIcon } from "@/components";
import { composite } from "@/util";
import { IconX } from "@tabler/icons-react";
import { defaultTo } from "ramda";
import { To, useNavigate } from "react-router-dom";
import classes from "./ContentLayout.module.css";

interface ContentLayoutProps {
  disableClose?: boolean;
  title?: React.ReactNode;
  closeTo?: To;
}

const defaultRouteTo = defaultTo("/");

export default function ContentLayout(props: React.PropsWithChildren<ContentLayoutProps>) {
  const navigate = useNavigate();

  return (
    <div className={composite(classes, "content-layout")}>
      <section className={composite(classes, "title")}>
        <div className={composite(classes, "title-content")}>{props.title}</div>
        <ActionIcon
          size="s"
          color="secondary"
          variant="transparent"
          disabled={props.disableClose ?? false}
          className={composite(classes, "close-button")}
          onClick={() => navigate(defaultRouteTo(props.closeTo), { replace: true })}
        >
          <IconX stroke="1.5" />
        </ActionIcon>
      </section>
      <section className={composite(classes, "content")}>{props.children}</section>
    </div>
  );
}
