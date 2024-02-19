import { InlineEdit, Label } from "@/components";
import { composite } from "@/util";
import { isNil } from "ramda";
import { useContext } from "react";
import { GlanceContext } from "../glance_context";
import { modifyLibraryMeta } from "../query_library";
import classes from "./description.module.css";

interface DescriptionLineProps<T> {
  label: string;
  value: T;
  /** 如果不提供`onChange`，则不会允许用户修改 */
  onChange?: (value: T) => void | Promise<void>;
}

function DescriptionLine<T>({ label, value, onChange }: DescriptionLineProps<T>) {
  return (
    <div className={composite(classes, "line")}>
      <Label>{label}</Label>
      <InlineEdit value={value} disabled={isNil(onChange)} onConfirm={(v) => onChange?.(v)} />
    </div>
  );
}

export function LibraryName() {
  const { name } = useContext(GlanceContext);
  const handleNameChange = async (newName) => {
    await modifyLibraryMeta("name", newName);
  };

  return <DescriptionLine label="词库名称" value={name} onChange={handleNameChange} />;
}

export function LibraryAuthor() {
  const { author } = useContext(GlanceContext);
  const handleAuthorChange = async (newAuthor) => {
    await modifyLibraryMeta("author", newAuthor);
  };

  return <DescriptionLine label="作者" value={author} onChange={handleAuthorChange} />;
}

export function LibraryAuthorEmail() {
  const { email } = useContext(GlanceContext);
  const handleEmailChange = async (newEmail) => {
    await modifyLibraryMeta("email", newEmail);
  };

  return <DescriptionLine label="作者邮箱" value={email} onChange={handleEmailChange} />;
}

export function LibraryDescription() {
  const { description } = useContext(GlanceContext);
  const handleDescriptionChange = async (newDescription) => {
    await modifyLibraryMeta("description", newDescription);
  };

  return <DescriptionLine label="描述" value={description} onChange={handleDescriptionChange} />;
}

export function LibraryCreatedAt() {
  const { createdAt } = useContext(GlanceContext);

  return <DescriptionLine label="创建时间" value={createdAt} />;
}
