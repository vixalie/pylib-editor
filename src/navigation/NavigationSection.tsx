import { ActionIcon, ActivatableLink, Divider, Spacer } from "@/components";
import useProjectStore from "@/context/project";
import { composite } from "@/util";
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
import { isNil } from "ramda";
import classes from "./NavigationSection.module.css";
import { useOpenProject } from "./useOpenProject";

export default function NavigationSection() {
  const projectName = useProjectStore((state) => state.projectName);
  const openProjectHandler = useOpenProject();

  return (
    <aside className={composite(classes, "navigation-container")}>
      <ActivatableLink to="/new" leftIcon={<IconTextPlus stroke="1.5" />} activatable>
        新建词库
      </ActivatableLink>
      <ActivatableLink onAction={openProjectHandler} leftIcon={<IconFolderOpen stroke="1.5" />}>
        打开词库...
      </ActivatableLink>
      {!isNil(projectName) && (
        <>
          <Divider />
          <p className={composite(classes, "library-name")}>{projectName}</p>
          <ActivatableLink to="/browse" leftIcon={<IconListSearch strole="1.5" />}>
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
        </>
      )}
      <Divider />
      <ActivatableLink to="/" leftIcon={<IconKeyboard stroke="1.5" />}>
        码表配置
      </ActivatableLink>
      <Spacer />
      <div className={composite(classes, "footer")}>
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
