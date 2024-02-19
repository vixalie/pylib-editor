import { WindowMoveHandler } from "@/components";
import { useGlobalListener } from "@/hooks/useGlobalListener";
import NavigationSection from "@/navigation/NavigationSection";
import { composite } from "@/util";
import { Outlet } from "react-router-dom";
import classes from "./BootLayout.module.css";

export default function BootLayout() {
  useGlobalListener();

  return (
    <>
      <WindowMoveHandler />
      <div className={composite(classes, "layout-container")}>
        <NavigationSection />
        <section className={composite(classes, "content-container")}>
          <Outlet />
        </section>
      </div>
    </>
  );
}
