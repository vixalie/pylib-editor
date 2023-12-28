import ActionIcon from "@/components/ActionIcon/ActionIcon";
import ActivatableLink from "@/components/ActivatableLink/ActivatableLink";
import Divider from "@/components/Divider/Divider";
import Spacer from "@/components/Spacer/Spacer";
import {
  IconBrandGithub,
  IconDna2,
  IconFileExport,
  IconFileImport,
  IconFolderOpen,
  IconHelp,
  IconKeyboard,
  IconListSearch,
  IconTextPlus,
} from "@tabler/icons-react";
import { prop } from "ramda";
import classes from "./NavigationSection.module.css";

export default function NavigationSection() {
  return (
    <aside className={prop("navigation-container", classes)}>
      <ActivatableLink to="/" leftIcon={<IconTextPlus stroke="1.5" />}>
        新建词库
      </ActivatableLink>
      <ActivatableLink to="/" leftIcon={<IconFolderOpen stroke="1.5" />}>
        打开词库...
      </ActivatableLink>
      <Divider />
      <p className={prop("library-name", classes)}>词库名称</p>
      <ActivatableLink to="/" leftIcon={<IconListSearch strole="1.5" />}>
        浏览词库
      </ActivatableLink>
      <ActivatableLink to="/" leftIcon={<IconFileImport stroke="1.5" />}>
        导入已有词库
      </ActivatableLink>
      <ActivatableLink to="/" leftIcon={<IconDna2 stroke="1.5" />}>
        解析段落
      </ActivatableLink>
      <ActivatableLink to="/" leftIcon={<IconFileExport stroke="1.5" />}>
        导出词库
      </ActivatableLink>
      <Divider />
      <ActivatableLink to="/" leftIcon={<IconKeyboard stroke="1.5" />}>
        码表配置
      </ActivatableLink>
      <Spacer />
      <div className={prop("footer", classes)}>
        <ActionIcon size="m" color="primary" variant="transparent">
          <IconBrandGithub stroke="1.5" />
        </ActionIcon>
        <ActionIcon size="m" color="secondary" variant="transparent">
          <IconHelp stroke="1.5" />
        </ActionIcon>
      </div>
    </aside>
  );
}
