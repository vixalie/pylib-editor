import WindowMoveHandler from "@/components/WindowMoveHandler";
import { useGlobalListener } from "@/hooks/useGlobalListener";
import NavigationSection from "@/navigation/NavigationSection";
import { prop } from "ramda";
import { Outlet } from "react-router-dom";
import classes from "./BootLayout.module.css";

export default function BootLayout() {
  useGlobalListener();

  return (
    <>
      <WindowMoveHandler />
      <div className={prop("layout-container", classes)}>
        <NavigationSection />
        <section className={prop("content-container", classes)}>
          <Outlet />
        </section>
      </div>
    </>
  );
}
