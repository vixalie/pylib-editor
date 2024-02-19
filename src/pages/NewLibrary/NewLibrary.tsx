import { Button, Label, Spacer, TextArea, TextInput } from "@/components";
import { ContentLayout } from "@/layout";
import { composite } from "@/util";
import { invoke } from "@tauri-apps/api/core";
import { message, open } from "@tauri-apps/plugin-dialog";
import { is, isEmpty, isNil, prop } from "ramda";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import classes from "./NewLibrary.module.css";

interface NewLibrarayForm {
  name: string;
  author?: string;
  email?: string;
  description?: string;
  location: string;
}

async function openDirectory() {
  const directory = await open({
    multiple: false,
    directory: true,
  });
  if (!isNil(directory)) {
    if (is(Array, directory)) return directory[0];
    return directory;
  }
  return null;
}

export default function NewLibraray() {
  const { register, handleSubmit, setValue, watch } = useForm<NewLibrarayForm>();
  const [disableSubmit, setSubmitDisabled] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSelectDirectory = async () => {
    const directory = await openDirectory();
    if (!isNil(directory)) {
      setValue("location", directory);
    }
  };

  const onSubmit = async (data: NewLibrarayForm) => {
    try {
      await invoke("create_new_library", {
        targetPath: prop("location", data),
        name: prop("name", data),
        author: prop("author", data),
        email: prop("email", data),
        description: prop("description", data),
      });
      navigate("/project", { replace: true });
    } catch (e) {
      await message(`未能完成词库项目的创建，出现错误：${e.message}`, {
        title: "创建项目",
        type: "error",
      });
      console.error(e);
    }
  };

  useEffect(() => {
    let subscribeWatch = watch((data, _activated) => {
      setSubmitDisabled(isEmpty(data["name"]) || isEmpty(data["location"]));
    });

    return () => {
      subscribeWatch.unsubscribe();
    };
  }, [watch]);

  return (
    <ContentLayout title="新建词库">
      <form className={composite(classes, "container")} onSubmit={handleSubmit(onSubmit)}>
        <div className={composite(classes, "form-line")}>
          <Label required>词库名称</Label>
          <TextInput {...register("name")} variant="underline" style={{ maxWidth: "15em" }} />
        </div>
        <div className={composite(classes, "form-line")}>
          <Label>作者</Label>
          <TextInput {...register("author")} variant="underline" style={{ maxWidth: "15em" }} />
        </div>
        <div className={composite(classes, "form-line")}>
          <Label>Email</Label>
          <TextInput {...register("email")} variant="underline" style={{ maxWidth: "25em" }} />
        </div>
        <div className={composite(classes, "form-line")}>
          <Label>描述</Label>
          <TextArea
            variant="underline"
            className={composite(classes, "input")}
            {...register("description")}
          />
        </div>
        <div className={composite(classes, "form-line")}>
          <Label required>存储位置</Label>
          <TextInput
            {...register("location")}
            variant="underline"
            className={composite(classes, "input")}
            readOnly
          />
          <Button type="button" onClick={handleSelectDirectory}>
            选择存储位置
          </Button>
        </div>
        <div className={composite(classes, "form-line")}>
          <Spacer className={composite(classes, "spacer")} />
          <Button type="submit" color="primary" disabled={disableSubmit}>
            创建词库
          </Button>
        </div>
      </form>
    </ContentLayout>
  );
}
