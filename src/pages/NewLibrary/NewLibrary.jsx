import Spacer from "@/components/Spacer/Spacer";
import ContentLayout from "@/layout/ContentLayout";
import { prop } from "ramda";
import { useForm } from "react-hook-form";
import classes from "./NewLibrary.module.css";

export default function NewLibraray() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {};

  return (
    <ContentLayout title="新建词库">
      <form
        className={prop("container", classes)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={prop("form-line", classes)}>
          <label htmlFor="name">词库名称</label>
          <input
            type="text"
            {...register("name")}
            style={{ maxWidth: "15em" }}
          />
        </div>
        <div className={prop("form-line", classes)}>
          <label htmlFor="location">存储位置</label>
          <input type="text" {...register("location")} readOnly />
          <button type="button">选择存储位置</button>
        </div>
        <div className={prop("form-line", classes)}>
          <Spacer className={prop("spacer", classes)} />
          <button type="submit">创建词库</button>
        </div>
      </form>
    </ContentLayout>
  );
}
