import { composite } from "@/util";
import { useContext } from "react";
import { GlanceContext } from "../glance_context";
import classes from "./statistics.module.css";

interface StatProps {
  label: string;
  unit?: string;
  value: number;
  /** 这个最大宽度是使用`em`做为单位的。 */
  maxWidth?: number;
}

function Stat({ label, unit, value, maxWidth }: StatProps) {
  return (
    <div
      className={composite(classes, "stat")}
      style={{ ...(maxWidth && { maxWidth: `${maxWidth}em` }) }}
    >
      <div className={composite(classes, "label")}>{label}</div>
      <div className={composite(classes, "value-display")}>
        <div className={composite(classes, "value")}>{value.toLocaleString()}</div>
        <div className={composite(classes, "unit")}>{unit}</div>
      </div>
    </div>
  );
}

export function PersistedPhasesStat() {
  const { totalPersistedPhases } = useContext(GlanceContext);

  return <Stat label="完工词汇数" unit="个" value={totalPersistedPhases} maxWidth={20} />;
}

export function TotalPhasesStat() {
  const { totalPhases } = useContext(GlanceContext);

  return <Stat label="总词汇数" unit="个" value={totalPhases} maxWidth={20} />;
}

export function MinPhaseLengthStat() {
  const { minPhaseLength } = useContext(GlanceContext);

  return <Stat label="最短词汇字数" unit="字" value={minPhaseLength} maxWidth={10} />;
}

export function MaxPhaseLengthStat() {
  const { maxPhaseLength } = useContext(GlanceContext);

  return <Stat label="最长词汇字数" unit="字" value={maxPhaseLength} maxWidth={10} />;
}

export function AveragePhaseLengthStat() {
  const { avgPhaseLength } = useContext(GlanceContext);

  return <Stat label="平均词汇字数" unit="字" value={avgPhaseLength} maxWidth={10} />;
}

export function TotalPhasesLengthStat() {
  const { totalPhaseLength } = useContext(GlanceContext);

  return <Stat label="总词汇字数" unit="字" value={totalPhaseLength} maxWidth={20} />;
}
