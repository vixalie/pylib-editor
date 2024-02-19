import { Input } from "@/components";
import { composite } from "@/util";
import { useDebouncedEffect } from "@react-hookz/web";
import { useState } from "react";
import classes from "./Search.module.css";

interface SearchProps {
  onSearch?: (keyword: string, showDraft: boolean) => void;
}

export default function Search(props: SearchProps) {
  const [showDraft, setShowDraft] = useState(true);
  const [keyword, setKeyword] = useState("");

  useDebouncedEffect(
    () => {
      props.onSearch?.(keyword, showDraft);
    },
    [showDraft, keyword],
    300
  );

  return (
    <div className={composite(classes, "search-container")}>
      <div className={composite(classes, "search-row")}>
        <span className={composite(classes, "label")}>检索关键字</span>
        <Input
          size="xs"
          variant="underline"
          color="secondary"
          value={keyword}
          onChange={setKeyword}
          placeholder="词条内容或者拼音首字母"
        />
      </div>
      <div className={composite(classes, "search-row")}>
        <span className={composite(classes, "label")}>&nbsp;</span>
        <input
          type="checkbox"
          id="draft_checked"
          checked={showDraft}
          onChange={() => setShowDraft(!showDraft)}
        />
        <label htmlFor="draft_checked">显示草稿词条</label>
      </div>
    </div>
  );
}
