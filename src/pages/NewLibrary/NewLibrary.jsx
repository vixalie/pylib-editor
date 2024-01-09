import Button from "@/components/Button";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import ContentLayout from "@/layout/ContentLayout";
import { open } from "@tauri-apps/api/dialog";
import { is, isEmpty, isNil, prop } from "ramda";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./NewLibrary.module.css";

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
  const { register, handleSubmit, setValue, watch } = useForm();
  const [disableSubmit, setSubmitDisabled] = useState(true);

  const handleSelectDirectory = async () => {
    const directory = await openDirectory();
    if (!isNil(directory)) {
      setValue("location", directory);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Submit", data);
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
      <form
        className={prop("container", classes)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={prop("form-line", classes)}>
          <label htmlFor="name">词库名称</label>
          <Input.Text
            {...register("name")}
            variant="underline"
            style={{ maxWidth: "15em" }}
          />
        </div>
        <div className={prop("form-line", classes)}>
          <label htmlFor="author">作者</label>
          <Input.Text
            {...register("author")}
            variant="underline"
            style={{ maxWidth: "15em" }}
          />
        </div>
        <div className={prop("form-line", classes)}>
          <label htmlFor="name">Email</label>
          <Input.Text
            {...register("email")}
            variant="underline"
            style={{ maxWidth: "25em" }}
          />
        </div>
        <div className={prop("form-line", classes)}>
          <label htmlFor="name">描述</label>
          <textarea {...register("description")} />
        </div>
        <div className={prop("form-line", classes)}>
          <label htmlFor="location">存储位置</label>
          <Input.Text
            {...register("location")}
            variant="underline"
            className={prop("input", classes)}
            readOnly
          />
          <Button type="button" onClick={handleSelectDirectory}>
            选择存储位置
          </Button>
        </div>
        <div className={prop("form-line", classes)}>
          <Spacer className={prop("spacer", classes)} />
          <Button type="submit" color="primary" disabled={disableSubmit}>
            创建词库
          </Button>
        </div>
      </form>
    </ContentLayout>
  );
}
