import NavigationSection from "@/navigation/NavigationSection";
import { prop } from "ramda";
import { Outlet } from "react-router-dom";
import WindowMoveHandler from "../components/WindowMoveHandler/WindowMoveHandler";
import classes from "./BootLayout.module.css";

export default function BootLayout() {
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
