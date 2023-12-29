import Button from "@/components/Button";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import ContentLayout from "@/layout/ContentLayout";
import { prop } from "ramda";
import { useForm } from "react-hook-form";
import classes from "./NewLibrary.module.css";

export default function NewLibraray() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submit", data);
  };

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
          <label htmlFor="location">存储位置</label>
          <Input.Text
            {...register("location")}
            variant="underline"
            className={prop("input", classes)}
            readOnly
          />
          <Button type="button">选择存储位置</Button>
        </div>
        <div className={prop("form-line", classes)}>
          <Spacer className={prop("spacer", classes)} />
          <Button type="submit" color="primary">
            创建词库
          </Button>
        </div>
      </form>
    </ContentLayout>
  );
}
